import React from 'react';
import './CartItem.css';

const CartItem = ({ plant, handleIncrement, handleDecrement }) => {
    return (
        <div className="cart-item">
            <img src={plant.image} alt={plant.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
                <p>Cost: ${plant.cost}</p>
                <div className="cart-item-controls">
                    <button onClick={handleDecrement}>-</button>
                    <span>{plant.quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
