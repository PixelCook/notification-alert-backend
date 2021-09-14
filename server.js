const express = require('express');
const bodyParser= require('body-parser');
require('dotenv').config();
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(`mongodb+srv://Admin:${process.env.PASSWORD}@cluster0.z7nzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(client => {
    console.log('connected to db')
    const db = client.db('Notifications');
    const users = db.collection('users');
  })
  .catch(console.error);

app.use(bodyParser.urlencoded({ extended: true }))



app.get('/posts', (req, res) =>{
  const randomTimeOut = Math.floor(Math.random() * (10 - 5 + 1) + 5);
  const randomDuration = Math.floor(Math.random() * 4) + 1;;
  res.send({notifications:[{type: "Error", message:"Last items with limited time offer"}, {type: "Info", message:"Big sale next week"}, {type: "Warning", message:"Limited edition books for next auction"},  {type: "Success", message: "New books with limited edition coming next week"}], timeout: randomTimeOut, duration: randomDuration})
})

app.post('/noted', (req, res) => {
  users.insertOne(req.body).then(result=> {
    console.log(result)
  }).catch(error => console.log(error))
  console.log('your notification has been noted')
})

app.listen(3000, function() {
  console.log('listening on 3000')
})
