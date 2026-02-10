const app=require('./src/app');
const connectdb=require('./src/db/db');
require('dotenv').config();
require("dotenv").config({ path: __dirname + "/../.env" });


connectdb()

app.listen(3000);
