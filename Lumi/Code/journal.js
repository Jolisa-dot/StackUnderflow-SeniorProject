async function saveJournal() {
    const title = document.getElementById("journal-title").value.trim();
    const content = document.getElementById("journal-content").value.trim();

    if (!title || !content) {
        alert("Please enter both a title and content.");
        return;
    }

    try {
        const response = await fetch("/saveJournal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        if (!response.ok) throw new Error("Failed to save journal entry");

        alert("Journal entry saved!");
        document.getElementById("journal-title").value = "";
        document.getElementById("journal-content").value = "";
        fetchJournals();
    } catch (error) {
        console.error("Error saving journal:", error);
    }
}

async function fetchJournals() {
    try {
        const response = await fetch("/getJournal");
        if (!response.ok) throw new Error("Failed to fetch journal entries");

        const journals = await response.json();
        const journalEntries = document.getElementById("journal-entries");
        journalEntries.innerHTML = "";

        journals.forEach(entry => {
            const journalEntry = document.createElement("div");
            journalEntry.classList.add("entry");

            journalEntry.innerHTML = `
        <h3>${new Date(entry.date).toDateString()}</h3>
        <h4>${entry.title}</h4>
        <p>${entry.content}</p>
      `;

            journalEntries.appendChild(journalEntry);
        });
    } catch (error) {
        console.error("Error fetching journal entries:", error);
    }
}

fetchJournals();
