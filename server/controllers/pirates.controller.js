const Pirates = require('../models/pirates.model');

module.exports.findAll = (req, res) => {
    Pirates.find()
        .then((allPirates) => {
            res.json({ Pirates: allPirates })
        })
        .catch((err) => {
            res.json({ message: "Something went wrong", error: err })
        }
        )
}

module.exports.findOne = (req, res) => {
    Pirates.findOne({ _id: req.params.id })
        .then((onePirate) => {
            res.json({ Pirates: onePirate })
        })
        .catch((err) => {
            res.json({ message: "Something went wrong", error: err })
        })
}





module.exports.createNew = (req, res) => {
    console.log("the back ", req.body)
    Pirates.create(req.body)
        .then((createPirate) => {
            res.json({ Pirates: createPirate })
        })
        .catch((err) => {
            res.json({ message: "Something went wrong", error: err })
        }
        )
}

module.exports.update = (req, res) => {

    Pirates.updateOne(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then((updatePirate) => {
            res.json({ Pirates: updatePirate })
        })
        .catch((err) => {
            res.json({ message: "Something went wrong", error: err })
        }
        )
}

module.exports.delete = (req, res) => {
    Pirates.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        })
}

module.exports.findFilteredPirates = (req, res) => {
    Pirates.find({ CrewPosition: req.params.crew })
        .then((onePirate) => {
            res.json({ Pirates: onePirate })
        })
        .catch((err) => {
            res.json({ message: "Something went wrong", error: err })
        })
}