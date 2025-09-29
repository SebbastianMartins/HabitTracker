import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  password: string;
}

export default function Register() {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !password) {
      setError('Rellena todos los campos');
      return;
    }

    if (users.find(u => u.email === email)) {
      setError('El usuario ya existe');
      return;
    }

    setUsers([...users, { email, password }]);
    alert('Usuario registrado ✅');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
