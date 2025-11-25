
const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM classes", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

exports.getOne = (req, res) => {
  db.query("SELECT * FROM classes WHERE id=?", [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data[0]);
  });
};

exports.add = (req, res) => {
  const { year, semester, subject_code, subject_title, day, time_from, time_to } = req.body;
  db.query(
    `INSERT INTO classes (year, semester, subject_code, subject_title, day, time_from, time_to)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [year, semester, subject_code, subject_title, day, time_from, time_to],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Class added" });
    }
  );
};

exports.update = (req, res) => {
  const { year, semester, subject_code, subject_title, day, time_from, time_to } = req.body;
  db.query(
    `UPDATE classes SET year=?, semester=?, subject_code=?, subject_title=?, day=?, time_from=?, time_to=? WHERE id=?`,
    [year, semester, subject_code, subject_title, day, time_from, time_to, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Class updated" });
    }
  );
};

exports.remove = (req, res) => {
  db.query("DELETE FROM classes WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Class removed" });
  });
};
