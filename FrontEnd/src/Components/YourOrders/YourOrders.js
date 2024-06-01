import React, { useState } from 'react';
import PaymentModal from '../Payment/PaymentModal'
import './YourOrders.css';

function YourOrders({ username, email, onBackToHome, onPageChange, cartItems, setCartItems }) {
    const [activeButton, setActiveButton] = useState('YourOrders');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
    };    

    const handleButtonClick = (page) => {
        setActiveButton(page);
        onPageChange(page);
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        if (newQuantity <= 0) {
            updatedCartItems.splice(index, 1); 
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

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            console.log('No items in cart.');
            return;  
        }
        console.log('Checkout initiated for:', email);
        setShowPaymentModal(true); 
    };
      
    const handlePaymentSubmit = async (paymentDetails) => {
        console.log('Payment Details:', paymentDetails);
        console.log('Cart Items:', cartItems);
        console.log('Total Price: $', calculateTotalPrice());
    
        const payload = {
            username: username,
            email: email,
            cartItems: cartItems,
            totalPrice: calculateTotalPrice()
        };

        setShowPaymentModal(false);
        setCartItems([]);
    
        // try {
        //     const response = await fetch('http://127.0.0.1:3000/confirmation', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(payload)
        //     });
    
        //     console.log('HTTP Status:', response.status); // Log the HTTP status
    
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
    
        //     const responseData = await response.json();
        //     console.log('Server Response:', responseData);
    
        //     if (responseData.success) {
        //         setShowPaymentModal(false);
        //         setCartItems([]);
        //     } else {
        //         console.error('Payment processing failed:', responseData.message);
        //     }
    
        // } catch (error) {
        //     console.error('Error during payment submission:', error);
        //     console.log('Falling into error block.');
        // }
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

                <hr className="total-divider" />
                <div className="total-price-container">
                    <span className="total-price-label">Total Price:</span>
                    <span className="total-price-value">${calculateTotalPrice()}</span>
                </div>
                
                {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} onSubmit={handlePaymentSubmit} />}
                <button className="checkout-button" onClick={handleCheckout} disabled={cartItems.length === 0}>
                    Checkout
                </button>                
            </div>

        </div>
    );
}

export default YourOrders;
