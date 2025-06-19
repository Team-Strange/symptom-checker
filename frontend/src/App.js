import { useState } from "react";
import { motion } from "framer-motion";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSearch = async () => {
    const res = await fetch(`${BASE_URL}/api/symptoms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptom: input }),
    });

    const data = await res.json();
    setResults(data.conditions || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800"
      >
        🩺 Symptom to Condition Checker
      </motion.h1>

      <motion.div
        className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <input
          type="text"
          placeholder="Enter a symptom (e.g., fever)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition duration-200"
        >
          Check Conditions
        </button>
      </motion.div>

      {results.length > 0 && (
        <motion.div
          className="mt-6 max-w-md w-full bg-white p-4 rounded-xl shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Possible Conditions:
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {results.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {results.length === 0 && input.trim() !== "" && (
        <motion.div
          className="mt-6 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No matching conditions found.
        </motion.div>
      )}
    </div>
  );
}
