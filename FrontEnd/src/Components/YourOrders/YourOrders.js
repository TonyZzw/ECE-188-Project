import React, { useState } from 'react';
import './YourOrders.css';

function YourOrders({ username, onBackToHome, onPageChange, cartItems, setCartItems }) {
    const [activeButton, setActiveButton] = useState('YourOrders');

    const handleButtonClick = (page) => {
        setActiveButton(page);
        onPageChange(page);
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        if (newQuantity <= 0) {
            updatedCartItems.splice(index, 1); // Remove item if quantity is 0 or less
        } else {
            updatedCartItems[index].quantity = newQuantity;
            updatedCartItems[index].totalPrice = newQuantity * updatedCartItems[index].unitPrice;
        }
        setCartItems(updatedCartItems);
    };

    const handleDeleteItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    return (
        <div className="yourorder-container">
            <div className="yourorder-top-row">
                <div className="yourorder-item">
                    <button 
                        className={`yourorder-button ${activeButton === 'Menu' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Menu')}
                    >
                        Menu
                    </button>
                </div>
                <div className="yourorder-item">
                    <button 
                        className={`yourorder-button ${activeButton === 'YourOrders' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('YourOrders')}
                    >
                        Your Orders
                    </button>
                </div>
                <div className="yourorder-item">
                    <h1 className="yourorder-title">Welcome {username}</h1>
                </div>
                <div className="yourorder-item">
                <button 
                        className={`yourorder-button ${activeButton === 'SelectionForYou' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('SelectionForYou')}
                    >
                        Selection For You
                    </button>
                </div>
                <div className="menu-item">
                    <button className="menu-button quit" onClick={onBackToHome}>Back</button>
                </div>
            </div>

            <div className="orders-container">
                <h1 className="checkout-title">Checkout List</h1>
                <div className="order-headers">
                    <span className="header-item">Item</span>
                    <span className="header-size">Size</span>
                    <span className="header-quantity">Quantity</span>
                    <span className="header-price">Price</span>
                </div>
                {cartItems.map((item, index) => (
                    <div key={index} className="order-item">
                        <img src={item.image} alt={item.name} className="order-image" />
                        <div className="order-details">
                            <h3 className="order-name">{item.name}</h3>
                            <p className="order-size">Size: {item.size}</p>
                            <input
                                type="number"
                                className="order-quantity"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                min="0"
                            />
                            <p className="order-price">${item.totalPrice.toFixed(2)}</p>
                            <button className="delete-button" onClick={() => handleDeleteItem(index)}>Delete</button>
                        </div>
                    </div>
                ))}
                <button className="checkout-button">Checkout</button>
            </div>
        </div>
    );
}

export default YourOrders;
