import React from 'react';
import './YourOrders.css';

function YourOrders({ username, onBackToHome, onPageChange, cartItems, setCartItems }) {
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
        <div className="menu-container">
            <div className="menu-top-row">
                <div className="menu-item">
                    <button className="menu-button" onClick={() => onPageChange('Menu')}>Menu</button>
                </div>
                <div className="menu-item">
                    <button className="menu-button" onClick={() => onPageChange('YourOrders')}>Your Orders</button>
                </div>
                <div className="menu-item">
                    <h1 className="menu-title">Welcome {username}</h1>
                </div>
                <div className="menu-item">
                    <button className="menu-button" onClick={() => onPageChange('OurStory')}>Our Story</button>
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
