import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice'; // Ensure addItem is imported
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + calculateTotalCost(item), 0).toFixed(2);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  // Calculate subtotal for each plant type
  const calculateSubtotalByType = (plantType) => {
    return cart
      .filter(item => item.type === plantType)
      .reduce((subtotal, item) => subtotal + item.cost * item.quantity, 0)
      .toFixed(2);
  };

  // Get unique plant types
  const plantTypes = [...new Set(cart.map(item => item.type))];

  // Handle the continue shopping button
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(); // Call the function passed from the parent component
    }
  };

  // Increment quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Remove an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Add an item to the cart
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  // Calculate total quantity of items in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div>
        {plantTypes.map(plantType => (
          <div key={plantType}>
            <h3>{plantType} Subtotal: ${calculateSubtotalByType(plantType)}</h3>
            {cart
              .filter(item => item.type === plantType)
              .map(item => (
                <div className="cart-item" key={item.name}>
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-cost">${item.cost.toFixed(2)}</div>
                    <div className="cart-item-quantity">
                      <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                      <span className="cart-item-quantity-value">{item.quantity}</span>
                      <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                    <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        Total Quantity: {totalQuantity}
      </div>
      
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
