import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    const logout = async () => {

        await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        localStorage.clear();
        navigate("/");
    };

    return (
        <nav>

            <button onClick={() => navigate("/proyectos")}>
                Ver Proyectos
            </button>

            {rol === "ROLE_ADMIN" && (
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