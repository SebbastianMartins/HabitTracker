import { useState } from "react";
import "./styles/FinancePanel.css";

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
}

const categoriesColors: { [key: string]: string } = {
  Comida: "#ff6b6b",
  Transporte: "#4ecdc4",
  Ocio: "#ffa500",
  Otros: "#6a5acd",
};

export default function FiancePanel() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Comida");

  const addExpense = () => {
    if (!name || !amount) return;
    setExpenses([
      ...expenses,
      { id: Date.now(), name, amount: parseFloat(amount), category },
    ]);
    setName("");
    setAmount("");
    setCategory("Comida");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="finance-panel">
      <h2>Finanzas 💰</h2>
      <div className="total">Saldo total: ${total.toFixed(2)}</div>

      {/* Formulario para añadir gasto */}
      <div className="add-expense">
        <input
          type="text"
          placeholder="Nombre del gasto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {Object.keys(categoriesColors).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={addExpense}>Agregar</button>
      </div>

      {/* Lista de gastos */}
      <ul className="expenses-list">
        {expenses.map((e) => (
          <li key={e.id} style={{ borderLeft: `5px solid ${categoriesColors[e.category]}` }}>
            <span>{e.name}</span>
            <span>${e.amount.toFixed(2)}</span>
            <span className="category">{e.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
