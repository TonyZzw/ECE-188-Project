import React, { useEffect } from 'react';
import { Application } from '@splinetool/runtime';
import './Home.css';

import coffeeVideo from '../Assets/concern.mp4';
import coffeeBean from '../Assets/coffeeBean.jpg';
import groundCoffee from '../Assets/groundCoffee2.jpg';
import coffee from '../Assets/coffee.jpg';

import scone from '../Assets/menu_image/Bakery/Scone.jpg';
import dripCoffee from '../Assets/menu_image/Coffee/DripCoffee.jpg';
import brewedChaiTea from '../Assets/menu_image/Tea/BrewedChaiTea.jpg';

function Home({ username, onPageChange }) {

  useEffect(() => {
    const canvas1 = document.getElementById('canvas3d-1');
    const app1 = new Application(canvas1);
    app1.load('https://prod.spline.design/dMY22gIOoT-S1CRW/scene.splinecode');

    const canvas2 = document.getElementById('canvas3d-2');
    const app2 = new Application(canvas2);
    app2.load('https://prod.spline.design/WLlBrjNDNSqsSH34/scene.splinecode');
    
    const canvas3 = document.getElementById('canvas3d-3');
    const app3 = new Application(canvas3);
    app3.load('https://prod.spline.design/iFIYEmB68YfGJ83d/scene.splinecode');
    
  }, []);
  
  return (
    <div className="home-container">
      <div className="home-top-row">
        <div className="home-item">
          <button className="home-button" onClick={() => onPageChange('Menu')}>Menu</button>
        </div>
        <div className="home-item">
          <button className="home-button" onClick={() => onPageChange('YourOrders')}>Your Orders</button>
        </div>
        <div className="home-item">
          <h1 className="home-title">Welcome {username}</h1>
        </div>
        <div className="home-item">
          <button className="home-button" onClick={() => onPageChange('SelectionForYou')}>Selection For You</button>
        </div>
        <div className="home-item">
          <button className="home-button quit" onClick={() => onPageChange('quit')}>Quit</button>
        </div>
      </div>



      <div className="content-container">
        <div className="text-content">
          <p>Taste Your Coffee Here @</p>
          <h2>COZY CORNER COFFEE</h2>
          <p>Embrace the tranquility and cherish the moments of solitude, where you can find peace and reconnect with yourself</p>
        </div>
        <div className="image-content">
          <video src={coffeeVideo} autoPlay loop muted playsInline alt="Peruvian Coffee Video" />
        </div>
      </div>



      <div className="content-container">
        <div className="middle-content">
          <div className="image-side">
            <img src={coffeeBean} alt="coffeeBean" />
          </div>
          <div className="text-side">
            <h2>Our Special Blend</h2>
            <p>Discover the unique flavors and aromas of our special blend.</p>
          </div>
        </div>
      </div>



      <div className="content-container">
        <div className="middle-content">
          <div className="text-side">
            <h2>Ground Coffee</h2>
            <p>Savor the essence of freshly ground coffee, where each sip carries a story of rich, full-bodied flavor, perfectly crafted for your enjoyment.</p>
          </div>
          <div className="image-side">
            <img src={groundCoffee} alt="Ground Coffee" />
          </div>
        </div>
      </div>



      <div className="content-container">
        <div className="middle-content">
          <div className="image-side">
            <img src={coffee} alt="coffee" />
          </div>
          <div className="text-side">
            <h2>Coffee Extraction</h2>
            <p>Savor the essence of freshly ground coffee, where each sip carries a story of rich, full-bodied flavor, perfectly crafted for your enjoyment.</p>
          </div>
        </div>
      </div>



      <div className="cup-size-heading">
        <h2>Pick your cup size</h2>
      </div>
      
      <div className="content-container">
        <div className="canvas-wrapper">
          <div className="canvas-container">
            <canvas id="canvas3d-1" className="spline-canvas"></canvas>
            <p>Small Cup</p>
            <p>Start from $2.00</p>
          </div>
          <div className="canvas-container">
            <canvas id="canvas3d-2" className="spline-canvas"></canvas>
            <p>Medium Cup</p>
            <p>Start from $3.00</p>
          </div>
          <div className="canvas-container">
            <canvas id="canvas3d-3" className="spline-canvas"></canvas>
            <p>Large Cup</p>
            <p>Start from $4.00</p>
          </div>
        </div>
      </div>



      <div className="best-seller-heading">
        <h2>Best Sellers</h2>
      </div>
      
      <div className="best-seller-row">
        <div className="best-seller-card">
          <img src={dripCoffee} alt="Drip Coffee" className="best-seller-image" />
          <div className="best-seller-name">Drip Coffee</div>
          <div className="best-seller-description">Rich and smooth drip coffee.</div>
        </div>
      </div>
      <div className="best-seller-row">
        <div className="best-seller-card">
          <img src={brewedChaiTea} alt="Brewed Chai Tea" className="best-seller-image" />
          <div className="best-seller-name">Brewed Chai Tea</div>
          <div className="best-seller-description">Freshly brewed chai tea.</div>
        </div>
      </div>
      <div className="best-seller-row">
        <div className="best-seller-card">
          <img src={scone} alt="Scone" className="best-seller-image" />
          <div className="best-seller-name">Scone</div>
          <div className="best-seller-description">A deliciously light and fluffy scone.</div>
        </div>
      </div>



      <div className="footer">
        <hr className="footer-line"/>
        <div className="footer-content">
          <p>© 2024 Cozy Corner Coffee All rights reserved.</p>
          <p><a href="/terms-of-use">Terms of Use</a></p>
          <p><a href="/privacy-policy">Privacy Policy</a></p>
        </div>
      </div>

    </div>
  );
}

export default Home;