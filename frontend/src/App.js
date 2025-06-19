import React, { useState } from "react";

const conditionMap = {
  fever: ["Flu", "COVID-19", "Dengue"],
  cough: ["Cold", "COVID-19"],
  headache: ["Migraine", "Tension Headache"],
  fatigue: ["Anemia", "Thyroid Issues", "Sleep Deprivation"],
  cold: ["Allergic Rhinitis", "Viral Infection"]
};

const App = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handleCheck = () => {
    const match = conditionMap[input.toLowerCase()] || [];
    setResults(match);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Symptom to Condition Checker</h2>
      <input
        type="text"
        placeholder="Enter symptom (e.g., fever)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleCheck} style={{ padding: "8px 16px" }}>
        Check Conditions
      </button>

      {results.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          <h3>Possible Conditions:</h3>
          <ul>
            {results.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
        </div>
      ) : (
        input && (
          <p style={{ marginTop: "20px" }}>
            No matching conditions found for <strong>{input}</strong>.
          </p>
        )
      )}
    </div>
  );
};

export default App;
