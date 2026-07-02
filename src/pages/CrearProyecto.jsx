import { useState } from "react";

function CrearProyecto() {

    const rol = localStorage.getItem("rol");

    // 🔐 PROTECCIÓN (VA AQUÍ ARRIBA)
    if (rol !== "ROLE_ADMIN") {
        return <h2>No tienes permisos</h2>;
    }

    const [nombre, setNombre] = useState("");

    const crear = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        await fetch("http://localhost:8080/api/proyectos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ nombre })
        });
    };

    return (
        <div>
            <h2>Crear Proyecto</h2>

            <form onSubmit={crear}>
                <input
                    placeholder="Nombre"
                    onChange={(e) => setNombre(e.target.value)}
                />

                <button>Crear</button>
            </form>
        </div>
    );
}

export default CrearProyecto;