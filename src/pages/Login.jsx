import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const manejarLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error("Credenciales incorrectas");
            }

            // 🔐 guardar token
            localStorage.setItem("token", data.token);

            // 🔐 sacar rol del JWT
            const payload = JSON.parse(atob(data.token.split(".")[1]));
            localStorage.setItem("rol", payload.rol);

            navigate("/proyectos");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={manejarLogin}>
                <input
                    placeholder="Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p>{error}</p>}

                <button>Ingresar</button>
            </form>
        </div>
    );
}

export default Login;