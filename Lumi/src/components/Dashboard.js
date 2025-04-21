import React from 'react';
import './Dashboard.css'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function Dashboard() {
    const [date, setDate] = useState(new Date());

    {/** navigation functions **/}
    const navigate = useNavigate();
    const goToCheckIn = () => {
        navigate("/daily-check-in");
    };

    const goToActivity = () => {
        navigate(`/activity/}`);
    }

    return (
        <div className="container">
            {/** HEADER SECTION **/}
            <div className="header-container">
                <div className="header-left">
                    <h1> Welcome Back,
                        <span className="name"> [name]</span>
                    </h1>
                </div>

                <div className="header-right">
                    <div className="options">
                        <button className="settings fa fa-gear"></button>
                        <button className="notifications fa fa-bell"></button>
                        <button className="profile fa fa-user-large"></button>
                    </div>
                </div>
            </div>

            {/** MAIN CONTENT SECTION **/}
            <div className="main-container">
                <div className="row1">
                    {/** CHECK-IN SECTION **/}
                    <div className="check-in-container">
                        <h1>Daily Check-In</h1>
                        <p> How are you feeling?</p>
                        <img src="" alt="placeholder"/>
                        <button onClick={goToCheckIn}> Check In</button>
                    </div>

                    {/** CALENDAR SECTION **/}
                    <div className="calendar-container">
                        <h1>Calendar</h1>
                        <Calendar onChange={setDate} value={date}/>
                    </div>
                </div>

                <div className="row2">
                    {/** MOOD CHART SECTION **/}
                    <div className="mood-chart-container">
                        <h1>Mood Chart</h1>
                        <img src="" alt="placeholder"/>
                    </div>

                    {/** QUOTE SECTION **/}
                    <div className="quote-container">
                        <h1>Quote</h1>
                        <img src="" alt="placeholder"/>
                    </div>
                </div>

                <div className="row3">
                    {/** ACTIVITIES SECTION **/}
                    <div className="activities-container">
                        <div className="activity" onClick={goToActivity}>
                            <h1>Activity</h1>
                        </div>
                        <div className="activity" onClick={goToActivity}>
                            <h1>Activity</h1>
                        </div>
                        <div className="activity" onClick={goToActivity}>
                            <h1>Activity</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;