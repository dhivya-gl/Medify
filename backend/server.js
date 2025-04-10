const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/db');
const reservationRoutes = require('./routes/reservations');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/reservations', reservationRoutes);

app.get('/', (req, res) => {
  res.send('🎉 Reservation backend is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
