import axios from "axios";
import { useEffect, useState } from "react";
//Bai 1
function App() {
  const [students, setStudents] = useState([]);
  
  // form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  // Lấy danh sách khi load trang
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {

    
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    
    const newStu = {
      name,
      age: Number(age),
      class: stuClass
    };

    axios.post("http://localhost:5000/api/students", newStu)
      .then(res => {
        setStudents(prev => [...prev, res.data]);
        setName(""); setAge(""); setStuClass("");
      })
      .catch(err => console.error("Lỗi thêm học sinh:", err));
  };

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <h2>Quản lý học sinh</h2>

      {/* Form thêm */}
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        /><br/>
        
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
        /><br/>
        
        <input
          type="text"
          placeholder="Lớp"
          value={stuClass}
          onChange={e => setStuClass(e.target.value)}
          required
        /><br/>
        
        <button type="submit">Thêm học sinh</button>
      </form>

      <hr/>

      <h3>Danh sách học sinh</h3>
      {students.length === 0 ? (
        <p>Chưa có học sinh nào!</p>
      ) : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Tuổi</th>
              <th>Lớp</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
