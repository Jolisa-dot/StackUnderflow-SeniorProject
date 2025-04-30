import React from 'react';
import './Wellness.css'
import placeholderimage from'./placeholderimg.png'
import field from './field-scene.gif';

function Wellness() {
    return (
        <><div className='card-container'>
        <div className='activity-card'>
            <a
            href="/breathing_exercise/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="open-exercise-button"
            ><img src={field}></img></a>
            <br></br>
            <br></br>
            <p>Activity description goes here...</p>
        </div><div className='activity-card'>
            <a
            href="/guided walking exercise/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="open-exercise-button"
                ><img src={placeholderimage}></img></a>
                <br></br>
                <br></br>
                <p>Activity description goes here...</p>
            </div>
        </div></>
    );
}

export default Wellness;