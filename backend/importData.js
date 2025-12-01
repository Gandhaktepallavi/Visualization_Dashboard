const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const DataPoint = require('./models/DataPoint');

const jsonPath = path.join(__dirname, 'jsondata.json');
console.log('Reading JSON from:', jsonPath);

const raw = fs.readFileSync(jsonPath, 'utf-8');
const jsonData = JSON.parse(raw);

console.log('JSON parsed. Total records:', jsonData.length);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    
    // Clear existing data
    await DataPoint.deleteMany({});
    console.log('🗑️  Cleared existing data');
    
    // Import new data (batch insert for speed)
    await DataPoint.insertMany(jsonData);
    console.log('✅ Data imported successfully! Total:', jsonData.length);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
