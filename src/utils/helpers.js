// Helper functions for the restaurant website

// Generate a unique customer ID based on name and last 4 digits of phone
export const generateCustomerId = (name, phone) => {
  // Get the first name or first part of the name
  const firstName = name.split(' ')[0].toLowerCase();
  
  // Get last 4 digits of phone number
  const lastFourDigits = phone.slice(-4);
  
  // Combine them with a random number to ensure uniqueness
  return `${firstName}-${lastFourDigits}-${Math.floor(Math.random() * 1000)}`;
};

// Format date for display
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Group menu items by category
export const groupByCategory = (items) => {
  return items.reduce((grouped, item) => {
    const category = item.item_type;
    
    if (!grouped[category]) {
      grouped[category] = [];
    }
    
    grouped[category].push(item);
    return grouped;
  }, {});
};

// Calculate subtotal for an order
export const calculateSubtotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.item_price * item.quantity);
  }, 0);
};

// Format price in Indian Rupees (₹)
export const formatPrice = (price) => {
  return `₹${price.toFixed(2)}`;
};