// src/features/dashboard/components/AlertPanel.tsx

import React from 'react';
import {
  Inbox,
  Package,
  ClipboardList,
  CalendarClock,
  AlertCircle
} from 'lucide-react';


interface AlertaItem {
  id: string | number;
  medicamento?: string;
  lote?: string;
  tipo?: string;
  mensaje: string;
}


interface AlertPanelProps {
  alerts: AlertaItem[];
}


export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {


  // ==============================
  // CLASIFICACIÓN DE ALERTAS
  // ==============================


  const stockMinimo = alerts.filter(alerta => {

    const mensaje = alerta.mensaje.toLowerCase();

    return (
      alerta.tipo?.toLowerCase() === "stock" ||
      alerta.tipo?.toLowerCase() === "critico" ||
      mensaje.includes("stock") ||
      mensaje.includes("bajo") ||
      mensaje.includes("mínimo") ||
      mensaje.includes("minimo")
    );

  });



  const pedidos = alerts.filter(alerta => {

    const mensaje = alerta.mensaje.toLowerCase();

    return (
      alerta.tipo?.toLowerCase() === "pedido" ||
      mensaje.includes("pedido") ||
      mensaje.includes("orden")
    );

  });



  const lotesVencidos = alerts.filter(alerta => {

    const mensaje = alerta.mensaje.toLowerCase();

    return (
      alerta.tipo?.toLowerCase() === "caducidad" ||
      alerta.tipo?.toLowerCase() === "advertencia" ||
      Boolean(alerta.lote) ||
      mensaje.includes("vence") ||
      mensaje.includes("venc") ||
      mensaje.includes("caduca")
    );

  });



  // ==============================
  // COMPONENTE DE LISTA
  // ==============================


  const renderLista = (
    titulo: string,
    icon: React.ReactNode,
    lista: AlertaItem[],
    color: string
  ) => {


    return (

      <div className="
        bg-surface-container-lowest
        rounded-2xl
        border
        border-outline-variant/30
        shadow-sm
        overflow-hidden
      ">


        {/* Cabecera */}

        <div className="
          p-4
          border-b
          border-outline-variant/30
          flex
          justify-between
          items-center
        ">

          <h3 className="
            font-bold
            text-on-surface
            flex
            items-center
            gap-2
            text-sm
          ">
            {icon}
            {titulo}
          </h3>


          <span className={`
            text-xs
            font-bold
            px-3
            py-1
            rounded-full
            ${color}
          `}>
            {lista.length}
          </span>


        </div>



        {/* Contenido */}

        <div className="
          p-4
          space-y-3
          max-h-64
          overflow-y-auto
        ">


          {
            lista.length === 0 ? (

              <div className="
                flex
                flex-col
                items-center
                justify-center
                text-outline
                py-8
                gap-2
              ">

                <Inbox className="w-7 h-7"/>

                <p className="text-xs">
                  Sin registros
                </p>

              </div>


            ) : (


              lista.map(alerta => (

                <div
                  key={alerta.id}
                  className="
                    p-3
                    rounded-xl
                    border
                    border-error-container
                    bg-error-container/20
                  "
                >


                  <div className="
                    flex
                    items-center
                    gap-2
                  ">

                    <AlertCircle
                      className="w-4 h-4 text-error"
                    />


                    <p className="
                      font-bold
                      text-sm
                    ">

                      {
                        alerta.medicamento 
                        || "Registro pendiente"
                      }

                    </p>


                  </div>



                  {
                    alerta.lote && (

                      <p className="text-xs mt-1">
                        Lote: {alerta.lote}
                      </p>

                    )
                  }



                  <p className="
                    text-xs
                    mt-1
                    text-on-surface-variant
                  ">

                    {alerta.mensaje}

                  </p>


                </div>


              ))

            )
          }


        </div>


      </div>

    );

  };




  // ==============================
  // PANEL PRINCIPAL
  // ==============================


  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-5
    ">


      {renderLista(
        "Stock mínimo",
        <Package className="w-5 h-5 text-error"/>,
        stockMinimo,
        "bg-error-container text-error"
      )}



      {renderLista(
        "Pedidos pendientes",
        <ClipboardList className="w-5 h-5 text-tertiary"/>,
        pedidos,
        "bg-tertiary-container text-tertiary"
      )}



      {renderLista(
        "Lotes vencidos o por vencer",
        <CalendarClock className="w-5 h-5 text-orange-500"/>,
        lotesVencidos,
        "bg-orange-100 text-orange-700"
      )}



    </div>

  );

};