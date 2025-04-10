import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReservationForm from "./pages/ReservationForm";
import ReservationList from "./pages/ReservationList";

function App() {
  const navbarStyle = {
    backgroundColor: '#1E3A8A', // Deep blue
    padding: '1rem',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const linkHoverStyle = {
    ':hover': {
      backgroundColor: '#3B82F6', // Lighter blue on hover
      transform: 'translateY(-2px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    '::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '2px',
      backgroundColor: '#93C5FD',
      bottom: '0',
      left: '0',
      transform: 'scaleX(0)',
      transformOrigin: 'bottom right',
      transition: 'transform 0.3s ease-out'
    },
    ':hover::after': {
      transform: 'scaleX(1)',
      transformOrigin: 'bottom left'
    }
  };

  return (
    <Router>
      <div className="p-4">
        <nav style={navbarStyle}>
          <Link 
            to="/" 
            style={{...linkStyle}}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3B82F6';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Create Reservation
          </Link>
          <Link 
            to="/reservations" 
            style={{...linkStyle}}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3B82F6';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            View Reservations
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<ReservationForm />} />
          <Route path="/reservations" element={<ReservationList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;