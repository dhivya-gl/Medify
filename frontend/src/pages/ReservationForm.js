  import React, { useState } from 'react';
  import axios from 'axios';
  import './ReservationForm.css';

  function ReservationForm() {
    const [formData, setFormData] = useState({
      customerName: '',
      phoneNumber: '',
      guests: '',
      reservationTime: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:3001/reservations', formData);
        setMessage('✅ Reservation created successfully!');
        setFormData({ customerName: '', phoneNumber: '', guests: '', reservationTime: '' });
      } catch (err) {
        setMessage('❌ Error creating reservation');
        console.error(err);
      }
    };

    return (
      <div className="reservation-form-container">
        <h2>Create a Reservation</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={formData.guests}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  export default ReservationForm;
