import React, { useEffect } from 'react';
import './Home.css';
import coffeeVideo from '../Assets/concern.mp4';
import coffeeBean from '../Assets/coffeeBean.jpg';
import groundCoffee from '../Assets/groundCoffee2.jpg';
import coffee from '../Assets/coffee.jpg';
import { Application } from '@splinetool/runtime';

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
          <button className="home-button" onClick={() => onPageChange('OurStory')}>Our Story</button>
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
            <p>start from $2.00</p>
          </div>
          <div className="canvas-container">
            <canvas id="canvas3d-2" className="spline-canvas"></canvas>
            <p>Medium Cup</p>
            <p>start from $3.00</p>
          </div>
          <div className="canvas-container">
            <canvas id="canvas3d-3" className="spline-canvas"></canvas>
            <p>Large Cup</p>
            <p>start from $4.00</p>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Home;

