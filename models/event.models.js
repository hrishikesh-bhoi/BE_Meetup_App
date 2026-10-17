const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ["Online", "Offline"],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sessions: [
        {
            title: {
                type: String,
                required: true,
            },
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },

        }
    ],
    speakers: [
        {
            name: {
                type: String,
                required: true,
            },
            designation: String,
            image: String,
        }
    ],
    pricing: {
        isPaid: {
            type: Boolean,
            default: false,
        },
        amount: {
            type: Number,
            min: 0,
            default: 0,
        },
        currency: {
            type: String,
            default: "INR"
        }
    } ,

    venue: {
        name: String,
        address: String,
        city: String,
    },
    attendeeInfo: {
        dressCode: String,
        ageRestriction: String,
        additionalInfo: String
    },
    tags: {
        type: [String],
        default: []
    }

},
 {
    timestamps: true,
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

