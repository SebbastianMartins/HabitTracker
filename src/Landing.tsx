import { Link } from "react-router-dom";
import "./styles/Landing.css"; 

export default function Landing() {
    return (
        <div className="landing">
            <div className="overlay">
                <h1 className="title"> Organizador de habitos</h1>
                <p className="subtitle">Organiza tus habitos , controla tus gastos y más</p>

                <div className="buttons">
                    <Link to="/login" className="btn">Iniciar Sesion</Link>
                    <Link to="/register" className="btn btn-alt">Registrarse</Link>
            </div>
        </div> 
    </div>
    );
}