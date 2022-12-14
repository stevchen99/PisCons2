const piscModel = require('../models/pisc.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new piscModel({
        name: req.body.name || "Untitled Note", 
        pool: req.body.pool,
        point : req.body.point,
        isAdd : req.body.isAdd,
        date : req.body.date
    }); 

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    piscModel.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findCons = (req, res) => {
    piscModel.find({isAdd : false})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.TotCons = (req, res) => {
    piscModel.aggregate([
        {$match : {isAdd : false}},
        {$group : {_id:null, point : {$sum: "$point"}}}
    ])
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.TotDebt = (req, res) => {
    piscModel.aggregate([
        {$match : {isAdd : true}},
        {$group : {_id:null, point : {$sum: "$point"}}}
    ])
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


exports.findDebt = (req, res) => {
    piscModel.find({isAdd : true})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    piscModel.findById(req.params.PisConId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    piscModel.findByIdAndUpdate(req.params.PisConId, {
        name: req.body.name || "Untitled Note", 
        pool: req.body.pool,
        point : req.body.point,
        isAdd : req.body.isAdd,
        date : req.body.date
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.PisConId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.PisConId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    piscModel.findByIdAndRemove(req.params.PisConId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.PisConId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.PisConId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.PisConId
        });
    });
};