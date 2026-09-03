import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { formatCurrency } from '../utils/format';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product.slug}`}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col"
          >
            <div className="aspect-[4/3] bg-gray-50 rounded-xl mb-6 overflow-hidden relative p-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-auto h-full max-h-[200px] object-contain group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-sm"
                />
              ) : (
                <div className="text-gray-400">No image</div>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h2>
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.mrp)}
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">EMI available</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
