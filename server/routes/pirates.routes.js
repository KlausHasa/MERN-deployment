const PiratesController = require('../controllers/pirates.controller');
module.exports = (app) => {
    app.get('/pirates', PiratesController.findAll);
    app.get('/pirate/:id', PiratesController.findOne);
    app.get('/filtered-pirates/:crew', PiratesController.findFilteredPirates);
    app.post('/pirate', PiratesController.createNew);
    app.put('/pirate/edit/:id', PiratesController.update);
    app.delete('/pirate/:id', PiratesController.delete);
}



