import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => fetchStudents(), []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/students", {
        name,
        age: Number(age),
        class: stuClass,
      })
      .then((res) => {
        setStudents((prev) => [...prev, res.data]);
        setName("");
        setAge("");
        setStuClass("");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa học sinh này?")) return;

    axios
      .delete(`http://localhost:5000/api/students/${id}`)
      .then(() => {
        setStudents((prev) => prev.filter((s) => s._id !== id));
      })
      .catch((err) => console.error("Lỗi xóa:", err));
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return sortAsc ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h2>Quản lý học sinh</h2>

      <form onSubmit={handleAddStudent}>
        <input
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Tuổi"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          placeholder="Lớp"
          value={stuClass}
          onChange={(e) => setStuClass(e.target.value)}
          required
        />
        <button type="submit">Thêm</button>
      </form>

      <div style={{ margin: "12px 0", display: "flex", gap: 8 }}>
        <input
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={() => setSortAsc((prev) => !prev)}>
          Sắp xếp: {sortAsc ? "A → Z" : "Z → A"}
        </button>
      </div>

      <h3>Danh sách học sinh</h3>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.class}</td>
              <td>
                <Link to={`/edit/${s._id}`}>
                  <button>✏️ Sửa</button>
                </Link>
                <button
                  onClick={() => handleDelete(s._id)}
                  style={{ marginLeft: 8 }}
                >
                  🗑️ Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Home;
