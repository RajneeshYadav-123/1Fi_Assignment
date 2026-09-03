const Product = require('../models/Product');

const emiPlansBase = [
  { monthlyAmount: 0, tenure: 3, interestRate: 0, cashback: 7500, label: '3 months', isPopular: true, enabled: true },
  { monthlyAmount: 0, tenure: 6, interestRate: 0, cashback: 7500, label: '6 months', isPopular: false, enabled: true },
  { monthlyAmount: 0, tenure: 12, interestRate: 0, cashback: 7500, label: '12 months', isPopular: false, enabled: true },
  { monthlyAmount: 0, tenure: 24, interestRate: 0, cashback: 7500, label: '24 months', isPopular: false, enabled: true },
  { monthlyAmount: 0, tenure: 36, interestRate: 10.5, cashback: 7500, label: '36 months', isPopular: false, enabled: true },
  { monthlyAmount: 0, tenure: 48, interestRate: 10.5, cashback: 7500, label: '48 months', isPopular: false, enabled: true },
  { monthlyAmount: 0, tenure: 60, interestRate: 10.5, cashback: 7500, label: '60 months', isPopular: false, enabled: true },
];

const calculateEmiPlans = (price) => {
  return emiPlansBase.map(plan => {
    let amount = 0;
    if (plan.interestRate === 0) {
      amount = Math.ceil(price / plan.tenure);
    } else {
      const r = (plan.interestRate / 12) / 100;
      const n = plan.tenure;
      amount = Math.ceil((price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    }
    return { ...plan, monthlyAmount: amount };
  });
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).select('-variants -emiPlans -description');
    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, slug, brand, description, mrp, price, images, variants } = req.body;
    
    const emiPlans = calculateEmiPlans(price);
    
    const product = await Product.create({
      name,
      slug,
      brand,
      description,
      mrp,
      price,
      images,
      variants,
      emiPlans
    });

    return res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Slug already exists. Please choose a unique slug.' });
    }
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct
};
