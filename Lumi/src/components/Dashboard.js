import React from 'react';
import './Dashboard.css'

function Dashboard() {
    return (
        <div className="container">
            <div className="dash-header">
                <h1>Welcome back!</h1>
                <ul className="dash-options">
                    <a href='#' className="settings fa fa-gear"></a>
                    <a href='#' className="notifications fa fa-bell"></a>
                    <a href='#' className="profile fa fa-user-large"></a>
                </ul>
            </div>
            <div className="main-container">
                <div className="card">
                    <h2>Welcome!</h2>
                    <p>This is a placeholder for the main dashboard content.</p>
                </div>
                <div className="card">
                    <h2>Statistics</h2>
                    <p>Placeholder for charts or statistics.</p>
                </div>
                <div className="card">
                    <h2>Recent Activity</h2>
                    <p>Placeholder for recent updates or activity feed.</p>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;