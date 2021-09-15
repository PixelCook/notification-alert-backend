require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require("./models/user")

mongoose.connect(`mongodb+srv://Admin:${process.env.PASSWORD}@cluster0.z7nzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
const db = mongoose.connection
db.on('error', (error)=> console.log(error))
db.once('open', ()=>console.log("db connected"))

app.use(express.json());

app.get('/posts', (req, res) =>{
  const randomTimeOut = Math.floor(Math.random() * (10 - 5 + 1) + 5);
  const randomDuration = Math.floor(Math.random() * 4) + 1;;
  res.send({notifications:[{type: "Error", message:"Last items with limited time offer"}, {type: "Info", message:"Big sale next week"}, {type: "Warning", message:"Limited edition books for next auction"},  {type: "Success", message: "New books with limited edition coming next week"}], timeout: randomTimeOut, duration: randomDuration})
})

app.post('/noted', async(req, res) => {
  const user = new User({
    session: req.body.user,
    notification: req.body.notification.message
  })
  try{
    const newUser = await user.save()
    res.status(201).json(newUser)
  }catch(err){
    console.log(err)
  }

})

app.listen(3000, function() {
  console.log('listening on 3000')
})
