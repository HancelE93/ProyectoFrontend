import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const manejarLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Credenciales incorrectas");
            }

            localStorage.setItem("token", data.token);

            const payload = JSON.parse(atob(data.token.split(".")[1]));
            localStorage.setItem("rol", payload.rol);

            navigate("/proyectos");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* IZQUIERDA */}
            <div className="login-left">

                <h1 className="login-title">Bienvenido</h1>
                <p className="login-subtitle">
                    Inicia sesión para gestionar tus proyectos
                </p>

                <form className="login-form" onSubmit={manejarLogin}>

                    <input
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="login-error">{error}</p>}

                    <button disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>

                </form>

            </div>

            {/* DERECHA */}
            <div className="login-right">

                <div className="login-image-box">
                    <img
                        src="https://illustrations.popsy.co/gray/work-from-home.svg"
                        alt="login"
                    />
                </div>

            </div>

        </div>
    );
}

export default Login;