
const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT a.*, s.first_name, s.last_name, c.subject_code FROM attendance a LEFT JOIN students s ON a.student_id=s.id LEFT JOIN classes c ON a.class_id=c.id", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

exports.add = (req, res) => {
  const { student_id, class_id, date, status, time_in, time_out } = req.body;
  const screenshot = req.file ? req.file.filename : null;

  db.query(
    `INSERT INTO attendance (student_id, class_id, date, status, time_in, time_out, screenshot)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [student_id, class_id, date, status, time_in, time_out, screenshot],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Attendance added" });
    }
  );
};

exports.update = (req, res) => {
  const { student_id, class_id, date, status, time_in, time_out, existingScreenshot } = req.body;
  const screenshot = req.file ? req.file.filename : existingScreenshot || null;

  db.query(
    `UPDATE attendance SET student_id=?, class_id=?, date=?, status=?, time_in=?, time_out=?, screenshot=? WHERE id=?`,
    [student_id, class_id, date, status, time_in, time_out, screenshot, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Attendance updated" });
    }
  );
};

exports.remove = (req, res) => {
  db.query("DELETE FROM attendance WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Attendance removed" });
  });
};
