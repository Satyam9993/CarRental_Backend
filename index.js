const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const index = require('./routes/index')


// database connection
const connectToMongo = require('./db');
connectToMongo();



const app = express()
const port = process.env.PORT || 5000


// middleware to fetch data
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(express.json())
app.use(express.static('public'));
app.use(cors())

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/", (req, res)=>{
  res.send({"Success":"true"});
})

// Available Routes
app.use('/api', index);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})