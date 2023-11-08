var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

let StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
},
    {
    timestamps: true
    });

var Student = mongoose.model('Student', StudentSchema);
module.exports = Student;