import { useState } from "react";
import "./styles/FinancePanel.css";

interface Transaction {
  id: number;
  type: "ingreso" | "gasto";
  amount: number;
  category: string;
  description: string;
}

export default function FinancePanel() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [type, setType] = useState<"ingreso" | "gasto">("gasto");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!amount || !category) return;
    const newTransaction: Transaction = {
      id: Date.now(),
      type,
      amount,
      category,
      description,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount(0);
    setCategory("");
    setDescription("");
  };

  // --- Estadísticas ---
  const totalIngresos = transactions
    .filter((t) => t.type === "ingreso")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalGastos = transactions
    .filter((t) => t.type === "gasto")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIngresos - totalGastos;

  return (
    <div className="finance-panel">
      <h2>Gestión de Finanzas</h2>

      {/* Formulario */}
      <div className="finance-form">
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>

        <input
          type="number"
          placeholder="Monto"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <input
          type="text"
          placeholder="Categoría (Ej: Comida, Ocio)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleAdd}>Añadir</button>
      </div>

      {/* Lista de movimientos */}
      <ul className="finance-list">
        {transactions.map((t) => (
          <li key={t.id} className={t.type}>
            <span>
              {t.type === "gasto" ? "🛑" : "💰"} {t.category} — {t.description}
            </span>
            <span>{t.type === "gasto" ? "-" : "+"}${t.amount}</span>
          </li>
        ))}
      </ul>

      {/* Estadísticas */}
      <div className="finance-stats">
        <p>💰 Total Ingresos: <strong>${totalIngresos}</strong></p>
        <p>🛑 Total Gastos: <strong>${totalGastos}</strong></p>
        <p>📊 Balance: <strong style={{color: balance >= 0 ? "green" : "red"}}>
          ${balance}
        </strong></p>
      </div>
    </div>
  );
}
