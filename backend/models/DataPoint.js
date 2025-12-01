const mongoose = require('mongoose');

const DataPointSchema = new mongoose.Schema({
  intensity: { type: Number },
  likelihood: { type: Number },
  relevance: { type: Number },
  end_year: { type: String },
  topic: { type: String },
  sector: { type: String },
  region: { type: String },
  pestle: { type: String },
  source: { type: String },
  swot: { type: String },
  country: { type: String },
  city: { type: String },
  title: { type: String },
  url: { type: String },
  published: { type: String },
  n_tokens_title: { type: Number },
  n_tokens_content: { type: Number },
  insight_date: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('DataPoint', DataPointSchema);
