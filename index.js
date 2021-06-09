const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 4500

mongoose.connect('mongodb://localhost:27017/db1', {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex:true,
  useFindAndModify:false
});

const { User, UserArchived } = require("./models/user");


app.post('/add', (req, res) => {
    var opt =  req.body;
      var user = new User(opt);
      user.save(function(error, doc){
        if(error) {
          res.send(String(error))
        }
        res.send(doc);
      })
})


app.get('/user', (req, res) => {
    User.find({}, function(error, doc){
      if(error){
        res.send(String(error))
      }else {
        res.send(doc)
      }
    })
})

app.post('/add/userArchived/:id', async (req, res) => {
      const user = await User.findOne({_id: req.params.id})
      var userArchived = new UserArchived();
      userArchived._id = user._id
      userArchived.name = user.name
      userArchived.email = user.email
      let doc = await userArchived.save()
      await User.findByIdAndDelete({_id: req.params.id})
      res.send(doc)
})

app.get('/userArchived', (req, res) => {
    UserArchived.find({}, function(error, doc){
      if(error){
        res.send(String(error))
      }else {
        res.send(doc)
      }
    })
})
  
app.listen(PORT, () => {
  console.log(`app listening on port:${PORT}`)
})