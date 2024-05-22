import React, { useState } from 'react';
import images from './images'; // Import the images
import './ProductItem.css';

function ProductItem({ category, product }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const sizes = ['S', 'M', 'L'];

    const price = (size) => {
        switch (size) {
            case 'S':
                return '$2.00';
            case 'M':
                return '$3.00';
            case 'L':
                return '$4.00';
            default:
                return '$0.00';
        }
    };

    const handleSizeClick = (size) => {
        setSelectedSize(prevSize => prevSize === size ? null : size);
    };

    return (
        <div className="product-item">
            <img src={images[category][product]} alt={product} className="product-image" />
            <h3 className="product-name">{product}</h3>
            <div className="product-sizes">
                {sizes.map(size => (
                    <div key={size} className="product-size">
                        <button
                            className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                            onClick={() => handleSizeClick(size)}
                        >
                            {size}
                        </button>
                        <p className="product-price">{price(size)}</p>
                    </div>
                ))}
            </div>
            <button className="add-to-cart">Add to Cart</button>
        </div>
    );
}

export default ProductItem;
