import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminOrderItem from '../../components/AdminOrderItem';
import { loadOrders } from '../../utils/storage';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'today'

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await loadOrders();
        
        // Sort orders by timestamp, most recent first
        const sortedOrders = allOrders.sort((a, b) => b.timestamp - a.timestamp);
        setOrders(sortedOrders);
      } catch (err) {
        console.error('Failed to load orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders
  const filteredOrders = filter === 'today' 
    ? orders.filter(order => {
        const orderDate = new Date(order.timestamp);
        const today = new Date();
        return (
          orderDate.getDate() === today.getDate() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );
      }) 
    : orders;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Dashboard</h1>
        <Link 
          to="/admin/menu-management"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Manage Menu
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Customer Orders</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${filter === 'all' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Orders
            </button>
            <button 
              onClick={() => setFilter('today')}
              className={`px-3 py-1 rounded ${filter === 'today' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Today's Orders
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          <div>
            {filteredOrders.map((order, index) => (
              <AdminOrderItem key={order.timestamp + index} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;