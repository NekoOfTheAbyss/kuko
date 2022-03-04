import express from "express";
import fs from "fs";
import MappableMap from "./util/MappableMap.js";

export default class Kuko {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.paths = new MappableMap("Routes");
    this.staticFolder = "";
  }
  get baseURL() {
    return this._baseURL ? this._baseURL : `https://localhost:${this.port}/`;
  }
  set baseURL(url) {
    this._baseURL = url;
  }
  setBaseURL(url) {
    if (!url)
      throw new ReferenceError("URL is a required parameter to set base URL");
    this.baseURL = url;
  }
  setStatic(dir) {
    this.staticFolder = dir;
    this.app.use(express.static(dir));
    return this;
  }
  setPort(port) {
    if (!port)
      throw new ReferenceError("Cannot set port without providing one");
    const validPort = parseInt(port);
    if (!validPort)
      throw new ReferenceError("Port must be a number");
    this.port = validPort;
    return this;
  }
  addRouteCustom(route, fn) {
    if (!route)
      throw new ReferenceError("Route is a required parameter to add custom route");
    if (!fn)
      throw new ReferenceError("Function is a required parameter to add custom route");
    this.app.get(route, fn);
    return this;
  }
  addRoute(route, path) {
    if (!route)
    throw new ReferenceError("Route is a required parameter to add route");
    if (!path)
    throw new ReferenceError("Directory is a required parameter to add route");
    this.paths.set(route, { route, path });
    return this;
  }
  async start() {
    const paths = this.paths.array();
    for (const { route, path } of paths) {
      const filesInPath = fs.readdirSync(`${this.staticFolder}/${path}`);
      this.app.get(`/${route}`, async (req, res) => {
        return res.json({
          url: `${this.baseURL}/${path}/${
            filesInPath[Math.floor(Math.random() * filesInPath.length)]
          }`,
        });
      });
    }
    return this.app.listen(this.port, () =>
      console.log(`Kuko app started at ${this.baseURL} on port ${this.port}`)
    );
  }
}
