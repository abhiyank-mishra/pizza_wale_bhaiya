import React from 'react';
import { formatPrice } from '../utils/helpers';

const OrderItem = ({ item, updateQuantity }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-4">
      <div className="flex-grow">
        <h3 className="font-medium">{item.item_name}</h3>
        <p className="text-gray-600 text-sm">{formatPrice(item.item_price)} each</p>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center space-x-3 mr-8">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            disabled={item.quantity <= 0}
          >
            <span>-</span>
          </button>
          <span className="font-medium w-6 text-center">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full h-7 w-7 flex items-center justify-center"
          >
            <span>+</span>
          </button>
        </div>
        
        <div className="w-20 text-right font-medium">
          {formatPrice(item.item_price * item.quantity)}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;