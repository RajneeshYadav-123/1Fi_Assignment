const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  image: { type: String },
  available: { type: Boolean, default: true }
});

const emiPlanSchema = new mongoose.Schema({
  monthlyAmount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  cashback: { type: Number, default: 0 },
  processingFee: { type: Number, default: 0 },
  label: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  variants: [variantSchema],
  emiPlans: [emiPlanSchema]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
