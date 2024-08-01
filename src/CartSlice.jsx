import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Adds a new item to the cart or updates the quantity if it already exists
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        // If the item exists, update its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If the item does not exist, add it to the array
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },
    
    // Removes an item from the cart based on its name
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);
    },
    
    // Updates the quantity of an existing item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
