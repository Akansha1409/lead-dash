const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// API: Get Leads (Search, Filter, Sort, Paginate)
app.get('/api/leads', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, sort } = req.query;
    
    // Filtering
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.status = status;

    // Sorting
    const sortOptions = {};
    if (sort === 'name') sortOptions.name = 1;
    if (sort === 'date') sortOptions.createdAt = -1;

    const leads = await Lead.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Lead.countDocuments(query);

    res.json({ leads, total, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Analytics
app.get('/api/analytics', async (req, res) => {
  const total = await Lead.countDocuments();
  const converted = await Lead.countDocuments({ status: 'Qualified' });
  const newLeads = await Lead.countDocuments({ status: 'New' });
  res.json({ total, converted, newLeads });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));