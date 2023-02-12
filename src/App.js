import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import SkincareStepProducts from './Pages/SkincareStepProducts';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/skincare-step-products" element={<SkincareStepProducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
