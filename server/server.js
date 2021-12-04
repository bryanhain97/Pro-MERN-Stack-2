const express = require('express');
const app = express();

const fileServerMiddleware = express.static('../public');
app.use(fileServerMiddleware);
// sending a GET request to localhost:3000/ OR localhost:3000/index.html serves
// index.html file in ./public folder
app.listen(3000, () => console.log('App listens on PORT 3000'))


