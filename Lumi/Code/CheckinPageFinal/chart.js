document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:3000/api/moodGraph");
        if (!response.ok) throw new Error("Failed to fetch mood data.");
        const moodData = await response.json();
        renderMoodChart(moodData);
    } catch (error) {
        console.error("Error fetching mood data:", error);
    }
});

function renderMoodChart(moodData) {
    const ctx = document.getElementById("moodChart")?.getContext("2d");
    if (!ctx) {
        console.error(" Canvas element not found!");
        return;
    }

    const labels = moodData.map(entry => entry.date);
    const data = moodData.map(entry => entry.mood);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Mood Trends",
                data: data,
                borderColor: "#007bff",
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { title: { display: true, text: "Mood Level (1-5)" }, min: 0, max: 5 }
            }
        }
    });
}
