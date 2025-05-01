import React from 'react';
import './Wellness.css'
import walk from './Guided Walk.png'
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
            <h4>Breathing Sphere</h4>
            <p>This activity is a guided breathing exercise that allows you to focus on your breathing and help center yourself.</p>
        </div><div className='activity-card'>
            <a
            href="/guided walking exercise/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="open-exercise-button"
                ><img src={walk}></img></a>
                <br></br>
                <br></br>
                <h4>Guided Walk</h4>
                <p>This activity is a guided walk with instructions to follow to help your relax.</p>
            </div>
        </div></>
    );
}

export default Wellness;