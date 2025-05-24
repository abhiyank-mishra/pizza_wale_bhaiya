// Storage utility functions for managing menu items, orders and admin users

// Load menu items from JSON file
export const loadMenuItems = async () => {
  try {
    const response = await fetch('/data/menu.json');
    if (!response.ok) {
      throw new Error('Failed to load menu items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading menu items:', error);
    // Return empty array if menu.json doesn't exist yet or there's an error
    return [];
  }
};

// Save menu items to JSON file
export const saveMenuItems = async (menuItems) => {
  try {
    const response = await fetch('/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuItems),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save menu items');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving menu items:', error);
    throw error;
  }
};

// Load orders from JSON file
export const loadOrders = async () => {
  try {
    const response = await fetch('/data/orders.json');
    if (!response.ok) {
      throw new Error('Failed to load orders');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading orders:', error);
    // Return empty array if orders.json doesn't exist yet or there's an error
    return [];
  }
};

// Save a new order or update existing customer order
export const saveOrder = async (orderData) => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save order');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

// Load admin users from JSON file
export const loadAdminUsers = async () => {
  try {
    const response = await fetch('/data/users.json');
    if (!response.ok) {
      throw new Error('Failed to load admin users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading admin users:', error);
    // Return default admin if users.json doesn't exist yet
    return [{ username: 'admin', password: 'admin' }];
  }
};

// Save admin users to JSON file
export const saveAdminUsers = async (users) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save admin users');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving admin users:', error);
    throw error;
  }
};

// Authenticate admin user
export const authenticateAdmin = async (username, password) => {
  try {
    const users = await loadAdminUsers();
    const user = users.find(u => 
      u.username === username && u.password === password
    );
    
    return !!user; // Return true if user exists, false otherwise
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

// Update admin credentials
export const updateAdminCredentials = async (currentUsername, currentPassword, newUsername, newPassword) => {
  try {
    // First verify current credentials
    const isAuthenticated = await authenticateAdmin(currentUsername, currentPassword);
    
    if (!isAuthenticated) {
      return { success: false, message: 'Current credentials are incorrect' };
    }
    
    // Load all users
    const users = await loadAdminUsers();
    
    // Replace the matching user with updated credentials
    const updatedUsers = users.map(user => {
      if (user.username === currentUsername && user.password === currentPassword) {
        return { username: newUsername, password: newPassword };
      }
      return user;
    });
    
    // Save updated users
    await saveAdminUsers(updatedUsers);
    
    return { success: true, message: 'Credentials updated successfully' };
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    throw error;
  }
};