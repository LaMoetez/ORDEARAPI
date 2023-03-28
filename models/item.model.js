const mongoose = require('mongoose')


const itemSchema =  mongoose.Schema({
    name: String,
    price:Number,
    disponibility:Boolean,
    disponibitityDuration:Date,
    choice:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'choice'
    }

},{versionKey:false ,timestamps: true})
module.exports=mongoose.model('Item',itemSchema)