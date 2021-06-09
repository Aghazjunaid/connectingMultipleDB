const mongoose = require('mongoose');

mongoose.newDB = mongoose.createConnection('mongodb://localhost:27017/db2', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex:true,
    useFindAndModify:false
});
  
module.exports = mongoose
