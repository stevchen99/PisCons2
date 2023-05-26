module.exports = (app) => {
    const conspisc = require('../controllers/pisc.controller.js');
    

    // Create a new Note
    app.post('/ConsPisc', conspisc.create);

    // Retrieve all Notes
    app.get('/ConsPisc', conspisc.findAll);

    app.get('/ConsPiscCons', conspisc.findCons);

    app.get('/ConsPiscDebt', conspisc.findDebt);

    app.get('/ConsPiscTotCons', conspisc.TotCons);

    app.get('/ConsPiscTotDebt', conspisc.TotDebt);

    // Retrieve a single Note with noteId
    app.get('/ConsPisc/:PisConId', conspisc.findOne);

    // Update a Note with noteId
    app.put('/ConsPisc/:PisConId', conspisc.update);

    // Delete a Note with noteId
    app.delete('/ConsPisc/:PisConId', conspisc.delete);
}