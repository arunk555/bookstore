const { Schema, model } = require("mongoose");

const product = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlenght: 150
    },
    price:{
        type: Number,
        requied: true
    },
    currency:{
        type: String,
        default: 'INR'
    },
    image:{
        type: String,
        default: null
    },
    addedBy:{
        type: String,
        required: true,
        default: null
    },
    createdAt:{
        type: Date,
        default:()=>Date.now()
    },
    updatedAt:{
        type: Date,
        default: ()=>Date.now()
    }

});

module.exports = model("products", product);