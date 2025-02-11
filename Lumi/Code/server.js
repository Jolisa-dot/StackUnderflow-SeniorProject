const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/StackUnderflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.error("MongoDB connection error:", err));




const checkInSchema = new mongoose.Schema({
    userName: String,
    mood: String,
    streakCount: Number,
    notes: String,
    date: String,
});

const Entry = mongoose.model('Entry', checkInSchema);

app.get('/dailycheckin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'dailycheckin.html'));
});

app.post('/api/dailycheckin', async (req, res) => {
    const { userName, mood, streakCount, notes, date } = req.body;

    try {
        const existingEntry = await Entry.findOne({ date: date });
        if (existingEntry) {
            return res.status(400).json({ error: "Entry with this date already exists." });
        }

        const newEntry = new Entry({
            userName: userName,
            mood: mood,
            streakCount: Number(streakCount),  // Convert to number
            notes: notes,
            date: date,
        });


        await newEntry.save();
        res.status(201).json({ message: "Entry added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.get('/api/dailycheckin/:id', async (req, res) => {
    const date = req.params.id;

    try {
        const checkin = await Entry.findOne({ date: date });
        if (!checkin) {
            return res.status(404).json({ error: "Entry not found." });
        }

        res.status(200).json(checkin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.put('/api/dailycheckin/:id', async (req, res) => {
    const date = req.params.id;
    const updatedData = req.body;

    try {
        const checkin = await Entry.findOne({ date: date });
        if (!checkin) {
            return res.status(404).json({ error: "Entry not found." });
        }

        await Entry.updateOne({ date: date }, updatedData);
        res.status(200).json({ message: "Entry updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});


app.delete('/api/dailycheckin/:id', async (req, res) => {
    const date = req.params.id;

    try {
        const checkin = await Entry.findOneAndDelete({ date: date });
        if (!checkin) {
            return res.status(404).json({ error: "Entry not found." });
        }

        res.status(200).json({ message: "Entry deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
