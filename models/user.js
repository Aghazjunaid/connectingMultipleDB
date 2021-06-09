const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var conn = require('../db/newdb');

const UserSchema = new Schema({
    name: {type: String, required: true, },
    email: {type: String, unique: true, required: true },
},{ timestamps:true })


User = mongoose.model("user", UserSchema); 


const UserArchivedSchema = new Schema({
    _id: {type: String },
    name: {type: String, required: true, },
    email: {type: String, unique: true, required: true },
},{ timestamps:true })


UserArchived = conn.newDB.model("userArchived", UserArchivedSchema); 

module.exports={ 
    User,
    UserArchived
}