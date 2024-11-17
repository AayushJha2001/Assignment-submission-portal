const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username : {
        type : String, 
        required :  [true, 'username required'],
    },
    password : {
        type : String,
        required : [true, 'password required'],
    },
    role : {
        type : String,
        enum : ['User', 'Admin'],
        required : [true, 'role required'],
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;