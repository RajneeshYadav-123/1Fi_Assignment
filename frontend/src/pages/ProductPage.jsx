import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../services/api';
import { formatCurrency } from '../utils/format';
import { ChevronRight } from 'lucide-react';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductBySlug(slug);
        if (data.success) {
          setProduct(data.data);
          
          const initialVariants = {};
          if (data.data.variants) {
            const types = [...new Set(data.data.variants.map(v => v.type))];
            types.forEach(type => {
              const firstOfType = data.data.variants.find(v => v.type === type);
              if (firstOfType) {
                initialVariants[type] = firstOfType.value;
              }
            });
          }
          setSelectedVariants(initialVariants);
          
          if (data.data.emiPlans && data.data.emiPlans.length > 0) {
             setSelectedEmiPlan(data.data.emiPlans[0]);
          }
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleVariantSelect = (type, value) => {
    setSelectedVariants(prev => ({ ...prev, [type]: value }));
  };

  const handleProceed = () => {
    if (selectedEmiPlan) setIsModalOpen(true);
  };

  const variantTypes = useMemo(() => {
    if (!product || !product.variants) return {};
    const types = {};
    product.variants.forEach(variant => {
      if (!types[variant.type]) types[variant.type] = [];
      types[variant.type].push(variant);
    });
    return types;
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{error || 'Product not found'}</h2>
        <Link to="/" className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">
          Back to Products
        </Link>
      </div>
    );
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const variantDisplay = Object.values(selectedVariants).join(', ');

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-slate-900 transition">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 flex flex-col">
          <div className="flex gap-4 mb-8">
            <div className="flex flex-col gap-3 w-20 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl border p-2 bg-white flex items-center justify-center transition-all ${
                    selectedImage === idx ? 'border-slate-900 shadow-sm ring-1 ring-slate-900' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                </button>
              ))}
            </div>
            
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-8 flex items-center justify-center min-h-[400px]">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="max-h-[400px] w-auto object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-gray-100">
            {Object.entries(variantTypes).map(([type, variants]) => (
              <div key={type} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">{type}</label>
                <select
                  value={selectedVariants[type] || ''}
                  onChange={(e) => handleVariantSelect(type, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                >
                  {variants.map(variant => (
                    <option key={variant._id || variant.value} value={variant.value}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
            {product.name} {variantDisplay && `(${variantDisplay})`}
          </h1>
          <p className="text-sm text-gray-500 mb-6 font-medium">
            ({Object.entries(selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ')})
          </p>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
            <span className="text-lg text-gray-400 line-through">{formatCurrency(product.mrp)}</span>
            {discount > 0 && (
              <span className="text-sm font-semibold text-white bg-slate-800 px-2.5 py-1 rounded-md">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8 shadow-sm">
            <div className="bg-slate-50 border-b border-gray-200 p-4">
              <p className="font-semibold text-slate-800 text-lg flex items-center gap-2">
                Pay only {selectedEmiPlan ? formatCurrency(selectedEmiPlan.monthlyAmount) : '...'} now
              </p>
            </div>
            
            <div className="p-0">
              <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
                <span className="font-semibold text-gray-900">Choose EMI Tenure</span>
                <span className="text-xs font-medium text-gray-500">EMI options available</span>
              </div>
              
              <div className="flex flex-col">
                {product.emiPlans.map((plan, idx) => {
                  const isSelected = selectedEmiPlan?._id === plan._id;
                  const isLast = idx === product.emiPlans.length - 1;
                  return (
                    <label 
                      key={plan._id} 
                      className={`flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="emiPlan"
                          value={plan._id}
                          checked={isSelected}
                          onChange={() => setSelectedEmiPlan(plan)}
                          className="w-5 h-5 text-slate-900 focus:ring-slate-900 border-gray-300 cursor-pointer"
                        />
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(plan.monthlyAmount)} <span className="text-gray-500 font-medium">x {plan.tenure} months</span>
                        </span>
                      </div>
                      <div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${plan.interestRate === 0 ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}>
                          {plan.interestRate === 0 ? '0% EMI' : 'Standard EMI'}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
              
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                <p className="text-xs text-gray-500">* Total extra payment per month/order value may apply</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceed}
            disabled={!selectedEmiPlan}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-slate-900/20 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
          >
            Buy on {selectedEmiPlan ? selectedEmiPlan.tenure : 'X'} months EMI
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Confirm Purchase</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-500">Product</span>
                <span className="font-semibold text-gray-900 text-right">{product.name}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-500">Variant</span>
                <span className="font-semibold text-gray-900 text-right">
                  {variantDisplay}
                </span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-500">EMI Amount</span>
                <span className="font-bold text-slate-900">{formatCurrency(selectedEmiPlan.monthlyAmount)}/mo</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-500">Tenure</span>
                <span className="font-semibold text-gray-900">{selectedEmiPlan.label}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Thank you!');
                  setIsModalOpen(false);
                }}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
