const mongoose = require('mongoose')

const ERole = {
  superAdmin: 'superAdmin',
  resRestaurant : 'resRestaurant',
  resFranchise :'resFranchise',
  client: 'client',
  preparator: 'preparator',
  server: 'server',
  accueil: 'accueil',
  responsable: 'responsable'
};

const userSchema = new mongoose.Schema({
    firstName : {type: String},
    lastName : {type: String},
    userName: {type: String},
    image : {type: String},
    address : {type: String},
    phone : {type: String},
    email : {type: String},
    password:{type:String},   
    birthday: {type:String},
    help: {type: Boolean},
    activate:{type:Boolean},
    role: {type: String,  enum: Object.values(ERole)},
    firstLogin:{type: Boolean}
    
  },{ versionKey: false, timestamps: true }
  );
const userModel = mongoose.model("user",userSchema)
module.exports = userModel;