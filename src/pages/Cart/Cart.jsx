import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState(''); // State to store promo code
  const navigate = useNavigate(); // Properly initialize useNavigate

  // Calculate subtotal
  const subtotal = Object.keys(cartItems).reduce((acc, id) => {
    const item = food_list.find((food) => food._id === id);
    if (item) {
      return acc + item.price * cartItems[id];
    }
    return acc;
  }, 0);

  // Define delivery fee and total
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  const handlePromoCodeSubmit = () => {
    // Handle promo code logic here (e.g., apply discount)
    console.log(`Promo code submitted: ${promoCode}`);
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-header">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItems).map((id) => {
          const item = food_list.find((food) => food._id === id);
          if (item) {
            return (
              <div key={id} className='cart-items-row'>
                <img src={item.image} alt={item.name} className='cart-item-image' />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[id]}</p>
                <p>${(item.price * cartItems[id]).toFixed(2)}</p>
                <button onClick={() => removeFromCart(id)}>Remove</button>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${total.toFixed(2)}</b>
          </div>
        </div>
        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>

      <div className="cart-promocode">
        <p>If you have a promo code, enter it here:</p>
        <div className='cart-promocode-input'>
          <input 
            type="text" 
            placeholder='Promo code'
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)} 
          />
          <button onClick={handlePromoCodeSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default Cart;