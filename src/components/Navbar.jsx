import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token) return null;

    const logout = async () => {

        try {
            await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (e) {
            console.log("Logout error:", e);
        }

        localStorage.clear();
        navigate("/");
    };

    return (
        <nav style={{
            display: "flex",
            gap: "10px",
            padding: "10px",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            color: "white"
        }}>

            <button onClick={() => navigate("/proyectos")}>
                Proyectos
            </button>

            {rol === "ADMIN" && (
                <>
                    <button onClick={() => navigate("/crear-proyecto")}>
                        Crear Proyecto
                    </button>

                    <button onClick={() => navigate("/crear-tarea")}>
                        Crear Tarea
                    </button>
                </>
            )}

            <button onClick={logout}>
                Cerrar Sesión
            </button>

        </nav>
    );
}

export default Navbar;