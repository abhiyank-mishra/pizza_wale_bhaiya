import { createContext, useContext, useState, useEffect } from 'react';
import { loadMenuItems, loadOrders } from '../utils/storage';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load menu items from JSON
        const menu = await loadMenuItems();
        setMenuItems(menu);
        
        // Load orders from JSON
        const ordersData = await loadOrders();
        setOrders(ordersData);

        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Check if a user exists based on phone number
  const findCustomerByPhone = (phone) => {
    return orders.find(order => order.customerPhone === phone);
  };

  // Calculate total for current cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.item_price * item.quantity);
    }, 0);
  };

  const value = {
    menuItems,
    setMenuItems,
    cart,
    setCart,
    orders,
    setOrders,
    loading,
    error,
    findCustomerByPhone,
    calculateTotal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};