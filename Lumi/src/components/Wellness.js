import React from 'react';
import './Wellness.css'
import placeholderimage from'./placeholderimg.png'
function Wellness() {
    return (
        <><div className='card-container'>
        <div className='activity-card'>
            <img src={placeholderimage}></img>
            <br></br>
            <br></br>
            <p>Activity description goes here...</p>
        </div><div className='activity-card'>
                <img src={placeholderimage}></img>
                <br></br>
                <br></br>
                <p>Activity description goes here...</p>
            </div>
            <div className='activity-card'>
            <img src={ placeholderimage }></img>
            <br></br>
            <br></br>
            <p>Activity description goes here...</p>
        </div>
        <div className='activity-card'>
            <img src={ placeholderimage }></img>
            <br></br>
            <br></br>
            <p>Activity description goes here...</p>
        </div>
        </div></>
    );
}

export default Wellness;