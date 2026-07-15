import React, { useEffect, useState } from "react";
import { obtenerLogs } from "../services/logsService.ts";

export const LogsPage: React.FC = () => {

  const [logs, setLogs] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {

    obtenerLogs()
      .then((data) => {
        setLogs(data);
      })
      .catch((error) => {
        console.error("Error al cargar logs:", error);
      })
      .finally(() => {
        setCargando(false);
      });

  }, []);



  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Logs del Sistema
      </h1>


      <div className="bg-white rounded-xl shadow p-5">


        {cargando ? (

          <p>Cargando logs...</p>


        ) : logs.length === 0 ? (

          <p>No existen registros de eventos.</p>


        ) : (


          <table className="w-full">


            <thead>

              <tr className="border-b">


                <th className="text-left p-3">
                  ID
                </th>


                <th className="text-left p-3">
                  Usuario / Proveedor
                </th>


                <th className="text-left p-3">
                  Rol
                </th>


                <th className="text-left p-3">
                  Acción
                </th>


                <th className="text-left p-3">
                  Módulo
                </th>


                <th className="text-left p-3">
                  Descripción
                </th>


                <th className="text-left p-3">
                  Estado
                </th>


                <th className="text-left p-3">
                  Fecha
                </th>


              </tr>

            </thead>



            <tbody>


              {logs.map((log) => (


                <tr 
                  key={log.id}
                  className="border-b"
                >


                  <td className="p-3">
                    {log.usuario_id ?? "-"}
                  </td>



                  <td className="p-3">
                    {log.nombre ?? "Desconocido"}
                  </td>



                  <td className="p-3">
                    {log.rol ?? "-"}
                  </td>



                  <td className="p-3 font-semibold">
                    {log.accion ?? "-"}
                  </td>



                  <td className="p-3">
                    {log.modulo ?? "-"}
                  </td>



                  <td className="p-3">
                    {log.descripcion ?? "-"}
                  </td>



                  <td className="p-3">
                    {log.estado ?? "-"}
                  </td>



                  <td className="p-3">
                    {
                      log.fecha
                      ? new Date(log.fecha).toLocaleString()
                      : "-"
                    }
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