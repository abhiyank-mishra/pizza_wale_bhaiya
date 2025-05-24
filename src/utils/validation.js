// Input validation functions

/**
 * Validates customer name
 * @param {string} name - Customer name
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateName = (name) => {
  // Name should be at least 2 characters long and contain only letters and spaces
  return name && name.trim().length >= 2 && /^[A-Za-z\s]+$/.test(name.trim());
};

/**
 * Validates phone number
 * @param {string} phone - Phone number
 * @returns {boolean} - True if valid, false otherwise
 */
export const validatePhone = (phone) => {
  // Phone number should be exactly 10 digits
  return phone && /^\d{10}$/.test(phone);
};

/**
 * Validates menu item form data
 * @param {Object} item - Menu item data
 * @returns {Object} - Object containing validation result and errors
 */
export const validateMenuItem = (item) => {
  const errors = {};
  
  if (!item.item_name || item.item_name.trim() === '') {
    errors.item_name = 'Item name is required';
  }
  
  if (!item.item_type || item.item_type.trim() === '') {
    errors.item_type = 'Item type/category is required';
  }
  
  if (!item.item_price) {
    errors.item_price = 'Price is required';
  } else if (isNaN(parseFloat(item.item_price)) || parseFloat(item.item_price) <= 0) {
    errors.item_price = 'Price must be a positive number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates admin credentials
 * @param {string} username - Admin username
 * @param {string} password - Admin password
 * @returns {boolean} - True if both fields are non-empty
 */
export const validateAdminCredentials = (username, password) => {
  return username && username.trim() !== '' && password && password.trim() !== '';
};