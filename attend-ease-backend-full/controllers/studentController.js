
const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM students", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

exports.getOne = (req, res) => {
  db.query("SELECT * FROM students WHERE id = ?", [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data[0]);
  });
};

exports.add = (req, res) => {
  const { student_id, first_name, middle_name, last_name, status, phone, email } = req.body;
  db.query(
    `INSERT INTO students (student_id, first_name, middle_name, last_name, status, phone, email)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [student_id, first_name, middle_name, last_name, status, phone, email],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Student added" });
    }
  );
};

exports.update = (req, res) => {
  const { student_id, first_name, middle_name, last_name, status, phone, email } = req.body;
  db.query(
    `UPDATE students SET student_id=?, first_name=?, middle_name=?, last_name=?, status=?, phone=?, email=? WHERE id=?`,
    [student_id, first_name, middle_name, last_name, status, phone, email, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Student updated" });
    }
  );
};

exports.remove = (req, res) => {
  db.query("DELETE FROM students WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student removed" });
  });
};
