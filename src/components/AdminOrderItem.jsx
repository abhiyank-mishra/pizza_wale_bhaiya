import React, { useState } from 'react';
import { formatPrice } from '../utils/helpers';

const AdminOrderItem = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date for display
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Calculate total price for this order
  const totalPrice = order.items.reduce((sum, item) => {
    return sum + (item.item_price * item.quantity);
  }, 0);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <span className="font-medium">{order.customerName}</span> 
          <span className="text-sm text-gray-500 ml-2">(ID: {order.customerId})</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{formatDate(order.timestamp)}</span>
          <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
          <span className={`transform transition-transform ₹{isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
            <p><span className="font-medium">Visit count:</span> {order.visitCount}</p>
          </div>
          
          <h3 className="font-medium mb-2">Order Items:</h3>
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2">{item.item_name}</td>
                  <td className="px-4 py-2">{item.item_type}</td>
                  <td className="px-4 py-2">₹{item.item_price.toFixed(2)}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">₹{(item.item_price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-medium">
                <td colSpan="4" className="px-4 py-2 text-right">Total:</td>
                <td className="px-4 py-2">₹{totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderItem;