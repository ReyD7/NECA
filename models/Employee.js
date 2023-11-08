var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
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

var Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;