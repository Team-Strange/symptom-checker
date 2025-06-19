const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

app.post("/api/symptoms", (req, res) => {
  const { symptom } = req.body;

  const conditionMap = {
    fever: ["Flu", "Covid-19", "Dengue"],
    cough: ["Cold", "Covid-19"],
    headache: ["Migraine", "Tension Headache"],
    fatigue: ["Anemia", "Thyroid", "Sleep Deprivation"]
  };

  const results = conditionMap[symptom.toLowerCase()] || [];
  res.json({ conditions: results });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
