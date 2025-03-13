import React from 'react';
import './Journal.css';

function Journal() {
    return (
        <div>
<body>
<div class="sidebar">
    <h2>Lumi</h2>
    <a href="#">Dashboard</a>
    <a href="#">Journal</a>
    <a href="#">Mood Tracking</a>
    <a href="#">Wellness Activities</a>
    <a href="#">Resource Hub</a>
    <div class="logout">Logout</div>
</div>

<div class="content">
    <div class="entry">
        <h3>FEBRUARY 14, 2025</h3>
        <h4>Placeholder Title</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus mauris conubia congue gravida ornare ultrices efficitur penatibus...</p>
        <button class="analyze-button">Analyze Entry</button>
    </div>
</div>
</body>
</div>
    );
}

export default Journal;