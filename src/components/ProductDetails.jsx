import React, { useCallback, useEffect, useState } from 'react';
import './ProductDetails.css'

function ProductDetails() {
    const [data, setData] = useState([])
    const selectedColor = useState(localStorage.getItem('selectedColor') || 'navy')[0];
    const selectedSize = useState(localStorage.getItem('selectedSize') || 'medium')[0];

    
    const fetchDetails = useCallback(async (color = '', size = '') => {
        let url = `https://fakestoreapi.com/products/1`;
        try {
          // There is no API endpoint for the product with a different variations,
          // If it occured I would do something like this:
          if (color || size) {
            // Assuming that API endpoint for the specific product would be, for example: 
            // 'https://fakestoreapi.com/products/1/medium/green'
            // line of code below is responsible for adding informations to the URL,
            // therefore new URL would be created and new data about the specific variant would be fetched 

            // url += `/${size}/${color}`
          }
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response error');
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }, []);

      // Added 'selectedColor' and 'selectedSize' in order to execute fetchDetails again 
      // and fetch new data about the variant of the product that client have choosen
      useEffect(() => {
        fetchDetails(selectedColor, selectedSize);
      }, [fetchDetails, selectedColor, selectedSize]);
      
      const colorChange = (color) => {
        console.log(`Variation Swatch has changed to: ${color}`)
        localStorage.setItem('selectedColor', color);
        window.location.reload();
      };

      const pocketChange = (size) => {
        console.log(`Size variation has changed to: ${size}`)
        localStorage.setItem('selectedSize', size);
        window.location.reload();
      };

      const addToCart = (product, price, color, size) => {
        console.log(`Added to cart ${product} for price ${price} in configuration [${color}, ${size}]`)
      }

    return (
        <div className='container'>
            <div className='image'>
                <img src={data.image} alt="product" />
            </div>
            <div className="informations">
                <div className="description">
                    <p>{data.category}</p>
                    <p>{data.title}</p>
                    <p>{data.description}</p>
                </div>
                <p>Color</p>
                <div className="color-change-info">
                    <button 
                      id='navy' 
                      onClick={() => colorChange('navy')}
                      className={selectedColor === 'navy' ? 'selected' : ''}>
                    </button>
                    <button 
                      id='red' 
                      onClick={() => colorChange('red')}
                      className={selectedColor === 'red' ? 'selected' : ''}>
                    </button>
                    <button 
                      id='green' 
                      onClick={() => colorChange('green')}
                      className={selectedColor === 'green' ? 'selected' : ''}>
                    </button>
                </div>
                <p>Size of pocket</p>
                <div className="size-info">
                    <button 
                      id='small' 
                      onClick={() => pocketChange('small')}
                      className={selectedSize === 'small' ? 'selected' : ''}>Small
                    </button>
                    <button 
                      id='medium' 
                      onClick={() => pocketChange('medium')}
                      className={selectedSize === 'medium' ? 'selected' : ''}>Medium
                    </button>
                    <button 
                      id='large' 
                      onClick={() => pocketChange('large')}
                      className={selectedSize === 'large' ? 'selected' : ''}>Large
                    </button>
                </div>
                <a href="/configure" target='_blank'>&#x3f; How to configure your backpack</a>
                <div className="cart-details">
                    <p>{data.price}$</p>
                    <button 
                      id='add-to-cart' 
                      onClick={() => addToCart(data.title, data.price, selectedColor, selectedSize)}>Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
  }
  
  export default ProductDetails;
  