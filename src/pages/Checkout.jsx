import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderItem from '../components/OrderItem';
import { useAppContext } from '../context/AppContext';
import { validateName, validatePhone } from '../utils/validation';
import { saveOrder } from '../utils/storage';
import { generateCustomerId } from '../utils/helpers';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, setCart, calculateTotal, findCustomerByPhone } = useAppContext();
  const total = calculateTotal();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [existingCustomer, setExistingCustomer] = useState(null);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== itemId));
    } else {
      setCart(
        cart.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    
    // Check if customer exists when phone is entered
    if (name === 'phone' && value.length === 10) {
      const customer = findCustomerByPhone(value);
      if (customer) {
        setExistingCustomer(customer);
        setCustomerInfo(prev => ({ ...prev, name: customer.customerName }));
      } else {
        setExistingCustomer(null);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!validateName(customerInfo.name)) {
      newErrors.name = 'Please enter a valid name';
    }
    
    if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      setErrors({ cart: 'Your cart is empty' });
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const customerId = generateCustomerId(customerInfo.name, customerInfo.phone);
      const visitCount = existingCustomer ? existingCustomer.visitCount + 1 : 1;
      
      const orderData = {
        customerId,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        items: cart,
        timestamp: Date.now(),
        totalAmount: total,
        visitCount,
      };
      
      await saveOrder(orderData);
      
      // Clear cart and show success message
      setCart([]);
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Failed to submit order:', error);
      setErrors({ submit: 'Failed to submit your order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewOrder = () => {
    setOrderComplete(false);
    navigate('/menu');
  };

  if (orderComplete) {
    return (
      <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600">
            Thank you for your order, {customerInfo.name}!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Your order has been received and is being prepared.
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-6">
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Order ID:</span> #{Math.floor(Math.random() * 10000)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Estimated Time:</span> 15-25 minutes
          </p>
        </div>
        
        <button
          onClick={handleNewOrder}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition"
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <button 
              onClick={() => navigate('/menu')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                {errors.cart && <p className="text-red-500 mb-4">{errors.cart}</p>}
                
                <div className="space-y-1">
                  {cart.map(item => (
                    <OrderItem 
                      key={item.id} 
                      item={item} 
                      updateQuantity={updateQuantity} 
                    />
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Customer Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Customer Information</h2>
                
                {existingCustomer && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700">
                      Welcome back! We found your information.
                    </p>
                  </div>
                )}
                
                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-700">{errors.submit}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmitOrder}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.name ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.phone ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 border-gray-300'
                      }`}
                      placeholder="10-digit phone number"
                      maxLength={10}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;