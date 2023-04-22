const {default: mongoose } = require('mongoose');

const EventSchema = new mongoose.Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signupUser"
    },
    username: {
        type: String,
        required: [true, "Please Enter Your name"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    roomName: {
        type: String,
        required: [true, "Please Select Your Room"]
    },
    StartTime: {
        type:String,
        required: [true, "Start time is missing"],
    },

    EndTime: {
        type: String,
        required: [true, "End time is missing"],

    },

    availability: {
        type: Boolean,
        required: true
    },

},

    {
        timestamp: true
    });

const event = new mongoose.model("Event", EventSchema);

module.exports = event;