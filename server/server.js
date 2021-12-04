const express = require('express');
const app = express();
require('dotenv').config();

const fileServerMiddleware = express.static('../public');
app.use(fileServerMiddleware);


app.listen(process.env.PORT || 3000, () => console.log(`App is running on ${process.env.PORT}`));