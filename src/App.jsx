import React from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import "./styles.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <div className="main">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;