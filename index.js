const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");

const Event = require("./models/event.models");

app.use(express.json());

initializeDatabase();

// Home route
app.get("/", (req, res) => {
    res.send("Meetup App API is running.")
});

async function createEvent(newEvent) {
    try {

        const event = new Event(newEvent);
        const savedEvent = await event.save();
        return savedEvent;
        
    } catch (error) {
        throw error;
    }
};

app.post("/events", async(req, res) => {
    try {

        const savedEvent = await createEvent(req.body);
        res.status(201).json({message: "Event added successfully.", data: savedEvent})
        
    } catch (error) {
        res.status(500).json({ error: "Failed to add Event.", message: error.message})
    }
});

// to get all events
async function getAllEvents() {
    try {
        const allEvents = await Event.find();
        return allEvents;
        
    } catch (error) {
        throw error;
    }
};

app.get("/events", async(req, res) => {
    try {

        const allEvents = await getAllEvents();
        if(allEvents.length != 0) {
            res.status(200).json({message: "Event fetched successfully.", data: allEvents});
        } else {
            res.status(404).json({message: "No Event found."})
        }
        
    } catch (error) {
        res.status(500).json({error: "Error fetching events.", message: error.message})
    }
})

// Get event by title
async function getEventByTitle(title) {
    try {

        const eventByTitle = await Event.find({title: title});
        return eventByTitle;
        
    } catch (error) {
        throw error;
    }
};

app.get("/events/title/:eventTitle", async(req, res) => {
    try {
        const event = await getEventByTitle(req.params.eventTitle);

        if(event.length != 0) {
            res.status(200).json({message: "Event fetched successfully by Title.", data: event});
        } else {
            res.status(404).json({message: "Event not found."});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch Event.", message: error.message});
    }
});

// delete event by Id
async function deleteEvent(eventId) {
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        return deletedEvent
        
    } catch (error) {
        throw error;
    }
};

app.delete("/events/:eventId", async(req, res) => {
    try {

        const deletedEvent = await deleteEvent(req.params.eventId);

        if(!deletedEvent) {
            res.status(404).json({message: "Event not found."});
        } else {
            res.status(200).json({message: "Event deleted successfully.", data: deletedEvent})
        }
        
    } catch (error) {
        res.status(500).json({error: "Failed delete Event.", message: error.message})
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port:http://localhost:${PORT}`); 
})