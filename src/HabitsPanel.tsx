import { useState, useEffect } from "react";
import "./styles/HabitsPanel.css";

interface Habit {
  id: number;
  name: string;
  completeDates: string[];
}

export default function HabitsPanel() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) setHabits(JSON.parse(storedHabits));
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!newHabit) return;
    setHabits([...habits, { id: Date.now(), name: newHabit, completeDates: [] }]);
    setNewHabit("");
  };

  const toggleComplete = (id: number) => {
    const updated = habits.map((habit) =>
      habit.id === id
        ? {
            ...habit,
            completeDates: habit.completeDates.includes(today)
              ? habit.completeDates.filter((d) => d !== today)
              : [...habit.completeDates, today],
          }
        : habit
    );
    setHabits(updated);
  };

  return (
    <div>
      <div className="habit-input">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Nuevo hábito"
        />
        <button onClick={addHabit}>Agregar</button>
      </div>

      {habits.map((habit) => {
        const completedToday = habit.completeDates.includes(today);
        return (
          <div key={habit.id} className={`card ${completedToday ? "completed" : ""}`}>
            <span>{habit.name}</span>
            <button onClick={() => toggleComplete(habit.id)}>
              {completedToday ? "Desmarcar" : "Completar"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
