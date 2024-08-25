import React, { useState } from "react";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("Sending data:", jsonInput); 
      const parsedJson = JSON.parse(jsonInput);

      const response = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: parsedJson.data }),
      });

      if (!response.ok) {
        throw new Error("Server response was not OK");
      }

      const data = await response.json();
      console.log("Received data:", data); // Debug log
      setResponseData(data);
      setError("");
    } catch (err) {
      console.error("Error:", err); // Debug log
      setError(err.message || "Invalid JSON format or server error");
      setResponseData(null);
    }
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(options);
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    let filteredData = {};
    if (selectedOptions.includes("Numbers")) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes("Alphabets")) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }
    return (
      <div>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE5897</h1>
      <textarea
        value={jsonInput}
        onChange={handleJsonInput}
        placeholder='Enter JSON: { "data": ["23", "4", "a", "x", "m"] }'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && (
        <>
          <select multiple onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;
