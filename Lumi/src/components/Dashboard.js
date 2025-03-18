import React from 'react';
import './Dashboard.css'
import {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function Dashboard() {
    const [date, setDate] = useState(new Date());

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

            <!--TODO: Reformat Dashboard Content properly-->
            <div className="main-container">
                <div className="card">
                    <h2>Daily Check-In</h2>
                    <h6>How are you feeling at this moment?</h6>
                    <img src="#" alt="Daily Check In" />
                    <button>Log Emotion</button>
                </div>
                <div className="card">
                    <Calendar onChange={setDate} value={date} />
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