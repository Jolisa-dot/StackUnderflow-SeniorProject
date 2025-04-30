import React from "react";
import './Resources.css'
const mentalHealthResources = [
    {
        category: "Crisis Support",
        links: [
            { name: "National Suicide Prevention Lifeline", url: "https://988lifeline.org/" },
            { name: "Crisis Text Line", url: "https://www.crisistextline.org/" },
        ],
    },
    {
        category: "Anxiety & Depression",
        links: [
            { name: "Anxiety and Depression Association of America", url: "https://adaa.org/" },
            { name: "NAMI: Mental Health Support", url: "https://www.nami.org/" },
        ],
    },
    {
        category: "Mindfulness & Self-Care",
        links: [
            { name: "Headspace", url: "https://www.headspace.com/" },
            { name: "Calm", url: "https://www.calm.com/" },
        ],
    },
];

const ResourceHub = () => {
    return (
        <div className='link-container'>
            <h2>Mental Health Resource Hub</h2>
            <p>Find support and resources for mental well-being.</p>
            <div>
                {mentalHealthResources.map((category, index) => (
                    <div id='rs' key={index}>
                        <h3>{category.category}</h3>
                        <ul>
                            {category.links.map((link, i) => (
                                <li key={i} style={{ marginBottom: "8px" }}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceHub;
