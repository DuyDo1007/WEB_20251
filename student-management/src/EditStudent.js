import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/students/${id}`, {
      name, age: Number(age), class: stuClass
    })
      .then(() => navigate("/"))
      .catch(err => console.error("Update error:", err));
  };

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <h2>Sửa học sinh</h2>

      <form onSubmit={handleUpdate}>
        <input value={name} onChange={e=>setName(e.target.value)} required />
        <input type="number" value={age} onChange={e=>setAge(e.target.value)} required />
        <input value={stuClass} onChange={e=>setStuClass(e.target.value)} required />
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}

export default EditStudent;
