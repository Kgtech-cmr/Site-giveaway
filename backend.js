
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://Rayan:Emmanuel237@cluster0.8twd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Data Schema
const DataSchema = new mongoose.Schema({
    name: { type: String },
    sessionId: { type: String, required: true },
    phone: { type: String, required: true },
});

const DataModel = mongoose.model('Data', DataSchema);

// API Endpoint
app.post('/api/save', async (req, res) => {
    try {
        const { name, sessionId, phone } = req.body;
        const data = new DataModel({ name, sessionId, phone });
        await data.save();
        res.json({ success: true, message: 'Data saved successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
