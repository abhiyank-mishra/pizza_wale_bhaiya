import React, { useState, useEffect } from 'react';

const MenuItemForm = ({ item = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    item_name: '',
    item_price: '',
    item_type: '',
  });
  
  const [errors, setErrors] = useState({});
  
  // If we're editing an existing item, populate the form
  useEffect(() => {
    if (item) {
      setFormData({
        item_name: item.item_name,
        item_price: item.item_price.toString(),
        item_type: item.item_type,
      });
    }
  }, [item]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.item_name.trim()) {
      newErrors.item_name = 'Item name is required';
    }
    
    if (!formData.item_price) {
      newErrors.item_price = 'Price is required';
    } else if (isNaN(parseFloat(formData.item_price)) || parseFloat(formData.item_price) <= 0) {
      newErrors.item_price = 'Price must be a positive number';
    }
    
    if (!formData.item_type.trim()) {
      newErrors.item_type = 'Item type/category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const processedData = {
        ...formData,
        item_price: parseFloat(formData.item_price),
        id: item ? item.id : Date.now().toString(),
      };
      
      onSubmit(processedData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {item ? 'Edit Menu Item' : 'Add New Menu Item'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="item_name" className="block text-gray-700 font-medium mb-2">
          Item Name
        </label>
        <input
          type="text"
          id="item_name"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.item_name ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 border-gray-300'
          }`}
          placeholder="e.g., Chicken Alfredo"
        />
        {errors.item_name && (
          <p className="text-red-500 text-sm mt-1">{errors.item_name}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="item_price" className="block text-gray-700 font-medium mb-2">
          Price
        </label>
        <div className="relative">
          <span className="absolute left-0 top-0 h-full flex items-center pl-3 text-gray-500">
          ₹
          </span>
          <input
            type="text"
            id="item_price"
            name="item_price"
            value={formData.item_price}
            onChange={handleChange}
            className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.item_price ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 border-gray-300'
            }`}
            placeholder="0.00"
          />
        </div>
        {errors.item_price && (
          <p className="text-red-500 text-sm mt-1">{errors.item_price}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="item_type" className="block text-gray-700 font-medium mb-2">
          Item Type/Category
        </label>
        <input
          type="text"
          id="item_type"
          name="item_type"
          value={formData.item_type}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.item_type ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 border-gray-300'
          }`}
          placeholder="e.g., Pasta, Burger, Drink"
        />
        {errors.item_type && (
          <p className="text-red-500 text-sm mt-1">{errors.item_type}</p>
        )}
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {item ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;