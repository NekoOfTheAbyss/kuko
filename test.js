import Kuko from "./index.js";

new Kuko()
  .setPort("4500")
  .addHTMLRoute("/", (req, res) => res.send("omae wa mou shinderu"))
  .setStatic("testFiles")
  .addRoute("face1", "testFolder1")
  .addRoute("face2", "testFolder2")
  .start();
