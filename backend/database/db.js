const mysql = require('mysql2');

const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'bornNila24*4', database: 'reservations_db' });

db.connect((err) => { if (err) throw err; console.log('✅ Connected to MySQL Database'); });

module.exports = db;