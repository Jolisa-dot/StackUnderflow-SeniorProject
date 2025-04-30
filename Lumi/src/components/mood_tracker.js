import React, {useState, useRef, useEffect} from "react";
import Chart from "chart.js/auto";

const MoodTracker = () => {
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState({userName: "", mood: "", notes: "", date: ""});
    const [searchDate, setSearchDate] = useState("");
    const [foundEntry, setFoundEntry] = useState(null);
    const [updateMood, setUpdateMood] = useState("");
    const [updateDate, setUpdateDate] = useState("");
    const [deleteDate, setDeleteDate] = useState("");
    const [message, setMessage] = useState("");
    const chartRef = useRef(null);
    const moodChartRef = useRef(null);

    useEffect(() => {
        if (moodChartRef.current) {
            const data = {
                labels: entries.map((e) => e.date),
                datasets: [{
                    label: "Mood Over Time",
                    data: entries.map((e) => parseInt(e.mood) || 0),
                    fill: false,
                    borderColor: "rgb(59, 130, 246)",
                    tension: 0.1,
                }],
            };

            const config = {
                type: "line",
                data,
            };

            if (chartRef.current) chartRef.current.destroy();
            chartRef.current = new Chart(moodChartRef.current, config);
        }
    }, [entries]);

    const handleInputChange = (e) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const addEntry = () => {
        setEntries([...entries, form]);
        setForm({userName: "", mood: "", notes: "", date: ""});
        setMessage("Entry added successfully.");
    };

    const findEntry = () => {
        const entry = entries.find((e) => e.date === searchDate);
        setFoundEntry(entry || null);
    };

    const updateEntry = () => {
        setEntries((prev) =>
            prev.map((e) =>
                e.date === updateDate ? {...e, mood: updateMood} : e
            )
        );
        setMessage("Entry updated.");
    };

    const deleteEntry = () => {
        setEntries((prev) => prev.filter((e) => e.date !== deleteDate));
        setMessage("Entry deleted.");
    };

    return (
        <div className="bg-gray-100 flex min-h-screen">
            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-semibold mb-4">Daily Check-In</h1>

                {/* Add Entry */}
                <section className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4">Add Entry</h2>
                    {["userName", "mood", "notes", "date"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block capitalize">{field}:</label>
                            <input
                                type="text"
                                name={field}
                                value={form[field]}
                                onChange={handleInputChange}
                                placeholder={field === "date" ? "YYYY-MM-DD" : ""}
                                className="w-full border p-2 rounded mb-2"
                            />
                        </div>
                    ))}
                    <button onClick={addEntry} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add Entry
                    </button>
                </section>

                {/* Find Entry */}
                <section className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4">Find Entry</h2>
                    <label htmlFor="searchEntry" className="block mb-1 font-medium text-gray-700">Date:</label>
                    <input
                        type="text"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        placeholder="YYYY-MM-DD"
                        className="w-full border p-2 rounded"
                    />
                    <button onClick={findEntry} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Find</button>
                </section>

                {foundEntry && (
                    <section className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-lg font-semibold mb-4">Found Entry</h2>
                        <p><strong>Username:</strong> {foundEntry.userName}</p>
                        <p><strong>Mood:</strong> {foundEntry.mood}</p>
                        <p><strong>Notes:</strong> {foundEntry.notes}</p>
                        <p><strong>Date:</strong> {foundEntry.date}</p>
                    </section>
                )}

                {/* Update Entry */}
                <section className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4">Update Entry</h2>
                    <label htmlFor="updateDate" className="block mb-1 font-medium text-gray-700">Date:</label>
                    <input
                        type="text"
                        value={updateDate}
                        onChange={(e) => setUpdateDate(e.target.value)}
                        placeholder="YYYY-MM-DD"
                        className="w-full border p-2 rounded mb-4"
                    />
                    <label htmlFor="updateMood" className="block mb-1 font-medium text-gray-700">New Mood:</label>
                    <input
                        type="text"
                        value={updateMood}
                        onChange={(e) => setUpdateMood(e.target.value)}
                        className="w-full border p-2 rounded mb-4"
                    />
                    <button onClick={updateEntry} className="px-4 py-2 bg-green-500 text-white rounded">Update</button>
                </section>

                {/* Delete Entry */}
                <section className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4">Delete Entry</h2>
                    <label htmlFor="deleteDate" className="block mb-1 font-medium text-gray-700">Date:</label>
                    <input
                        type="text"
                        value={deleteDate}
                        onChange={(e) => setDeleteDate(e.target.value)}
                        placeholder="YYYY-MM-DD"
                        className="w-full border p-2 rounded mb-4"
                    />
                    <button onClick={deleteEntry} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                </section>

                <div className="mt-4 text-gray-700">{message}</div>

                {/* Mood Chart */}
                <section className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4">Mood Chart</h2>
                    <canvas ref={moodChartRef} width="400" height="200"/>
                </section>
            </main>
        </div>
    );
};

export default MoodTracker;