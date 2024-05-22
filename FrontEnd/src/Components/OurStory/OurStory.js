import React from 'react';
import "./OurStory.css";

function OurStory({ username, onBackToHome, onPageChange }) {


    return (
        <div className="story-container">
            <div className="story-top-row">
                <div className="story-item">
                    <button className="story-button" onClick={() => onPageChange('Menu')}>Menu</button>
                </div>
                <div className="story-item">
                    <button className="story-button" onClick={() => onPageChange('YourOrders')}>Your Orders</button>
                </div>
                <div className="story-item">
                    <h1 className="story-title">Welcome {username}</h1>
                </div>
                <div className="story-item">
                    <button className="story-button" onClick={() => onPageChange('OurStory')}>Our Story</button>
                </div>
                <div className="story-item">
                    <button className="story-button quit" onClick={onBackToHome}>Back</button>
                </div>
            </div>
            <div className="story-left-text">
                <h2>Our story began with a simple idea: </h2>
                <p>
                    Design a coffee takeaway website, with AI can help your order a drink based on your previous preference.
                </p>
                <p>Sihao Yang & Zhewei Zhang</p>
                <p>Course Instructor: Xiang ‘Anthony’ Chen</p>
                <p>2024 Spring ECE 188: Applied & Interactive Machine Learning</p>
            </div>
        </div>
    );
}

export default OurStory;

