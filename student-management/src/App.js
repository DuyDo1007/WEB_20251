import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import EditStudent from "./EditStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
