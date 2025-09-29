import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Landing from "./Landing";

interface User {
  email: string;
  password: string;
}

function App() {
  const [currentUser] = useLocalStorage<User | null>("currentUser", null);

  const ProtectedDashboard = () => {
    if (!currentUser) return <Navigate to="/login" />;
    return <Dashboard />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
