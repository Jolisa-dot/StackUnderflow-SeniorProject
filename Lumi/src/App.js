import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from './components/Login';
import Journal from './components/Journal';
import Wellness from './components/Wellness';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';

function Sidebar({isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
        </button>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/journal">Journal</Link></li>
        <li><Link to="/wellness">Wellness</Link></li>
        <li><Link to="/resources">Resource Hub</Link></li>
      </ul>
    </div>
  );
}

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () =>
    setSidebarOpen(!isSidebarOpen);

  return (
  <BrowserRouter>
  <div className="app-container">
  <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
  <div className="content">
  <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/journal" element={<Journal />} />
  <Route path="/wellness" element={<Wellness />} />
  <Route path="/resources" element={<Resources />} />
  </Routes>
  </div>
  </div>
  </BrowserRouter>
  );
}


export default App;
