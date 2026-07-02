import { useEffect, useState } from "react";

function Proyectos() {

    const [proyectos, setProyectos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);

    const rol = localStorage.getItem("rol")?.trim();

    // =========================
    // CARGAR PROYECTOS
    // =========================
    const cargarProyectos = async () => {

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:8080/api/proyectos/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                console.log("Error HTTP:", res.status);
                return;
            }

            const data = await res.json();
            setProyectos(data);

        } catch (error) {
            console.log("Error:", error);
        }
    };

    // =========================
    // CREAR PROYECTO
    // =========================
    const crearProyecto = async () => {

        if (!nombre.trim()) {
            alert("El nombre es obligatorio");
            return;
        }

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/api/proyectos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                fechaInicio: fechaInicio || new Date().toISOString().split("T")[0]
            })
        });

        if (res.ok) {
            setNombre("");
            setDescripcion("");
            setFechaInicio("");
            setMostrarModal(false);
            cargarProyectos();
        } else {
            console.log("Error al crear proyecto");
        }
    };

    // =========================
    // ELIMINAR PROYECTO
    // =========================
    const eliminarProyecto = async (id) => {

        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:8080/api/proyectos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (res.ok) {
            cargarProyectos();
        } else {
            console.log("Error al eliminar");
        }
    };

    // =========================
    // USEEFFECT
    // =========================
    useEffect(() => {
        cargarProyectos();
    }, []);

    return (
        <div style={{ padding: "20px" }}>

            <h2>Proyectos</h2>

            {/* BOTÓN ADMIN */}
            {rol === "ADMIN" && (
                <button onClick={() => setMostrarModal(true)}>
                    + Nuevo Proyecto
                </button>
            )}

            <br /><br />

            {/* TABLA */}
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha Inicio</th>
                        {rol === "ADMIN" && <th>Acciones</th>}
                    </tr>
                </thead>

                <tbody>
                    {proyectos.length === 0 ? (
                        <tr>
                            <td colSpan={rol === "ADMIN" ? 5 : 4}>
                                No hay proyectos
                            </td>
                        </tr>
                    ) : (
                        proyectos.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td>{p.descripcion}</td>
                                <td>{p.fechaInicio}</td>

                                {rol === "ADMIN" && (
                                    <td>
                                        <button onClick={() => eliminarProyecto(p.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* =========================
                MODAL
            ========================= */}
            {mostrarModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "350px"
                    }}>

                        <h3>Nuevo Proyecto</h3>

                        <input
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <br /><br />

                        <input
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />

                        <br /><br />

                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />

                        <br /><br />

                        <button onClick={crearProyecto}>
                            Guardar
                        </button>

                        <button onClick={() => setMostrarModal(false)}>
                            Cancelar
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Proyectos;