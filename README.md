# Kuko
A random file api generator using express.js

**Q. Why did you name it Kuko?**
A. I have absolutely no idea.**

## Installing
```sh
$ npm install --save-dev kuko # NPM
$ pnpm install kuko # PNPM
```

## Usage
```js
import Kuko from 'kuko'
const app = new Kuko()
```

### setPort(port)
```js
app.setPort(4000) // returns app
```

### setStatic(dir)
Set a directory as a static directory. Express will serve static files from this directory.
```js
app.setStatic("some-cool-dir") // sets "./some-cool-dir" as the static folder and returns app
```

### addRoute(route, dir)
Add a route. 
`route` - Yes, route.
`dir` - The directory to fetch files from. Must be inside your static directory.
```js
app.addRoute("funny", "funny-images") // returns app
```
Accessing `/funny` would return a random file from `funny-images`

### start() 
Starts the app using the configuration made with the other methods.

### app
You can directly access the express app instance through `new Kuko().app`

```js
app.app.get("/", (req, res) => res.send("omae wa mou shinderu"))
```

## Credits
[retraigo](https://github.com/retraigo)