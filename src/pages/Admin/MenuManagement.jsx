import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItemForm from '../../components/MenuItemForm';
import { loadMenuItems, saveMenuItems } from '../../utils/storage';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const items = await loadMenuItems();
        setMenuItems(items);
      } catch (err) {
        console.error('Failed to load menu items:', err);
        setError('Failed to load menu items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleAddNewClick = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        const updatedMenu = menuItems.filter(item => item.id !== itemId);
        await saveMenuItems(updatedMenu);
        setMenuItems(updatedMenu);
        showSuccessMessage();
      } catch (err) {
        console.error('Failed to delete menu item:', err);
        setError('Failed to delete menu item. Please try again.');
      }
    }
  };

  const handleSubmit = async (itemData) => {
    try {
      let updatedMenu;

      if (editingItem) {
        // Update existing item
        updatedMenu = menuItems.map(item => 
          item.id === itemData.id ? itemData : item
        );
      } else {
        // Add new item
        updatedMenu = [...menuItems, itemData];
      }

      await saveMenuItems(updatedMenu);
      setMenuItems(updatedMenu);
      setShowForm(false);
      showSuccessMessage();
    } catch (err) {
      console.error('Failed to save menu item:', err);
      setError('Failed to save menu item. Please try again.');
    }
  };

  const showSuccessMessage = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading menu items...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <Link 
          to="/admin/dashboard"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          View Orders
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p>Menu updated successfully!</p>
        </div>
      )}

      {showForm ? (
        <MenuItemForm 
          item={editingItem}
          onSubmit={handleSubmit}
          onCancel={cancelForm}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Menu Items</h2>
            <button 
              onClick={handleAddNewClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              Add New Item
            </button>
          </div>

          {menuItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No menu items found</p>
              <button 
                onClick={handleAddNewClick}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Your First Menu Item
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Type</th>
                    <th className="py-3 px-6 text-right">Price</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left">{item.item_name}</td>
                      <td className="py-3 px-6 text-left">{item.item_type}</td>
                      <td className="py-3 px-6 text-right">₹{item.item_price.toFixed(2)}</td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex justify-center items-center space-x-4">
                          <button 
                            onClick={() => handleEditItem(item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuManagement;