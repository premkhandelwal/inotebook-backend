const mongoose = require('mongoose');
const mongooseUri = 'mongodb://localhost:27017/inoteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const connectToMongo = ()=>{
    mongoose.connect(mongooseUri, ()=>{
        console.log("Connected to Mongo successfully");
    })
}


module.exports = connectToMongo;