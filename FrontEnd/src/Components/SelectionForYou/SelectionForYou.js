import React, { useState } from 'react';
import './SelectionForYou.css';
import images from '../Menu/images';

const productDetails = {
  'Barista Espresso': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Drip coffee': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Gourmet brewed coffee': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Organic brewed coffee': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Premium brewed coffee': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Hot chocolate': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Brewed Black tea': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Brewed Chai tea': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Brewed Green tea': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] },
  'Brewed herbal tea': { sizes: ['S', 'M', 'L'], prices: [2.00, 3.00, 4.00] }
};

function SelectionForYou({ username, onBackToHome, onPageChange, cartItems, setCartItems }) {
  const [activeButton, setActiveButton] = useState('SelectionForYou');
  const [survey, setSurvey] = useState({
    acidity: 0,
    bitterness: 0,
    sweetness: 0,
    caffeine_content: 'none'
  });
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [recommendedImage, setRecommendedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  const handleButtonClick = (page) => {
    setActiveButton(page);
    onPageChange(page);
  };

  const handleSurveyChange = (event) => {
    const { name, value } = event.target;
    setSurvey({
      ...survey,
      [name]: name === "acidity" || name === "bitterness" || name === "sweetness" ? parseInt(value) : value
    });
  };

  const handleSurveySubmit = () => {
    console.log('User survey:', survey);
  
    const url = 'http://localhost:5001/recommend';
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey),
    })
    .then(response => {
      if (response.ok) {
        return response.json();  // Convert the response to JSON
      }
      throw new Error('Network response was not ok.');  // Handle network errors
    })
    .then(data => {
      console.log('Recommendation received:', data);
      setRecommendedProduct(data.product);
  
      const categoryKeys = Object.keys(images);
      for (const category of categoryKeys) {
        const productImage = images[category][data.product];
        if (productImage) {
          setRecommendedImage(productImage);
          break;
        }
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };
  
  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setIsAdded(false); 
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const item = {
        name: recommendedProduct,
        size: selectedSize,
        quantity: 1,
        unitPrice: price(selectedSize),
        totalPrice: price(selectedSize),
        image: recommendedImage 
      };
  
      const existingItemIndex = cartItems.findIndex(
        cartItem => cartItem.name === item.name && cartItem.size === item.size
      );
  
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        updatedCartItems[existingItemIndex].totalPrice += item.unitPrice;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, item]);
      }
  
      setIsAdded(true);
      console.log(`Added ${item.name} of size ${item.size} to the cart.`);
    } else {
      alert('Please select a size before adding to cart.');
    }
  };

  const price = (size) => {
    const sizeIndex = productDetails[recommendedProduct].sizes.indexOf(size);
    return productDetails[recommendedProduct].prices[sizeIndex];
  };

  return (
    <div className="selection-container">
      <div className="selection-top-row">
        <div className="selection-item">
          <button 
            className={`selection-button ${activeButton === 'Menu' ? 'active' : ''}`} 
            onClick={() => handleButtonClick('Menu')}
          >
            Menu
          </button>
        </div>
        <div className="selection-item">
          <button 
            className={`selection-button ${activeButton === 'YourOrders' ? 'active' : ''}`} 
            onClick={() => handleButtonClick('YourOrders')}
          >
            Your Orders
          </button>
        </div>
        <div className="selection-item">
          <h1 className="selection-title">Welcome {username}</h1>
        </div>
        <div className="selection-item">
          <button 
            className={`selection-button ${activeButton === 'SelectionForYou' ? 'active' : ''}`} 
            onClick={() => handleButtonClick('SelectionForYou')}
          >
            Selection For You
          </button>
        </div>
        <div className="selection-item">
          <button className="selection-button quit" onClick={onBackToHome}>Back</button>
        </div>
      </div>



      <div className="survey-container">
        <div className="card">
          <div className="survey-card">
            <h2>Choose Your Favour</h2>
            <div className="survey-field">
              <label>Acidity:</label>
              <div className="survey-options">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="acidity"
                      value={value}
                      checked={survey.acidity === value}
                      onChange={handleSurveyChange}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
            <div className="survey-field">
              <label>Bitterness:</label>
              <div className="survey-options">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="bitterness"
                      value={value}
                      checked={survey.bitterness === value}
                      onChange={handleSurveyChange}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
            <div className="survey-field">
              <label>Sweetness:</label>
              <div className="survey-options">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="sweetness"
                      value={value}
                      checked={survey.sweetness === value}
                      onChange={handleSurveyChange}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
            <div className="survey-field">
              <label>Caffeine Content:</label>
              <div className="survey-options">
                {['none', 'low', 'medium', 'high'].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="caffeine_content"
                      value={value}
                      checked={survey.caffeine_content === value}
                      onChange={handleSurveyChange}
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleSurveySubmit}>Submit</button>
          </div>



          {recommendedProduct && (
            <div className="recommendation">
              <h3>Recommended Product:</h3>
              <img src={recommendedImage} alt={recommendedProduct} className="recommendation-image" />
              <h3 className="recommendation-title">{recommendedProduct}</h3>
              <div className="recommendation-sizes">
                {productDetails[recommendedProduct].sizes.map(size => (
                  <div key={size} className="recommendation-size">
                    <button
                      className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </button>
                    <p className="product-price">${price(size).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <button
                className={`add-to-cart ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdded} 
              >
                {isAdded ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectionForYou;
