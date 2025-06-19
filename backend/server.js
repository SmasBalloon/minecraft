// Backend Express pour Todo List
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: '*', // Autorise toutes les origines (à restreindre en prod si besoin)
}));
app.use(express.json());

// Initialisation de la base de données
const dbPath = path.resolve(__dirname, "todos.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erreur ouverture DB:", err.message);
  } else {
    console.log("Connecté à SQLite");
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    done INTEGER DEFAULT 0,
    inProgress INTEGER DEFAULT 0
  )`);
});

// Routes
app.get("/api/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(
      rows.map((row) => ({
        ...row,
        done: !!row.done,
        inProgress: !!row.inProgress,
      }))
    );
  });
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Texte requis" });
  db.run("INSERT INTO todos (text) VALUES (?)", [text], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, text, done: 0, inProgress: 0 });
  });
});

app.delete("/api/todos/:id", (req, res) => {
  db.run("DELETE FROM todos WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.put("/api/todos/:id", (req, res) => {
  const { done, inProgress } = req.body;
  if (typeof inProgress !== "undefined") {
    db.run(
      "UPDATE todos SET inProgress = ? WHERE id = ?",
      [inProgress ? 1 : 0, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
      }
    );
  } else if (typeof done !== "undefined") {
    db.run(
      "UPDATE todos SET done = ? WHERE id = ?",
      [done ? 1 : 0, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
      }
    );
  } else {
    res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }
});

// Modifie ici pour écouter sur toutes les interfaces réseau (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend Todo API sur http://0.0.0.0:${PORT}`);
});
