import React from 'react';
import './Dashboard.css'
import {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function Dashboard() {
    const [date, setDate] = useState(new Date());

    return (
        <div className="main-content">
            <div className="content-header">
                <span className="main-title">Welcome Back, [name]</span>
                <ul className="options">
                    <a href='#' className="settings fa fa-gear"></a>
                    <a href='#' className="notifications fa fa-bell"></a>
                    <a href='#' className="profile fa fa-user-large"></a>
                </ul>
            </div>

            <div className="row1-container">
                <div className="row1-wrapper">
                    <div className="check-in-container">
                        <div className="check-in-header">
                            <h3 className="main-title">Daily Check-In</h3>
                            {/* TODO: Fix span such that streak is only displayed if streak is active*/}
                            <span className="check-in-streak"></span>
                        </div>
                        <h5 className="subtitle">How are you feeling at the moment?</h5>
                        <img src="" alt="check-in" className="check-in-img"/>
                        <button className="check-in-button">Log Emotion</button>
                    </div>

                    <div className="calendar-container">
                        <h3 className="main-title">Calendar</h3>
                        <Calendar onChange={setDate} value={date}/>
                    </div>
                </div>
            </div>

            <div className="row2-container">
                <div className="row2-wrapper">
                    <div className="mood-chart-container">
                        <h3 className="main-title">Mood Chart</h3>
                        <span className="mood-chart-area">
                            <img src="#" alt="mood chart" className="mood-chart"/>
                        </span>
                    </div>

                    <div className="wellness-quote-container">
                        <h3 className="main-title">Wellness Quote</h3>
                        <span className="wellness-quote-area">
                            <img src="#" alt="wellness quote" className="wellness-quote-img"/>
                        </span>
                    </div>
                </div>
            </div>

            <div className="row3-container">
                <div className="row3-wrapper">
                    <div className="suggestion-container">
                        <h5 className="subtitle">Suggested Wellness Activity</h5>
                        <span className="main-title">[ACTIVITY]</span>
                    </div>

                    <div className="suggestion-container">
                        <h5 className="subtitle">Suggested Wellness Activity</h5>
                        <span className="main-title">[ACTIVITY]</span>
                    </div>

                    <div className="suggestion-container">
                        <h5 className="subtitle">Suggested Wellness Activity</h5>
                        <span className="main-title">[ACTIVITY]</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;