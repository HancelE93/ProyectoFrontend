import { useEffect, useState } from "react";

function Proyectos() {

    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {

        const cargar = async () => {

            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.log("No hay token");
                    return;
                }

                const res = await fetch("http://localhost:8080/api/proyectos/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
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
                console.log("Error en fetch:", error);
            }
        };

        cargar();

    }, []);

    return (
        <div>
            <h2>Proyectos</h2>

            {proyectos.length === 0 ? (
                <p>No hay proyectos o no tienes acceso.</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>

                    <tbody>
                        {proyectos.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Proyectos;