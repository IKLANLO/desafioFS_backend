require('dotenv').config()
const express = require ("express");
const app = express();
const PORT = process.env.PORT || 8081;
const cors = require('cors')

const { dbConnection } = require("./config/config")

app.use(express.json())

app.use(cors())

dbConnection()

app.use('/empresas', require('./routes/empresas'))

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));