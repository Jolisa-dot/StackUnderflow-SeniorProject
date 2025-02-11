document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addButton").addEventListener("click", function () {
        const userName = document.getElementById("userName").value;
        const mood = document.getElementById("mood").value;
        const notes = document.getElementById("notes").value;
        const streakCount = document.getElementById("streakCount").value;
        const date = document.getElementById("date").value;

        const checkIn = {
            userName: userName,
            mood: mood,
            notes: notes,
            streakCount: streakCount,
            date: date,
        };

        fetch('/api/dailycheckin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(checkIn)
        })
            .then(response => response.json())
            .then(data => showMessage(data.message))
            .catch(error => console.error("Error:", error));
    });

    document.getElementById("findButton").addEventListener("click", function () {
        const searchEntry = document.getElementById("searchEntry").value;

        fetch(`/api/dailycheckin/${searchEntry}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showMessage(data.error);
                } else {
                    document.getElementById("userName").value = data.userName;
                    document.getElementById("mood").value = data.mood;
                    document.getElementById("notes").value = data.notes;
                    document.getElementById("streakCount").value = data.streakCount;
                    document.getElementById("date").value = data.date;
                }
            })
            .catch(error => console.error("Error:", error));
    });

    document.getElementById("updateButton").addEventListener("click", function () {
        const date = document.getElementById("date").value;
        const updatedData = {
            userName: document.getElementById("userName").value,
            mood: document.getElementById("mood").value,
            notes: document.getElementById("notes").value,
            streakCount: document.getElementById("streakCount").value,
            date: date,
        };

        fetch(`/api/dailycheckin/${date}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => showMessage(data.message))
            .catch(error => console.error("Error:", error));
    });

    document.getElementById("deleteButton").addEventListener("click", function () {
        const date = document.getElementById("date").value;

        fetch(`/api/dailycheckin/${date}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => showMessage(data.message))
            .catch(error => console.error("Error:", error));
    });

    function showMessage(message) {
        window.alert(message);
    }
});
