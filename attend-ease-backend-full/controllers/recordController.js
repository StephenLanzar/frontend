
const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query(`SELECT a.*, s.first_name, s.last_name, c.subject_code, c.subject_title FROM attendance a
            LEFT JOIN students s ON a.student_id=s.id
            LEFT JOIN classes c ON a.class_id=c.id ORDER BY a.date DESC`, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

exports.getByStudent = (req, res) => {
  db.query(
    `SELECT a.*, c.subject_code, c.subject_title FROM attendance a LEFT JOIN classes c ON a.class_id=c.id WHERE a.student_id=? ORDER BY a.date DESC`,
    [req.params.studentId],
    (err, data) => {
      if (err) return res.status(500).json({ error: err });
      res.json(data);
    }
  );
};

exports.getByClass = (req, res) => {
  db.query(
    `SELECT a.*, s.first_name, s.last_name FROM attendance a LEFT JOIN students s ON a.student_id=s.id WHERE a.class_id=? ORDER BY a.date DESC`,
    [req.params.classId],
    (err, data) => {
      if (err) return res.status(500).json({ error: err });
      res.json(data);
    }
  );
};
