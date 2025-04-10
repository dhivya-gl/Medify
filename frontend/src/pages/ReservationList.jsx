import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservationList.css';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/reservations');
      setReservations(res.data);
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/reservations/${id}`);
      fetchReservations();
    } catch (err) {
      console.error('Error deleting reservation:', err);
    }
  };

  const handleEdit = (reservation) => {
    setEditingId(reservation.id);
    setEditedData({ ...reservation });
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formattedData = {
        ...editedData,
        reservationTime: new Date(editedData.reservationTime).toISOString().slice(0, 19).replace('T', ' ')
      };
      await axios.put(`http://localhost:3001/reservations/${editingId}`, formattedData);
      setEditingId(null);
      fetchReservations();
    } catch (err) {
      console.error('Error updating reservation:', err);
    }
  };

  return (
    <div className="list-container">
      <h2 className="list-title">Reservation List</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              {editingId === res.id ? (
                <>
                  <td>
                    <input
                      name="customerName"
                      value={editedData.customerName}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="phoneNumber"
                      value={editedData.phoneNumber}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="guests"
                      type="number"
                      value={editedData.guests}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="reservationTime"
                      type="datetime-local"
                      value={
                        editedData.reservationTime
                          ? editedData.reservationTime.slice(0, 16)
                          : ''
                      }
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSave} className="btn save-btn">Save</button>
                    <button onClick={() => setEditingId(null)} className="btn cancel-btn">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{res.customerName}</td>
                  <td>{res.phoneNumber}</td>
                  <td>{res.guests}</td>
                  <td>{new Date(res.reservationTime).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEdit(res)} className="btn edit-btn">Edit</button>
                    <button onClick={() => handleDelete(res.id)} className="btn delete-btn">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
