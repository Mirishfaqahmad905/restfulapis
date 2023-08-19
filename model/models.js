const mongoose = require('mongoose');
const connection = require('./db/conne');
const myCollectionSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});
 const mymodule=mongoose.model('myapitable', myCollectionSchema);;
module.exports= mymodule; 
