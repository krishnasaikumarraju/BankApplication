const mongoose = require ('mongoose');
var Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

// User Schema.
const UserSchema = new Schema({
    id: ObjectId,
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// model for users to create collection.
const User = module.exports =  mongoose.model('user', UserSchema);
module.exports = User
