const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');

const products = require('./routes/Product')
const auth = require("./routes/auth");

app.use(express.json()); // for accept json data request
app.use('/api/v1',products )
app.use("/api/v1",auth);
app.use(errorMiddleware);

module.exports = app;