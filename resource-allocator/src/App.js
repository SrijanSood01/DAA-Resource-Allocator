import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FractionalKnapsack from './components/FractionalKnapsack';
import ZeroOneKnapsack from './components/ZeroOneKnapsack';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fractional" element={<FractionalKnapsack />} />
        <Route path="/zeroone" element={<ZeroOneKnapsack />} />
      </Routes>
    </Router>
  );
};

export default App;
