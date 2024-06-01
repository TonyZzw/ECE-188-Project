import React, { useState } from 'react';
import './PaymentModal.css';
import default_image from '../Assets/card.jpg';
import visa from'../Assets/visa.jpg';
import master from '../Assets/master.jpg';

function PaymentModal({ onClose, onSubmit }) {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardImage, setCardImage] = useState(default_image); // Use your default card image path

  const handleCardNumberChange = (event) => {
    const number = event.target.value;
    setCardNumber(number);

    if (number.startsWith('4')) {
      setCardImage(visa); 
    } else if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) {
      setCardImage(master); 
    } else {
      setCardImage(default_image); 
    }
  };

  return (
    <div className="payment-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Payment Information</h2>
        <div className="image-container">
          <img src={cardImage} alt="Credit Card" />
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ cardNumber, name, billingAddress, cvv });
        }}>
          <div className="form-row split">
            <label className="half-width">
              Card Number:
              <input type="text" value={cardNumber} onChange={handleCardNumberChange} required />
            </label>
            <label className="small-width">
              CVV:
              <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            </label>
          </div>
          <div className="form-row split">
            <label className="half-width">
              Name on Card:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label className="half-width">
              Billing Address:
              <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} required />
            </label>
          </div>
          <button type="submit" className="pay-button">Pay</button>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
