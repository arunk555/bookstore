const { Schema, model } = require('mongoose');

const schema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        default: null,
    },
    email:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 150,
        unique: true,
        default: null
    },
    password: {
        type: String,
        required: true,
        default: null,
    },
    access_token:{
        type: String,
        default: null
    },
    status:{
        type: Number,
        default: 1
    },
    createdAt:{
        type: Date,
        default: ()=>Date.now()
    },
    updatedAt:{
        type: Date,
        default: ()=>Date.now()
    }
});

module.exports = model('adminuser', schema);