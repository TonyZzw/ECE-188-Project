import React, { useState } from 'react';
import ChatBox from '../ChatWithAi/ChatBox';
import './Menu.css';
import ProductItem from './ProductItem';

const categories = {
    Coffee: ['Barista Espresso', 'Drip coffee', 'Gourmet brewed coffee', 'Organic brewed coffee', 'Premium brewed coffee'],
    Chocolate: ['Hot chocolate'],
    Tea: ['Brewed Black tea', 'Brewed Chai tea', 'Brewed Green tea', 'Brewed herbal tea'],
    Bakery: ['Biscotti', 'Pastry', 'Scone'],
    LooseTea: ['Black tea', 'Chai tea', 'Green tea', 'Herbal tea'],
    CoffeeBeans: ['Espresso Beans', 'Gourmet Beans', 'Green beans', 'House blend Beans', 'Organic Beans', 'Premium Beans']
};

function Menu({ username, onBackToHome, onPageChange, cartItems, setCartItems }) {
    const [messages, setMessages] = useState([]);
    const [isChatVisible, setIsChatVisible] = useState(true);
    const [activeButton, setActiveButton] = useState('Menu');

    const handleButtonClick = (page) => {
        setActiveButton(page);
        onPageChange(page);
    };

    const sendMessage = (msg) => {
        if (msg.trim() !== '') {
            setMessages([...messages, msg]);
        }
    };

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    const handleAddToCart = (item) => {
        const existingItemIndex = cartItems.findIndex(
            cartItem => cartItem.name === item.name && cartItem.size === item.size
        );
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            updatedCartItems[existingItemIndex].totalPrice += item.unitPrice; // Update total price
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    return (
        <div className="menu-container">
            <div className="menu-top-row">
                <div className="menu-item">
                    <button 
                        className={`menu-button ${activeButton === 'Menu' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Menu')}
                    >
                        Menu
                    </button>
                </div>
                <div className="menu-item">
                    <button 
                        className={`menu-button ${activeButton === 'YourOrders' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('YourOrders')}
                    >
                        Your Orders
                    </button>
                </div>
                <div className="menu-item">
                    <h1 className="menu-title">Welcome {username}</h1>
                </div>
                <div className="menu-item">
                    <button 
                        className={`menu-button ${activeButton === 'SelectionForYou' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('SelectionForYou')}
                    >
                        Selection For You
                    </button>
                </div>
                <div className="menu-item">
                    <button className="menu-button quit" onClick={onBackToHome}>Back</button>
                </div>
            </div>
        
            <button onClick={toggleChatVisibility} className={`chat-toggle ${!isChatVisible ? 'chat-toggle-hidden' : ''}`}>
                {isChatVisible ? 'Hide Chat' : 'Show Chat'}
            </button>
            {isChatVisible && (
                <ChatBox onSendMessage={sendMessage} messages={messages} />
            )}

            <div className="product-categories">
                {Object.keys(categories).map(category => (
                    <div key={category} className="category-section">
                        <h2 className="category-title">{category}</h2>
                        <div className="product-list">
                            {categories[category].map(product => (
                                <ProductItem key={product} category={category} product={product} onAddToCart={handleAddToCart} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
