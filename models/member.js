const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type : String, required: true , unique: true },
  password: { type : String, required: true },
  approve: { type: Boolean, default: false }
  },{
    timestamps: true  
  });

  module.exports = mongoose.model('users', userSchema);

 