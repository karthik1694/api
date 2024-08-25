const express = require("express");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors()); 

app.route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, 'data' should be an array."
      });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = "";

    for (const item of data) {
      const number = Number(item);
      if (!isNaN(number)) {
        numbers.push(number);
      } else if (typeof item === "string" && item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (item === item.toLowerCase() && (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)) {
          highestLowercaseAlphabet = item;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "karthik1694",
      email: "dungalaprem.karthiknaidu2021@vitstudent.ac.in",
      roll_number: "21BCE5897",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
