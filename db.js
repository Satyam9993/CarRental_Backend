const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
const connectToMongo =  ()=>{
    mongoose.connect(mongoURI).then(data=>{
        console.log("Successfully connected to Mongo");
    }).catch(err=>{
        console.log("Error connecting to Mongo", err);
    })
}

module.exports = connectToMongo;