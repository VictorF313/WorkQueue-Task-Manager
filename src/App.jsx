import React from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import "./styles.css";

const App = () => {
  return (
    <div className="main">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;