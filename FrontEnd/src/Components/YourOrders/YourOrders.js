import React from 'react';


function YourOrders({ username, onBackToHome, onPageChange }) {


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
        </div>
    );
}

export default YourOrders;
