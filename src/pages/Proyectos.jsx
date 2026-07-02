import { useEffect, useState } from "react";

function Proyectos() {

    const [proyectos, setProyectos] = useState([]);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const rol = localStorage.getItem("rol")?.trim();

    // =========================
    // LISTAR
    // =========================
    const cargarProyectos = async () => {

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/api/proyectos/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        setProyectos(data);
    };

    // =========================
    // GUARDAR (CREAR / EDITAR)
    // =========================
    const guardarProyecto = async () => {

        const token = localStorage.getItem("token");

        const payload = {
            nombre,
            descripcion,
            fechaInicio: fechaInicio || new Date().toISOString().split("T")[0]
        };

        let url = "http://localhost:8080/api/proyectos/";
        let method = "POST";

        if (editando) {
            url = `http://localhost:8080/api/proyectos/${idEditar}`;
            method = "PUT";
        }

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            limpiarModal();
            cargarProyectos();
        } else {
            console.log("Error al guardar");
        }
    };

    // =========================
    // ELIMINAR
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
        }
    };

    // =========================
    // EDITAR
    // =========================
    const abrirEditar = (p) => {
        setNombre(p.nombre);
        setDescripcion(p.descripcion);
        setFechaInicio(p.fechaInicio);

        setIdEditar(p.id);
        setEditando(true);
        setMostrarModal(true);
    };

    // =========================
    // NUEVO
    // =========================
    const abrirNuevo = () => {
        limpiarModal();
        setMostrarModal(true);
    };

    // =========================
    // LIMPIAR
    // =========================
    const limpiarModal = () => {
        setNombre("");
        setDescripcion("");
        setFechaInicio("");

        setEditando(false);
        setIdEditar(null);
        setMostrarModal(false);
    };

    useEffect(() => {
        cargarProyectos();
    }, []);

    return (
        <div className="proyectos-page">

            {/* HEADER */}
            <div className="header-peliculas">

                <div className="header-texto">
                    <h1>Proyectos</h1>
                    <p>Gestión moderna de proyectos</p>
                </div>

                {rol === "ADMIN" && (
                    <div className="header-actions">
                        <button className="btn-nueva" onClick={abrirNuevo}>
                            + Nuevo Proyecto
                        </button>
                    </div>
                )}
            </div>

            {/* CARDS */}
            <div className="peliculas-grid">

                {proyectos.map((p) => (
                    <div key={p.id} className="pelicula-card">

                        <div className="pelicula-info">
                            <h3>{p.nombre}</h3>
                            <p>{p.descripcion}</p>
                            <small>{p.fechaInicio}</small>
                        </div>

                        {rol === "ADMIN" && (
                            <div className="pelicula-buttons">

                                <button
                                    className="btn-edit"
                                    onClick={() => abrirEditar(p)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn-delete"
                                    onClick={() => eliminarProyecto(p.id)}
                                >
                                    Eliminar
                                </button>

                            </div>
                        )}

                    </div>
                ))}

            </div>

            {/* MODAL */}
            {mostrarModal && (
                <div className="modal-bg">

                    <div className="modal-form">

                        <button className="modal-close" onClick={limpiarModal}>
                            ✕
                        </button>

                        <h2>
                            {editando ? "Editar Proyecto" : "Nuevo Proyecto"}
                        </h2>

                        <input
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <textarea
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />

                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />

                        <div className="modal-actions">

                            <button className="btn-save" onClick={guardarProyecto}>
                                {editando ? "Actualizar" : "Guardar"}
                            </button>

                            <button className="btn-cancel" onClick={limpiarModal}>
                                Cancelar
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Proyectos;