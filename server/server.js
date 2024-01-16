const express = require('express');
const cors = require('cors');
const app = express();
           
app.use(cors());
app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/
require('./config/mongoose.config');  
  /* This is new */
  const PiratesController = require('./controllers/pirates.controller');
  module.exports = (app) => {
      app.get('/pirates', PiratesController.findAll);
      app.get('/pirate/:id', PiratesController.findOne);
      app.get('/filtered-pirates/:crew', PiratesController.findFilteredPirates);
      app.post('/pirate', PiratesController.createNew);
      app.put('/pirate/edit/:id', PiratesController.update);
      app.delete('/pirate/:id', PiratesController.delete);
  }
  
  
  
  
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})