import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from './components/HomePage';
import Journal from './components/Journal';
import Wellness from './components/Wellness';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/journal">Journal</Link>
          </li>
          <li>
            <Link to="/wellness">Wellness Activities</Link>
          </li>
          <li>
            <Link to="/resources">Resource Hub</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
