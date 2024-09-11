import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, addItem, removeItem } from './slices/cartSlice'; // Import actions
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  useEffect(() => {
    // Load cart from localStorage and dispatch to Redux store
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(loadCart(savedCart));
  }, [dispatch]);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .product {
            border: 1px solid #ddd;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
          }
          .product h2 {
            margin: 0;
            font-size: 1.5em;
          }
          .product p {
            margin: 0;
            color: #555;
          }
          .button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
          }
          .button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      <h1>Product Listing</h1>
      <div>
        {products.map(product => (
          <div key={product._id} style={styles.product}>
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <button style={styles.button} onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h1>Shopping Cart</h1>
      <div>
        {cart.map(item => (
          <div key={item._id} style={styles.product}>
            <h2>{item.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <button style={styles.button} onClick={() => handleRemoveItem(item._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
  },
  product: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default App;
