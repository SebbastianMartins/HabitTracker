import { useState } from "react";
import HabitsPanel from "./HabitsPanel";
import FinancePanel from "./FinancePanel";
import "./styles/Dashboard.css";

// React Icons
import { FaRunning, FaMoneyBillWave, FaCalendarAlt, FaUserCircle } from "react-icons/fa";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("habits");

  return (
    <div className="dashboard">
      {/* Navbar lateral */}
      <nav className="dashboard-navbar">
        <button
          className={activeTab === "habits" ? "active" : ""}
          onClick={() => setActiveTab("habits")}
        >
          <FaRunning size={20} /> Hábitos
        </button>
        <button
          className={activeTab === "finance" ? "active" : ""}
          onClick={() => setActiveTab("finance")}
        >
          <FaMoneyBillWave size={20} /> Finanzas
        </button>
        <button
          className={activeTab === "calendar" ? "active" : ""}
          onClick={() => setActiveTab("calendar")}
        >
          <FaCalendarAlt size={20} /> Calendario
        </button>
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          <FaUserCircle size={20} /> Perfil
        </button>
      </nav>

      {/* Contenido */}
      <div className="dashboard-content">
        {activeTab === "habits" && <HabitsPanel />}
        {activeTab === "finance" && <FinancePanel />}
        {activeTab === "calendar" && <p>Calendario en construcción 📅</p>}
        {activeTab === "profile" && <p>Perfil en construcción 👤</p>}
      </div>
    </div>
  );
}
