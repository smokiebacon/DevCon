const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create
const AuthSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Auth = mongoose.model('Auth', AuthSchema)