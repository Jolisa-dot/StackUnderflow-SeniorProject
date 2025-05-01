import React from 'react';
import './Dashboard.css'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {FaSadTear, FaFrown, FaMeh, FaSmile, FaLaugh} from "react-icons/fa";


function Dashboard() {
    const [date, setDate] = useState(new Date());
    const [moodIndex, setMoodIndex] = useState(2);
    const [quote, setQuote] = useState({q: '', a: ''});

    {/** navigation functions **/}
    const navigate = useNavigate();
    const goToCheckIn = () => {
        navigate("/check-in");
    };

    const goToActivity = () => {
        navigate(`/activity/}`);
    }

    {/** mood checkin **/
    }
    const moods = [
        {icon: <FaSadTear size={75}/>, label: "Very Sad", color: "blue", shadow: "0px 0px 15px rgba(0, 0, 255, 0.5)"},
        {icon: <FaFrown size={75}/>, label: "Sad", color: "lightblue", shadow: "0px 0px 15px rgba(173, 216, 230, 0.5)"},
        {icon: <FaMeh size={75}/>, label: "Neutral", color: "gray", shadow: "0px 0px 15px rgba(169, 169, 169, 0.5)"},
        {icon: <FaSmile size={75}/>, label: "Happy", color: "lightgreen", shadow: "0px 0px 15px rgba(0, 255, 0, 0.5)"},
        {
            icon: <FaLaugh size={75}/>,
            label: "Very Happy",
            color: "green",
            shadow: "0px 0px 15px rgba(255, 255, 0, 0.5)"
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMoodIndex((prevIndex) => (prevIndex + 1) % moods.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval); // Cleanup
    }, []);

    {/** quotes **/
    }

    useEffect(() => {
        const fetchQuote = () => {
            fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'))
                .then(res => res.json())
                .then(data => {
                    const parsed = JSON.parse(data.contents); // parse the wrapped JSON
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setQuote(parsed[0]);
                    }
                })
                .catch(err => console.error("Failed to fetch quote:", err));
        };

        fetchQuote(); // Initial fetch
        const interval = setInterval(fetchQuote, 10000); // Fetch every 10 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    return (
        <div className="container">
            {/** HEADER SECTION **/}
            <div className="header-container">
                <div className="header-left">
                    <h1> Welcome Back!</h1>
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
                        <div
                            className="fade-scale"
                            style={{
                                color: moods[moodIndex].color,
                                textShadow: moods[moodIndex].shadow  // Apply dynamic shadow
                            }}
                        >
                            {moods[moodIndex].icon}
                        </div>
                        <button onClick={goToCheckIn}> Check In</button>
                    </div>

                    {/** CALENDAR SECTION **/}
                    <div className="calendar-container">
                        <h1>Calendar</h1>
                        <Calendar onChange={setDate} value={date}/>
                    </div>
                </div>

                <div className="row2">
                    {/** MOOD CHART SECTION
                    <div className="mood-chart-container">
                        <h1>Mood Chart</h1>
                        <img src="" alt="placeholder"/>
                    </div>**/}

                    {/** QUOTE SECTION **/}
                    <div className="quote-container">
                        <blockquote>
                            <p>{quote.q ? `"${quote.q}"` : "Loading quote..."}</p>
                            <footer>{quote.a && `- ${quote.a}`}</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;