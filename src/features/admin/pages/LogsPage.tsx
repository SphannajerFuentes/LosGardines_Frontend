import React, { useEffect, useState } from "react";
import { obtenerLogs } from "../services/logsService.ts";

export const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorBackend, setErrorBackend] = useState<string | null>(null); // <- Nuevo estado

  useEffect(() => {
    obtenerLogs()
      .then((data) => {
        setLogs(data);
      })
      .catch((error) => {
        console.error("Error al cargar logs:", error);
        setErrorBackend("Error al cargar los datos del servidor."); // <- Capturamos error
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Logs del Sistema</h1>

      <div className="bg-white rounded-xl shadow p-5">
        {cargando ? (
          <p>Cargando logs...</p>
        ) : errorBackend ? ( // <- Renderizamos el error si existe
          <p className="text-red-500 font-bold">{errorBackend}</p>
        ) : logs.length === 0 ? (
          <p>No existen registros de movimientos.</p>
        ) : (

          <table className="w-full">

            <thead>
              <tr className="border-b">

                <th className="text-left p-3">
                  Usuario
                </th>

                <th className="text-left p-3">
                  Tipo Movimiento
                </th>

                <th className="text-left p-3">
                  Cantidad
                </th>

                <th className="text-left p-3">
                  Motivo
                </th>

                <th className="text-left p-3">
                  Fecha
                </th>

              </tr>
            </thead>


            <tbody>

              {logs.map((log) => (

                <tr key={log.fecha} className="border-b">

             <td className="p-3">
              {log.usuario}
             </td>

            <td className="p-3">
              {log.tipo_movimiento}
            </td>

           <td className="p-3">
           {log.cantidad}
          </td>

            <td className="p-3">
             {log.motivo ?? "-"}
               </td>

            <td className="p-3">
                {log.fecha}
                </td>

              </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};