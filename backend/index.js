const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./Student");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/student_db")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend running OK!");
});

// Lấy toàn bộ học sinh
app.get("/api/students", async (_req, res) => {
  try {
    const list = await Student.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy 1 học sinh theo id
app.get("/api/students/:id", async (req, res) => {
  try {
    const stu = await Student.findById(req.params.id);
    if (!stu) return res.status(404).json({ error: "Student not found" });
    res.json(stu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStu = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // trả về dữ liệu mới sau cập nhật 
    );
    if (!updatedStu) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(updatedStu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Đã xóa học sinh", id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

