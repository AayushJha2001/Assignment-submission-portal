const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema ({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    task : {
        type : String,
        rerquired : true,
    },
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    status : {
        type : String,
        enum : ['Accepted', 'Rejected', 'Pending'],
        default : 'Pending',
    },
    datedAt : {
        type : Date,
        default : Date.now,
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;