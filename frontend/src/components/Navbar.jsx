import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm tracking-wider">1Fi</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Store</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">

            <Link to="/admin/add-product" className="text-sm font-medium text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
              Add Phone
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
