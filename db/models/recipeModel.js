const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  food: String,
  quantity: Number,
  measure: String,
  weight: Number,
});

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

const TotalNutrientSchema = new mongoose.Schema({
  ENERC_KCAL: NutrientSchema,
  FASAT: NutrientSchema,
  CHOCDF: NutrientSchema,
  FIBTG: NutrientSchema,
  PROCNT: NutrientSchema,
  FE: NutrientSchema,
  ZN: NutrientSchema,
  P: NutrientSchema,
  VITA_RAE: NutrientSchema,
  VITC: NutrientSchema,
  THIA: NutrientSchema,
  RIBF: NutrientSchema,
  NIA: NutrientSchema,
  VITB6A: NutrientSchema,
  FOL: NutrientSchema,
  TOCPHA: NutrientSchema,
  VITK1: NutrientSchema,
});

const RecipeSchema = new mongoose.Schema({
  q: { type: String, required: true },
  uri: String,
  label: { type: String, required: true },
  image: String,
  servings: { type: Number, default: 1 },
  healthLabels: [String],
  dietLabels: [String],
  ingredients: { type: [IngredientSchema], required: true },
  calories: { type: Number, required: true },
  totalWeight: Number,
  totalNutrients: TotalNutrientSchema,
  digest: [NutrientSchema],
});

module.exports = mongoose.model('recipe', RecipeSchema);
