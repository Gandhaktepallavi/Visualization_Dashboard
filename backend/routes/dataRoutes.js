const express = require('express');
const router = express.Router();
const DataPoint = require('../models/DataPoint');

// Get all unique filter values
router.get('/filters', async (req, res) => {
  try {
    const agg = async (field) => {
      const docs = await DataPoint.aggregate([
        { $match: { [field]: { $ne: null, $ne: '', $exists: true } } },
        { $group: { _id: `$${field}` } },
        { $sort: { _id: 1 } }
      ]);
      return docs.map(d => d._id).filter(Boolean);
    };

    const [endYears, topics, sectors, regions, pestles, sources, swots, countries, cities] = 
      await Promise.all([
        agg('end_year'), agg('topic'), agg('sector'), agg('region'),
        agg('pestle'), agg('source'), agg('swot'), agg('country'), agg('city')
      ]);

    res.json({
      endYears, topics, sectors, regions, pestles, sources, swots, countries, cities
    });
  } catch (err) {
    console.error('Filters error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get filtered data
router.get('/data', async (req, res) => {
  try {
    const { end_year, topic, sector, region, pestle, source, swot, country, city } = req.query;
    const filter = {};

    if (end_year) filter.end_year = end_year;
    if (topic) filter.topic = topic;
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (pestle) filter.pestle = pestle;
    if (source) filter.source = source;
    if (swot) filter.swot = swot;
    if (country) filter.country = country;
    if (city) filter.city = city;

    const data = await DataPoint.find(filter).lean().limit(1000);
    res.json(data);
  } catch (err) {
    console.error('Data error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
