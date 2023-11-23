import './ProductDetails.css'
import React, { useCallback, useEffect, useState } from 'react';

function ProductDetails() {
    const [data, setData] = useState([])
    const [selectedColor, setSelectedColor] = useState('Navy');
    const [selectedSize, setSelectedSize] = useState('Medium');
    
    const fetchDetails = useCallback(async () => {
        let url = 'https://fakestoreapi.com/products/1';
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, []);

      useEffect(() => {
        fetchDetails();
      }, [fetchDetails]);
      
      const colorChange = (color) => {
        console.log(`Variation Swatch has changed to: ${color}`)
        setSelectedColor(color);
      };

      const pocketChange = (size) => {
        console.log(`Size variation has changed to: ${size}`)
        setSelectedSize(size);
      };

      const addToCart = (product, price, color, size) => {
        console.log(`Added to cart ${product} for price ${price} in configuration [${color}, ${size}]`)
      }

    return (
        <div className='container'>
            <div className='image'>
                <img src={data.image} alt="image" />
            </div>
            <div className="informations">
                <div className="description">
                    <p>{data.category}</p>
                    <p>{data.title}</p>
                    <p>{data.description}</p>
                </div>
                <p>Color</p>
                <div className="color-change-info">
                    <button id='navy' onClick={() => colorChange('Navy')}
                    className={selectedColor === 'Navy' ? 'selected' : ''}></button>
                    <button id='red' onClick={() => colorChange('Red')}
                    className={selectedColor === 'Red' ? 'selected' : ''}></button>
                    <button id='green' onClick={() => colorChange('Green')}
                    className={selectedColor === 'Green' ? 'selected' : ''}></button>
                </div>
                <p>Size of pocket</p>
                <div className="size-info">
                    <button id='small' onClick={() => pocketChange('Small')}
                    className={selectedSize === 'Small' ? 'selected' : ''}>Small</button>
                    <button id='medium' onClick={() => pocketChange('Medium')}
                    className={selectedSize === 'Medium' ? 'selected' : ''}>Medium</button>
                    <button id='large' onClick={() => pocketChange('Large')}
                    className={selectedSize === 'Large' ? 'selected' : ''}>Large</button>
                </div>
                <a href="/configure" target='_blank'>&#x3f; How to configure your backpack</a>
                <div className="cart-details">
                    <p>{data.price}$</p>
                    <button id='add-to-cart' onClick={() => addToCart(data.title, data.price, selectedColor, selectedSize)}>Add to cart</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default ProductDetails;
  