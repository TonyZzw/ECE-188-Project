import React, { useState } from 'react';
import './ProductItem.css';
import images from './images'; // Import the images

function ProductItem({ category, product, onAddToCart }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [isAdded, setIsAdded] = useState(false);
    const sizes = ['S', 'M', 'L'];

    const price = (size) => {
        switch (size) {
            case 'S':
                return 2.00;
            case 'M':
                return 3.00;
            case 'L':
                return 4.00;
            default:
                return 0.00;
        }
    };

    const handleSizeClick = (size) => {
        setSelectedSize(prevSize => prevSize === size ? null : size);
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            const item = {
                name: product,
                size: selectedSize,
                quantity: 1,
                unitPrice: price(selectedSize),
                totalPrice: price(selectedSize),  // Initialize total price
                image: images[category][product]
            };
            onAddToCart(item);
            setIsAdded(true);
            setTimeout(() => {
                setIsAdded(false);
            }, 1000);
        }
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
                        <p className="product-price">${price(size).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <button
                className={`add-to-cart ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdded} // Optional: Disable the button while "Added"
            >
                {isAdded ? 'Added' : 'Add to Cart'}
            </button>
        </div>
    );
}

export default ProductItem;
