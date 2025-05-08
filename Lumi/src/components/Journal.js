/*import React, { useState } from 'react';
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

export default Journal; */

import React, { useState } from 'react';
import './Journal.css';

function Journal() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('#333');
  const [analysisResult, setAnalysisResult] = useState('');

  const fakeSentimentAnalysis = (text) => {
    const positiveWords = ["happy", "great", "excited", "love", "good", "awesome", "joy"];
    const negativeWords = ["sad", "angry", "bad", "hate", "upset", "terrible", "lonely"];
    const harmfulWords = ["kill", "suicide", "hurt", "die", "worthless"];

    const lowerText = text.toLowerCase();

    const sentiment = positiveWords.some(word => lowerText.includes(word))
      ? "Positive"
      : negativeWords.some(word => lowerText.includes(word))
          ? "Negative"
          : "Neutral";

    const sentimentScore = sentiment === "Positive" ? 0.9 : sentiment === "Negative" ? 0.1 : 0.5;
    const topEmotion = sentiment === "Positive" ? "Joy" : sentiment === "Negative" ? "Anger" : "Calm";
    const emotionConfidence = sentimentScore;
    const harmful = harmfulWords.some(word => lowerText.includes(word));

    return {
      sentiment,
      sentimentScore,
      topEmotion,
      emotionConfidence,
      harmful
    };
  };

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

    // Simulate the time delay for saving and analyzing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const analysis = fakeSentimentAnalysis(content);

    // Clear inputs after saving
    setTitle('');
    setContent('');
    setStatus('Journal entry saved and analyzed!');
    setStatusColor('#10b981');

    // Build result HTML
    setAnalysisResult(`
      <div style="background-color: #f9fafb; padding: 15px; border: 1px solid #ccc; border-radius: 6px;">
        <h4 style="margin-top: 0;">Analysis Summary</h4>
        <p><strong>Sentiment:</strong> ${analysis.sentiment} (${(analysis.sentimentScore * 100).toFixed(2)}%)</p>
        <p><strong>Top Emotion:</strong> ${analysis.topEmotion} (${(analysis.emotionConfidence * 100).toFixed(2)}%)</p>
        <p><strong>Harmful Language:</strong>
          <span style="color: ${analysis.harmful ? 'red' : 'green'};">
            ${analysis.harmful ? 'Detected' : 'None'}
          </span>
        </p>
        ${analysis.harmful ? `
          <div style="margin-top: 10px; background-color: #fff5f5; padding: 10px; border-left: 4px solid red;">
            <strong>If you're feeling overwhelmed, you're not alone.</strong><br>
            Please visit the <a href="#resource-hub" style="color: #d00; text-decoration: underline;">Resource Hub</a> for support. 💛
          </div>
        ` : ""}
      </div>
    `);
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

