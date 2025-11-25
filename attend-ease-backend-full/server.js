
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/students", require("./routes/students"));
app.use("/api/classes", require("./routes/classes"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/records", require("./routes/records"));

app.listen(3000, () => console.log("Backend running on port 3000"));
