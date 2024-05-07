import "./App.css";
import LoginForm from "./pages/LoginForm";
import { Routes, Route } from "react-router-dom";
import MaintenanceRecords from "./pages/MaintenanceRecords";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<MaintenanceRecords />} />
    </Routes>
  );
}

export default App;
