const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const choiceSchema =  mongoose.Schema({
    name: String,
    requiredStatus: String,
    quantityStatus:Number,
    supplement:Boolean,
    disponibility:Boolean,
    disponibitityDuration:Date,
   
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    items: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }],

},{versionKey:false ,timestamps: true})
module.exports=mongoose.model('Choice',choiceSchema)