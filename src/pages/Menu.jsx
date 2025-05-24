import React, { useState, useEffect } from 'react';
import MenuCard from '../components/MenuCard';
import { useAppContext } from '../context/AppContext';

const Menu = () => {
  const { menuItems, loading, error } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState([]);

  // Extract unique categories and set up filtered items
  useEffect(() => {
    if (menuItems.length > 0) {
      const uniqueCategories = [...new Set(menuItems.map(item => item.item_type))];
      setCategories(['All', ...uniqueCategories]);
      setFilteredItems(menuItems);
    }
  }, [menuItems]);

  // Handle category selection
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.item_type === selectedCategory));
    }
  }, [selectedCategory, menuItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-medium text-gray-600">Loading menu...</div>
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

  if (menuItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-xl text-gray-600">No menu items available.</p>
        <p className="text-gray-500 mt-2">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Menu</h1>
        <p className="text-gray-600">Explore our delicious offerings prepared with fresh ingredients</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;