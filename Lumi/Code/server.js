const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/StackUnderflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.error("MongoDB connection error:", err));

// Schema
const checkInSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    mood: { type: String, required: true },
    streakCount: { type: Number, default: 0 },
    notes: { type: String, default: "" },
    date: { type: String, required: true },
}, { timestamps: true });

const Entry = mongoose.model('Entry', checkInSchema);

// Serve HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mood_tracker.js'));
});


// Create a check-in (POST)
app.post('/api/dailycheckin', async (req, res) => {
    const { userName, mood, notes, date } = req.body;

    try {
        const previousEntry = await Entry.findOne({userName}).sort({ date: -1 });

        let streakCount = 1;
        if (previousEntry) {
            const lastDate = new Date(previousEntry.date);
            const currentDate = new Date(date);

            const diffInDays = (currentDate - lastDate) / (1000 * 60 * 60 * 24);
            if (diffInDays === 1) {
                streakCount = previousEntry.streakCount + 1;
            }
        }

        const newEntry = new Entry({ userName, mood, streakCount, notes, date });
        await newEntry.save();

        res.status(201).json({ message: "Entry added successfully!", streakCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});


// Get a check-in by date
app.get('/api/dailycheckin/:date', async (req, res) => {
    const { date } = req.params;

    try {
        const checkin = await Entry.findOne({ date });
        if (!checkin) {
            return res.status(404).json({ error: "No entry found for this date." });
        }
        res.status(200).json(checkin);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.put('/api/dailycheckin/:date', async (req, res) => {
    const { date } = req.params;
    const { mood } = req.body;

    try {
        const updated = await Entry.findOneAndUpdate(
            { date },
            { mood },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "No entry found to update." });
        }

        res.json({ message: "Mood updated successfully.", entry: updated });
    } catch (err) {
        res.status(500).json({ error: "Server error." });
    }
});

app.delete('/api/dailycheckin/:date', async (req, res) => {
    const { date } = req.params;

    try {
        const deleted = await Entry.findOneAndDelete({ date });
        if (!deleted) {
            return res.status(404).json({ error: "No entry found to delete." });
        }

        res.json({ message: "Entry deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Server error." });
    }
});

// Mood Graph route
app.get('/api/moodGraph', async (req, res) => {
    try {
        const entries = await Entry.find({}).sort({ date: 1 });

        const graphData = entries.map(entry => ({
            date: entry.date,
            mood: entry.mood
        }));

        res.json(graphData);
    } catch (err) {
        console.error("Error fetching mood graph data:", err);
        res.status(500).json({ error: "Failed to fetch mood graph data." });
    }
});
const journalSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const Journal = mongoose.model('Journal', journalSchema);

const axios = require('axios');

app.post('/saveJournal', async (req, res) => {
    const { title, content } = req.body;

    try {
        const journal = new Journal({ title, content });
        await journal.save();

        const nlpResponse = await axios.post("http://localhost:5001/analyze", {
            text: content
        });
        res.status(201).json({
            message: "Journal entry saved!",
            analysis: nlpResponse.data
        });
    } catch (error) {
        console.error("Error saving or analyzing journal:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get('/getJournal', async (req, res) => {
    try {
        const journals = await Journal.find({});
        res.json(journals);
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/journalData', async (req, res) => {
    try {
        const journals = await Journal.find({}).sort({ date: -1 });
        res.json(journals);
    } catch (error) {
        console.error("Error fetching journal data:", error);
        res.status(500).json({ error: "Failed to fetch journal data." });
    }
});

app.get('/journal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'journal.html'));
});


app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});
