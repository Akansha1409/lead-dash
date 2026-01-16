const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

const seedData = async () => {
  const leads = [];
  const statuses = ['New', 'Contacted', 'Qualified', 'Lost'];
  
  for (let i = 1; i <= 350; i++) {
    leads.push({
      name: `Lead ${i}`,
      email: `lead${i}@example.com`,
      phone: `123-456-78${i%100}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      source: i % 2 === 0 ? 'Website' : 'LinkedIn'
    });
  }

  await Lead.deleteMany({});
  await Lead.insertMany(leads);
  console.log('Seeded 350 Leads');
  process.exit();
};

seedData();