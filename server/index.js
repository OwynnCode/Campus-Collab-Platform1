
const express = require("express");
const pool = require("./db"); // import the MySQL pool
const app = express();
const PORT = 5000;

// Parse JSON bodies
app.use(express.json());

// Health check route
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1"); // simple test
    res.json({ status: "MySQL connected ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed ❌" });
  }
});

// Example Users endpoint
// GET all users
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM `User`");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST a new user
app.post("/users", async (req, res) => {
  const { Fname, Lname, StudentEmail, Role, password } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO `User` (Fname, Lname, StudentEmail, Role, password) VALUES (?, ?, ?, ?, ?)",
      [Fname, Lname, StudentEmail, Role, password]
    );
    res.json({ User_Id: result.insertId, Fname, Lname, StudentEmail, Role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
