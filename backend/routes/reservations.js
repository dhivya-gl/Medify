const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET all reservations
router.get('/', (req, res) => {
    const sql = `
    SELECT 
      id, 
      customerName, 
      phoneNumber, 
      guests, 
      DATE_FORMAT(reservationTime, '%Y-%m-%dT%H:%i:%s') AS reservationTime,
      DATE_FORMAT(createdAt, '%Y-%m-%dT%H:%i:%s') AS createdAt,
      DATE_FORMAT(updatedAt, '%Y-%m-%dT%H:%i:%s') AS updatedAt
    FROM Reservations
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST create a reservation
router.post('/', (req, res) => {
  const { customerName, phoneNumber, guests, reservationTime } = req.body;
  const query = `
    INSERT INTO Reservations (customerName, phoneNumber, guests, reservationTime)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [customerName, phoneNumber, guests, reservationTime], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Reservation created', id: result.insertId });
  });
});

// DELETE reservation by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Reservations WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Reservation deleted' });
  });
});

// PUT update reservation by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { customerName, phoneNumber, guests, reservationTime } = req.body;
  const query = `
    UPDATE Reservations 
    SET customerName = ?, phoneNumber = ?, guests = ?, reservationTime = ?
    WHERE id = ?
  `;
  db.query(query, [customerName, phoneNumber, guests, reservationTime, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Reservation updated' });
  });
});

module.exports = router;
