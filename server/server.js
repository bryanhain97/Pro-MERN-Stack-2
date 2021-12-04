const express = require('express');
const app = express();

const fileServerMiddleware = express.static('../public');
app.use(fileServerMiddleware);


app.listen(3000, () => console.log(`App is running on PORT 3000`));