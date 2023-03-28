const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const productSchema =  mongoose.Schema({
    name: String,
    price: Number,
    disponibility:Boolean,
    disponibilityDuration:Date,
    promotion:String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    choices: [{
      type: Schema.Types.ObjectId,
      ref: 'Choice'
    }],
},{versionKey:false ,timestamps: true})
module.exports=mongoose.model('Product',productSchema)