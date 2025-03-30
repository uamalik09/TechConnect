const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'iet', 'ieee', 'acm', 'ie', 'iste'],
        default: 'user',
    },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;