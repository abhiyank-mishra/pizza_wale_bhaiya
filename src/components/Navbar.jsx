import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const { cart } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const isAdminPage = location.pathname.startsWith('/admin');
  
  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  return (
    <nav className="bg-orange-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-2xl font-bold">Pizza wale Bhaiya</Link>
          </div>
          
          {isAdminPage ? (
            <div className="flex items-center space-x-6">
              {isAuthenticated && (
                <>
                  <Link 
                    to="/admin/dashboard" 
                    className={`hover:text-orange-100 ${location.pathname === '/admin/dashboard' ? 'font-bold underline' : ''}`}
                  >
                    Orders
                  </Link>
                  <Link 
                    to="/admin/menu-management" 
                    className={`hover:text-orange-100 ${location.pathname === '/admin/menu-management' ? 'font-bold underline' : ''}`}
                  >
                    Menu
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`hover:text-orange-100 ${location.pathname === '/' ? 'font-bold underline' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className={`hover:text-orange-100 ${location.pathname === '/menu' ? 'font-bold underline' : ''}`}
              >
                Menu
              </Link>
              <Link 
                to="/checkout" 
                className="relative hover:text-orange-100"
              >
                <span className="mr-1">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;