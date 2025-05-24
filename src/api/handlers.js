// src/api/handlers.js
import { promises as fs } from 'fs';
import path from 'path';

// Define paths to JSON data files
const menuFilePath = path.resolve('./public/data/menu.json');
const ordersFilePath = path.resolve('./public/data/orders.json');
const usersFilePath = path.resolve('./public/data/users.json');

// Helper function to read JSON file
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Helper function to write JSON file
const writeJsonFile = async (filePath, data) => {
  const dirPath = path.dirname(filePath);
  
  // Ensure directory exists
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
  
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Menu API handlers
export const handleGetMenu = async () => {
  return await readJsonFile(menuFilePath);
};

export const handleSaveMenu = async (req, res) => {
  try {
    const menuItems = req.body;
    await writeJsonFile(menuFilePath, menuItems);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving menu:', error);
    return res.status(500).json({ error: 'Failed to save menu items' });
  }
};

// Order API handlers
export const handleGetOrders = async () => {
  return await readJsonFile(ordersFilePath);
};

export const handleSaveOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    const orders = await readJsonFile(ordersFilePath);
    
    // Check if the customer exists
    const existingCustomerIndex = orders.findIndex(
      order => order.customerPhone === newOrder.customerPhone
    );
    
    if (existingCustomerIndex !== -1) {
      // Update visit count but keep the same customerID
      newOrder.customerId = orders[existingCustomerIndex].customerId;
      
      // Replace the customer record with the updated one
      orders[existingCustomerIndex] = newOrder;
    } else {
      // Add new customer
      orders.push(newOrder);
    }
    
    await writeJsonFile(ordersFilePath, orders);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving order:', error);
    return res.status(500).json({ error: 'Failed to save order' });
  }
};

// User API handlers
export const handleGetUsers = async () => {
  // First check if users file exists, if not create with default admin
  try {
    const users = await readJsonFile(usersFilePath);
    if (users.length === 0) {
      const defaultAdmin = [{ username: 'admin', password: 'admin' }];
      await writeJsonFile(usersFilePath, defaultAdmin);
      return defaultAdmin;
    }
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    // Return default admin if there's an error
    return [{ username: 'admin', password: 'admin' }];
  }
};

export const handleUpdateUsers = async (req, res) => {
  try {
    const users = req.body;
    await writeJsonFile(usersFilePath, users);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating users:', error);
    return res.status(500).json({ error: 'Failed to update users' });
  }
};

// Setup API middleware for Vite dev server
export const setupAPIHandlers = (app) => {
  // Menu endpoints
  app.get('/data/menu.json', async (req, res) => {
    try {
      const menu = await handleGetMenu();
      res.json(menu);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load menu' });
    }
  });
  
  app.post('/api/menu', (req, res) => handleSaveMenu(req, res));
  
  // Orders endpoints
  app.get('/data/orders.json', async (req, res) => {
    try {
      const orders = await handleGetOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load orders' });
    }
  });
  
  app.post('/api/orders', (req, res) => handleSaveOrder(req, res));
  
  // Users endpoints
  app.get('/data/users.json', async (req, res) => {
    try {
      const users = await handleGetUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load users' });
    }
  });
  
  app.post('/api/users', (req, res) => handleUpdateUsers(req, res));
};