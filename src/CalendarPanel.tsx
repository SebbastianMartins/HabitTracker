// src/CalendarPanel.tsx
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./styles/CalendarPanel.css";

interface Habit {
  name: string;
  completeDates: string[];
}

interface Reminder {
  date: string; // YYYY-MM-DD
  text: string;
}

// Simulamos algunos hábitos y recordatorios
const habits: Habit[] = [
  { name: "Ejercicio", completeDates: ["2025-10-30"] },
  { name: "Leer", completeDates: ["2025-10-29", "2025-10-30"] },
];

const reminders: Reminder[] = [
  { date: "2025-10-30", text: "Comprar comida saludable" },
  { date: "2025-10-30", text: "Enviar correo al profesor" },
];

export default function CalendarPanel() {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate: Date) => {
    setDate(newDate);
  };

  const formattedDate = date.toISOString().split("T")[0];

  // Filtramos los recordatorios para la fecha seleccionada
  const todayReminders = reminders.filter(r => r.date === formattedDate);

  return (
    <div className="calendar-panel">
      <h2>Calendario</h2>
      <Calendar
        onChange={handleChange}
        value={date}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const day = date.toISOString().split("T")[0];
            // marcamos los días donde se completó algún hábito
            if (habits.some(h => h.completeDates.includes(day))) {
              return "completed-day";
            }
          }
        }}
      />

      <h3>Recordatorios del día</h3>
      {todayReminders.length === 0 ? (
        <p>No hay recordatorios para hoy ✅</p>
      ) : (
        <ul>
          {todayReminders.map((r, idx) => (
            <li key={idx}>{r.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
