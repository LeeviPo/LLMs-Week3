import React, { useState } from "react";
import "./App.css";

function App() {
  // Initializing variables
  const [review, setReview] = useState("");
  const [selectedModel, setSelectedModel] = useState("custom");
  const [result, setResult] = useState(null);

  // Function to handle the API call when "Analyze Sentiment" is clicked.
  const handleAnalyze = () => {
    // Creating the API call payload
    const payload = {
      model: selectedModel,
      text: review,
    };

    // POST request to API to get sentiment and confidence score
    fetch("http://192.168.0.15:8080/analyze/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setResult(json))
      .catch((error) => {
        console.error("Error analyzing sentiment:", error);
        setResult({ error: error.message });
      });
  };

  // App layout with input area, model selection and result display
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1>Sentiment Analyzer</h1>
        </header>
        <main>
          <div className="form-group">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Enter your review here..."
              rows="4"
            />
          </div>
          <div className="form-group">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="custom">Custom Model</option>
              <option value="llama">Llama 3</option>
            </select>
          </div>
          <div className="form-group">
            <button onClick={handleAnalyze} className="App-button">
              Analyze Sentiment
            </button>
          </div>
          {result && (
            <div className="result">
              {result.error ? (
                <p>Error: {result.error}</p>
              ) : (
                <>
                  <p>
                    <strong>Sentiment:</strong> {result.sentiment}
                  </p>
                  {result.confidence && (
                    <p>
                      <strong>Confidence:</strong> {result.confidence}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;