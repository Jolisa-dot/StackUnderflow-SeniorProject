import React from "react";

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
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Mental Health Resource Hub</h2>
            <p style={{ marginBottom: "16px", color: "#555" }}>Find support and resources for mental well-being.</p>
            <div>
                {mentalHealthResources.map((category, index) => (
                    <div key={index} style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "16px", backgroundColor: "#f9f9f9" }}>
                        <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>{category.category}</h3>
                        <ul>
                            {category.links.map((link, i) => (
                                <li key={i} style={{ marginBottom: "8px" }}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none", fontWeight: "500" }}>
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
