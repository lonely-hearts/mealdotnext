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
  q: String,
  uri: String,
  label: String,
  image: String,
  servings: Number,
  healthLabels: [String],
  dietLabels: [String],
  ingredients: [IngredientSchema],
  calories: Number,
  totalWeight: Number,
  totalNutrients: TotalNutrientSchema,
  digest: [NutrientSchema],
});

module.exports = mongoose.model('recipe', RecipeSchema);
