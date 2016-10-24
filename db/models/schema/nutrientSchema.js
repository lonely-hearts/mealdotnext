const mongoose = require('mongoose');

const NutrientSchema = new mongoose.Schema({
  label: String,
  tag: String,
  hasRDI: Boolean,
  total: Number,
  unit: String,
  daily: Number,
});

NutrientSchema.add({
  sub: { type: [NutrientSchema], required: false },
});

module.exports = NutrientSchema;
