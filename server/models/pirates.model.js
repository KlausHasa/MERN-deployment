const mongoose = require('mongoose');

const piratesSchema = new mongoose.Schema({
    PirateName: {
        type: String,
        required: [true, "PirateName is required"],
        minlength: [3, "Pirate name must be at least 10 characters long"]
    },
    ImageURL: {
        type: String,
        required: [true, "Image URL is required"]
    },
    TresureChests: {
        type: Number
    },
    Catchphrase: {
        type: String,
        required: [true, "Catchphrase is required"]
    },
    CrewPosition: {
        type: String,
    },
    PegLeg: {
        type: Boolean,
    },
    EyePatch: {
        type: Boolean,
    },
    HookHand: {
        type: Boolean,
    },


   
},{ timestamps: true })


const Pirates = mongoose.model("Pirates", piratesSchema);
 
module.exports = Pirates;