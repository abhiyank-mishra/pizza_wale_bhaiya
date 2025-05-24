import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 px-4 text-center bg-orange-50 rounded-lg shadow-sm mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
          Welcome to Pizza wale Bhaiya
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover a world of flavors with our delicious menu. Order online for pickup or delivery!
        </p>
        <Link
          to="/menu"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
        >
          View Our Menu
        </Link>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">
              We use only the freshest ingredients to create our delicious meals.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Our delivery service ensures your food arrives hot and fresh.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-orange-500 text-4xl mb-4">👨‍🍳</div>
            <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
            <p className="text-gray-600">
              Our Chefs don't make mistakes; they make new dishes.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Favorites</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Pizza Mania (COMBO)</h3>
              <p className="text-gray-600 mb-4">
                Crispy veggie patty loaded with melted cheese, fresh lettuce, juicy tomato, and our signature tangy sauce — every bite is a burst of flavour!
              </p>
              <p className="text-orange-500 font-bold">₹199</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Double Cheese Margherita Pizza</h3>
              <p className="text-gray-600 mb-4">
              Ek nahi, do do layers of cheese! Freshly baked Margherita pizza topped with extra cheese and tangy tomatoes — har bite mein swaad ka dhamaka
              </p>
              <p className="text-orange-500 font-bold">₹179</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link
            to="/menu"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            See Full Menu
          </Link>
        </div>
      </section>

      <section className="w-full max-w-5xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
        <p className="text-gray-600 mb-6">
          Browse our menu and place your order online in just a few clicks.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
        >
          Order Now
        </Link>
      </section>
    </div>
  );
};

export default Home;