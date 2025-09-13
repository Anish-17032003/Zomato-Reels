const app=require('./src/app');
const connectdb=require('./src/db/db');
require('dotenv').config();

connectdb()

app.listen(3000);
