/*
import React from 'react';
import './Journal.css';


function Journal() {

    return (
        <div class="content">
        <div class="journal-form">
          <h3>Write a Journal Entry</h3>
          <input type="text" id="journal-title" placeholder="Entry Title" />
          <textarea id="journal-content" placeholder="Write your thoughts here..." rows="6"></textarea>
          <button class="analyze-button" onclick="saveJournal()">Save & Analyze Entry</button>
      
          <p id="journal-status" ></p>
          <div id="analysis-result" ></div>
        </div>
        </div>
    );
}

async function saveJournal() {
    const title = document.getElementById("journal-title").value.trim();
    const content = document.getElementById("journal-content").value.trim();
    const status = document.getElementById("journal-status");
    const resultBox = document.getElementById("analysis-result");

    if (!title || !content) {
      status.textContent = "Please enter both a title and content.";
      status.style.color = "red";
      resultBox.innerHTML = "";
      return;
    }

    status.textContent = "Saving and analyzing...";
    status.style.color = "#333";
    resultBox.innerHTML = "";

    try {
      const saveResponse = await fetch("/saveJournal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!saveResponse.ok) throw new Error("Failed to save journal entry");

      const analyzeResponse = await fetch("http://localhost:5001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });

      if (!analyzeResponse.ok) throw new Error("Failed to analyze journal entry");

      const analysis = await analyzeResponse.json();
      const harmful = analysis.harmful_language_detected;

      document.getElementById("journal-title").value = "";
      document.getElementById("journal-content").value = "";
      status.textContent = "Journal entry saved and analyzed!";
      status.style.color = "#10b981";

      resultBox.innerHTML = `
          <div style="background-color: #f9fafb; padding: 15px; border: 1px solid #ccc; border-radius: 6px;">
            <h4 style="margin-top: 0;">Analysis Summary</h4>
            <p><strong>Sentiment:</strong> ${analysis.analysis.sentiment} (${(analysis.analysis.sentiment_score * 100).toFixed(2)}%)</p>
            <p><strong>Top Emotion:</strong> ${analysis.analysis.top_emotion} (${(analysis.analysis.emotion_confidence * 100).toFixed(2)}%)</p>
            <p><strong>Harmful Language:</strong>
              <span style="color: ${harmful ? 'red' : 'green'};">
                ${harmful ? 'Detected' : 'None'}
              </span>
            </p>
            ${harmful ? `
              <div style="margin-top: 10px; background-color: #fff5f5; padding: 10px; border-left: 4px solid red;">
                <strong>If you're feeling overwhelmed, you're not alone.</strong><br>
                Please visit the <a href="#resource-hub" style="color: #d00; text-decoration: underline;">Resource Hub</a> for support. 💛
              </div>
            ` : ""}
          </div>
        `;
    } catch (error) {
      console.error("Error:", error);
      status.textContent = "Something went wrong while saving or analyzing.";
      status.style.color = "red";
      resultBox.innerHTML = "";
    }
  }

export default Journal;
*/

import React, { useState } from 'react';
import './Journal.css';

function Journal() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('#333');
  const [analysisResult, setAnalysisResult] = useState('');

  const saveJournal = async () => {
    if (!title.trim() || !content.trim()) {
      setStatus('Please enter both a title and content.');
      setStatusColor('red');
      setAnalysisResult('');
      return;
    }

    setStatus('Saving and analyzing...');
    setStatusColor('#333');
    setAnalysisResult('');

    try {
      const saveResponse = await fetch("/saveJournal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!saveResponse.ok)  {
        console.error('Save journal failed:', saveResponse);
        throw new Error("Failed to save journal entry");
      }
      const analyzeResponse = await fetch("http://localhost:5001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });

      if (!analyzeResponse.ok) throw new Error("Failed to analyze journal entry");

      const analysis = await analyzeResponse.json();
      const harmful = analysis.harmful_language_detected;

      // Clear inputs
      setTitle('');
      setContent('');
      setStatus('Journal entry saved and analyzed!');
      setStatusColor('#10b981');

      // Build result HTML
      setAnalysisResult(`
        <div style="background-color: #f9fafb; padding: 15px; border: 1px solid #ccc; border-radius: 6px;">
          <h4 style="margin-top: 0;">Analysis Summary</h4>
          <p><strong>Sentiment:</strong> ${analysis.analysis.sentiment} (${(analysis.analysis.sentiment_score * 100).toFixed(2)}%)</p>
          <p><strong>Top Emotion:</strong> ${analysis.analysis.top_emotion} (${(analysis.analysis.emotion_confidence * 100).toFixed(2)}%)</p>
          <p><strong>Harmful Language:</strong>
            <span style="color: ${harmful ? 'red' : 'green'};">
              ${harmful ? 'Detected' : 'None'}
            </span>
          </p>
          ${harmful ? `
            <div style="margin-top: 10px; background-color: #fff5f5; padding: 10px; border-left: 4px solid red;">
              <strong>If you're feeling overwhelmed, you're not alone.</strong><br>
              Please visit the <a href="#resource-hub" style="color: #d00; text-decoration: underline;">Resource Hub</a> for support. 💛
            </div>
          ` : ""}
        </div>
      `);
    } catch (error) {
      console.error("Error:", error);
      setStatus('Something went wrong while saving or analyzing.');
      setStatusColor('red');
      setAnalysisResult('');
    }
  };

  return (
    <div className="content">
      <div className="journal-form">
        <h3>Write a Journal Entry</h3>
        <input
          type="text"
          id="journal-title"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="journal-content"
          placeholder="Write your thoughts here..."
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="analyze-button" onClick={saveJournal}>
          Save & Analyze Entry
        </button>

        <p id="journal-status" style={{ marginTop: '10px', color: statusColor }}>
          {status}
        </p>
        <div
          id="analysis-result"
          style={{ marginTop: '20px' }}
          dangerouslySetInnerHTML={{ __html: analysisResult }}
        ></div>
      </div>
    </div>
  );
}

export default Journal; 
