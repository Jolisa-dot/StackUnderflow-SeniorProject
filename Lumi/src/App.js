import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/Login';
import Journal from './components/Journal';
import Wellness from './components/Wellness';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';

import '@fortawesome/fontawesome-free/css/all.min.css';

function Sidebar({isOpen, toggleSidebar, setSidebarOpen}) {
    return (
        <><div className='sidebar-hover-area' onMouseEnter={() => setSidebarOpen(true)}></div>
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`} onMouseLeave={() => setSidebarOpen(false)}>
            <button className="close-btn fa fa-chevron-left" onClick={toggleSidebar}>
            </button>

            <div id="sidebar-container">
                <ul className="nav-link-group">
                    {/* Header space for logo */}
                    <li className="nav-link sidebar-heading">
                    <img src="#" alt="lumi-logo" />
                    </li>

                    {/* Menu options */}

                    <a href="/dashboard" className="nav-link">
                        <div className="dashboard-button">
                            <span className="fa fa-dashboard"></span>
                            <span className="label">Dashboard</span>
                        </div>
                    </a>
                    <a href="/journal" className="nav-link">
                        <div className="journal-button">
                            <span className="fa fa-book"></span>
                            <span className="label">Journal</span>
                        </div>
                    </a>
                    <a href="/wellness" className="nav-link">
                        <div className="wellness-button">
                            <span className="fa fa-smile"></span>
                            <span className="label">Wellness</span>
                        </div>
                    </a>
                    <a href="/resources" className="nav-link">
                        <div className="resource-button">
                            <span className="fa fa-info-circle"></span>
                            <span className="label">Resources</span>
                        </div>
                    </a>
                    <a href="/login" className="nav-link">
                        <div className="logout-button">
                            <span className="fa fa-arrow-right-from-bracket"></span>
                            <span className="label">Logout</span>
                        </div>
                    </a>
                </ul>
            </div>
        </div></>
    );
}

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <BrowserRouter>
            <div className="app-container">
                <Sidebar isOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
                setSidebarOpen={setSidebarOpen}/>
                <div className='sidebar-hover-area' onMouseEnter={() => setSidebarOpen(true)}></div><div className={`content ${isSidebarOpen ? '' : 'collapsed'}`}>
                    <Routes>
                        {/*TODO: Either make dashboard the default homepage or create new home page--login can't be the home*/}
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/journal" element={<Journal/>}/>
                        <Route path="/wellness" element={<Wellness/>}/>
                        <Route path="/resources" element={<Resources/>}/>
                        <Route path="/login" element={<HomePage/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
