let moodChartInstance;

document.addEventListener("DOMContentLoaded", function () {
    const showMessage = (msg) => {
        document.getElementById("message").textContent = msg;
    };

    // Add Entry
    document.getElementById("addButton").addEventListener("click", function () {
        const userName = document.getElementById("userName").value;
        const mood = document.getElementById("mood").value;
        const notes = document.getElementById("notes").value;
        const date = document.getElementById("date").value;

        if (!userName || !mood || !date) {
            showMessage("Please fill out all required fields.");
            return;
        }

        const checkIn = { userName, mood, notes, date };

        fetch('/api/dailycheckin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(checkIn)
        })
            .then(response => response.json())
            .then(data => {
                showMessage(data.message || "Check-in added!");
                loadMoodChart(); // Refresh chart
            })
            .catch(error => showMessage("Error: " + error.message));
    });

    // Find Entry
    document.getElementById("findButton").addEventListener("click", function () {
        const date = document.getElementById("searchEntry").value;

        if (!date) {
            showMessage("Please enter a date.");
            return;
        }

        fetch(`/api/dailycheckin/${date}`)
            .then(response => {
                if (!response.ok) throw new Error("No entry found.");
                return response.json();
            })
            .then(data => {
                document.getElementById("foundUser").textContent = data.userName;
                document.getElementById("foundMood").textContent = data.mood;
                document.getElementById("foundNotes").textContent = data.notes;
                document.getElementById("foundDate").textContent = data.date;
                document.getElementById("foundEntry").classList.remove("hidden");
                showMessage("Entry found.");
            })
            .catch(error => {
                showMessage(error.message);
                document.getElementById("foundEntry").classList.add("hidden");
            });
    });

    // Update Entry
    document.getElementById("updateButton").addEventListener("click", function () {
        const date = document.getElementById("updateDate").value;
        const newMood = document.getElementById("updateMood").value;

        if (!date || !newMood) {
            showMessage("Please enter a date and new mood.");
            return;
        }

        fetch(`/api/dailycheckin/${date}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mood: newMood })
        })
            .then(response => {
                if (!response.ok) throw new Error("Update failed.");
                return response.json();
            })
            .then(data => {
                showMessage(data.message || "Mood updated.");
                if (!document.getElementById("foundEntry").classList.contains("hidden")) {
                    document.getElementById("foundMood").textContent = data.entry.mood;
                }
                loadMoodChart(); // Refresh chart
            })
            .catch(error => showMessage("Error: " + error.message));
    });

    // Delete Entry
    document.getElementById("deleteButton").addEventListener("click", function () {
        const date = document.getElementById("deleteDate").value;

        if (!date) {
            showMessage("Please enter a date.");
            return;
        }

        const confirmDelete = confirm(`Are you sure you want to delete the entry for ${date}?`);
        if (!confirmDelete) return;

        fetch(`/api/dailycheckin/${date}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) throw new Error("Delete failed.");
                return response.json();
            })
            .then(data => {
                showMessage(data.message || "Entry deleted.");
                document.getElementById("foundEntry").classList.add("hidden");
                loadMoodChart(); // Refresh chart
            })
            .catch(error => showMessage("Error: " + error.message));
    });

    // Load chart on page load
    loadMoodChart();
});

// Mood Chart Functions


function loadMoodChart() {
    fetch("/api/moodGraph")
        .then(response => response.json())
        .then(moodData => {
            console.log("Fetched mood data:", moodData);
            renderMoodChart(moodData);
        })
        .catch(error => {
            console.error("Error loading mood chart:", error);
        });
}

function renderMoodChart(moodData) {
    const ctx = document.getElementById("moodChart")?.getContext("2d");
    if (!ctx) return;

    const moodMap = {
        "happy": 5,
        "excited": 4,
        "neutral": 3,
        "sad": 2,
        "angry": 1
    };

    const labels = moodData.map(entry => entry.date);
    const data = moodData.map(entry => {
        const moodText = entry.mood?.toLowerCase().trim();
        return moodMap[moodText] || 0;
    });

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(59,130,246,0.4)");
    gradient.addColorStop(1, "rgba(59,130,246,0)");

    if (moodChartInstance) {
        moodChartInstance.destroy();
    }

    moodChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Mood Trend",
                data: data,
                backgroundColor: gradient,
                borderColor: "#3b82f6",
                borderWidth: 2,
                pointBackgroundColor: "#2563eb",
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: "Date" },
                    ticks: { color: "#6b7280" },
                    grid: { display: false }
                },
                y: {
                    title: { display: true, text: "Mood Level (1-5)" },
                    ticks: {
                        stepSize: 1,
                        callback: function (value) {
                            const reverseMap = {
                                5: "Happy",
                                4: "Excited",
                                3: "Neutral",
                                2: "Sad",
                                1: "Angry",
                                0: "Unknown"
                            };
                            return reverseMap[value] || value;
                        },
                        color: "#6b7280"
                    },
                    min: 0,
                    max: 5,
                    grid: { color: "rgba(203,213,225,0.2)" }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const moodLabel = context.parsed.y;
                            const reverseMap = {
                                5: "Happy",
                                4: "Excited",
                                3: "Neutral",
                                2: "Sad",
                                1: "Angry",
                                0: "Unknown"
                            };
                            return ` Mood: ${reverseMap[moodLabel] || moodLabel}`;
                        }
                    }
                }
            }
        }
    });
}
