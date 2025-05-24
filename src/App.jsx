import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import MenuManagement from './pages/Admin/MenuManagement';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on load
    const sessionData = sessionStorage.getItem('adminSession');
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        if (session.isAuthenticated && session.expiry > Date.now()) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('adminSession');
        }
      } catch (error) {
        sessionStorage.removeItem('adminSession');
      }
    }
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/admin" replace />;
    }
    return children;
  };

  return (
    <Router>
      <AppProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route 
                path="/admin" 
                element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/menu-management" 
                element={
                  <ProtectedRoute>
                    <MenuManagement />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;