const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  session:{
    type: Number
  },
  notification: {
    type: String
  }
})


module.exports = mongoose.model('user', userSchema)