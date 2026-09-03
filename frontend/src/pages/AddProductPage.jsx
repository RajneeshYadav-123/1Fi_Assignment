import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    brand: '',
    description: '',
    mrp: '',
    price: '',
    images: '',
    colors: '',
    storages: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (name === 'name' && (!formData.slug || formData.slug === formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const colorVariants = formData.colors.split(',').map(c => c.trim()).filter(c => c).map(c => ({ name: c, type: 'Color', value: c.toLowerCase().replace(/\s+/g, '-'), available: true }));
      const storageVariants = formData.storages.split(',').map(s => s.trim()).filter(s => s).map(s => ({ name: s, type: 'Storage', value: s.toLowerCase().replace(/\s+/g, '-'), available: true }));
      
      const dataToSubmit = {
        ...formData,
        mrp: Number(formData.mrp),
        price: Number(formData.price),
        images: formData.images.split(',').map(url => url.trim()).filter(url => url),
        variants: [...colorVariants, ...storageVariants]
      };

      const response = await createProduct(dataToSubmit);
      
      if (response.success) {
        navigate(`/products/${dataToSubmit.slug}`);
      } else {
        setError(response.message || 'Failed to create product');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred while creating the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Phone</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Apple iPhone 15"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-gray-700">URL Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
              placeholder="e.g. apple-iphone-15"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="brand" className="text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            required
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="e.g. Apple"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            placeholder="Enter product description..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="mrp" className="text-sm font-medium text-gray-700">MRP (₹)</label>
            <input
              type="number"
              id="mrp"
              name="mrp"
              required
              min="0"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. 79900"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium text-gray-700">Selling Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. 71900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="images" className="text-sm font-medium text-gray-700">Image URLs (comma separated)</label>
          <input
            type="text"
            id="images"
            name="images"
            required
            value={formData.images}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="https://image1.jpg, https://image2.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="colors" className="text-sm font-medium text-gray-700">Colors (comma separated)</label>
            <input
              type="text"
              id="colors"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Silver, Black, Rose Gold"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="storages" className="text-sm font-medium text-gray-700">Storage Options (comma separated)</label>
            <input
              type="text"
              id="storages"
              name="storages"
              value={formData.storages}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. 128GB, 256GB, 512GB"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Product...</span>
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
