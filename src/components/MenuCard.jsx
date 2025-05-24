import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';

const MenuCard = ({ item }) => {
  const { cart, setCart } = useAppContext();
  
  const addToCart = () => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  
  const decreaseQuantity = () => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      if (existingItem.quantity === 1) {
        setCart(cart.filter(cartItem => cartItem.id !== item.id));
      } else {
        const updatedCart = cart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity - 1 } 
            : cartItem
        );
        setCart(updatedCart);
      }
    }
  };

  const itemInCart = cart.find(cartItem => cartItem.id === item.id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{item.item_name}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.item_type}</p>
          </div>
          <p className="text-lg font-bold text-orange-500">{formatPrice(item.item_price)}</p>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          {quantity > 0 ? (
            <div className="flex items-center space-x-3">
              <button 
                onClick={decreaseQuantity}
                className="bg-orange-100 text-orange-500 hover:bg-orange-200 p-1 rounded-full h-8 w-8 flex items-center justify-center"
              >
                <span className="text-xl">-</span>
              </button>
              <span className="font-medium">{quantity}</span>
              <button 
                onClick={addToCart}
                className="bg-orange-100 text-orange-500 hover:bg-orange-200 p-1 rounded-full h-8 w-8 flex items-center justify-center"
              >
                <span className="text-xl">+</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={addToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Add to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;