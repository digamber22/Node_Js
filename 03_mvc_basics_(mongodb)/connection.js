const mongoose = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/Youtube-app-1' ;

async function connectMongoDb(url) {
    // connection
  return mongoose.connect(url) 
}

module.exports = { connectMongoDb } ;