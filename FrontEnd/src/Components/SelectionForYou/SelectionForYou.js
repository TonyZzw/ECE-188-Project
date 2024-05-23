import React from 'react';
import './SelectionForYou.css';
// import baristaEspresso from '../../Assets/menu_image/Coffee/BaristaEspresso.jpg'; // 确保路径正确
import BaristaEspresso from '../Assets/menu_image/Coffee/BaristaEspresso.jpg';
function SelectionForYou({ username, onBackToHome, onPageChange }) {
  const recommendations = [
    {
      name: "BaristaEspresso",
      image: BaristaEspresso
    }
    // 你可以添加更多的推荐项目
  ];

  return (
    <div className="selection-container">
      <div className="selection-top-row">
        <div className="selection-item">
          <button className="selection-button" onClick={() => onPageChange('Menu')}>Menu</button>
        </div>
        <div className="selection-item">
          <button className="selection-button" onClick={() => onPageChange('YourOrders')}>Your Orders</button>
        </div>
        <div className="selection-item">
          <h1 className="selection-title">Welcome {username}</h1>
        </div>
        <div className="selection-item">
          <button className="selection-button" onClick={() => onPageChange('SelectionForYou')}>Selection For You</button>
        </div>
        <div className="selection-item">
          <button className="selection-button quit" onClick={onBackToHome}>Back</button>
        </div>
      </div>
      <div className="selection-left-text">
        <h2>Recommended for you:</h2>
        <div className="recommendation-list">
          {recommendations.map((item, index) => (
            <div key={index} className="recommendation-item">
              <img src={item.image} alt={item.name} className="recommendation-image" />
              <p className="recommendation-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectionForYou;
