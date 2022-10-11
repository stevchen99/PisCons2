module.exports = (app) => {
    const conspisc = require('../controllers/pisc.controller.js');

    // Create a new Note
    app.post('/ConsPisc', conspisc.create);

    // Retrieve all Notes
    app.get('/ConsPisc', conspisc.findAll);

    // Retrieve a single Note with noteId
    app.get('/ConsPisc/:PisConId', conspisc.findOne);

    // Update a Note with noteId
    app.put('/ConsPisc/:PisConId', conspisc.update);

    // Delete a Note with noteId
    app.delete('/ConsPisc/:PisConId', conspisc.delete);
}