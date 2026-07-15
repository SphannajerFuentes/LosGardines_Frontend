import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  Activity,
  Users,
  Building2,
  AlertTriangle,
  PackageCheck,
  PlusCircle,
  FileText,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { usuario } = useContext(AuthContext);

  // Definición de módulos y quién puede verlos (REQ-015)
  const menuItems = [
    {
      path: "/dashboard",
      label: "Panel Principal",
      icon: LayoutDashboard,
      roles: ["Administrador", "Almacenero", "Farmacéutico"],
    },

    // Logística
    {
      path: "/compras",
      label: "Recepción de Órdenes",
      icon: PackageCheck,
      roles: ["Administrador", "Almacenero"],
      exact: true,
    },

    {
      path: "/compras/nueva",
      label: "Emitir Pedido",
      icon: PlusCircle,
      roles: ["Administrador"],
    },

    {
      path: "/operaciones",
      label: "Registro de Salidas",
      icon: PackageCheck,
      roles: ["Administrador", "Farmacéutico"],
    },

    {
      path: "/inventario",
      label: "Gestión de Inventario",
      icon: Package,
      roles: ["Administrador", "Farmacéutico"],
    },

    {
      path: "/incidencias",
      label: "Reportar Incidencia",
      icon: AlertTriangle,
      roles: ["Administrador", "Almacenero"],
    },


    // Administrativo
    {
      path: "/admin/usuarios",
      label: "Gestionar Usuarios",
      icon: Users,
      roles: ["Administrador"],
    },

    {
      path: "/admin/proveedores",
      label: "Gestionar Proveedores",
      icon: Building2,
      roles: ["Administrador"],
    },


    // Logs del sistema (TU CAMBIO)
    {
      path: "/admin/logs",
      label: "Logs del Sistema",
      icon: FileText,
      roles: ["Administrador"],
    },


    // Auditoría
    {
      path: "/kardex",
      label: "Auditoría Kardex",
      icon: Activity,
      roles: ["Administrador", "Farmacéutico"],
    },
  ];


  return (
    <aside className="
      w-64
      bg-surface-container-lowest
      border-r
      border-outline-variant/30
      flex
      flex-col
      h-full
      z-50
      overflow-hidden
      bg-white/50
      backdrop-blur-xl
    ">


      {/* Logo */}
      <div className="
        p-5
        md:p-6
        flex
        items-center
        gap-3
        border-b
        border-outline-variant/30
        flex-shrink-0
      ">

        <div className="
          w-9
          h-9
          md:w-10
          md:h-10
          rounded-xl
          bg-primary-container
          flex
          items-center
          justify-center
          text-white
          font-bold
          shadow-sm
        ">
          G
        </div>


        <span className="
          font-headline
          font-bold
          text-on-surface
          text-lg
          md:text-xl
          tracking-tight
          truncate
        ">
          Girasoles
        </span>

      </div>



      {/* Navegación */}
      <nav className="
        flex-1
        p-3
        md:p-4
        space-y-1.5
        overflow-y-auto
        custom-scrollbar
      ">


        {menuItems
          .filter((item) =>
            item.roles.includes(usuario?.rol || "")
          )
          .map((item) => {

            const Icon = item.icon;


            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-3
                  md:px-4
                  py-2.5
                  md:py-3
                  rounded-xl
                  transition-all
                  duration-200
                  font-body
                  text-[13px]
                  md:text-[14px]
                  font-semibold
                  ${
                    isActive
                      ? "bg-primary-container text-white shadow-md"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }
                  `
                }
              >

                <Icon className="
                  w-5
                  h-5
                  flex-shrink-0
                "/>


                <span className="truncate">
                  {item.label}
                </span>


              </NavLink>
            );

          })}


      </nav>



      {/* Usuario */}
      <div className="
        p-4
        border-t
        border-outline-variant/30
        flex-shrink-0
      ">

        <div className="
          px-4
          py-3
          bg-surface-container-low
          border
          border-outline-variant/20
          rounded-xl
        ">

          <p className="
            text-[10px]
            md:text-[11px]
            font-bold
            text-outline
            uppercase
            tracking-wider
            mb-0.5
          ">
            Rol Activo
          </p>


          <p className="
            text-[13px]
            md:text-[14px]
            text-primary
            font-bold
            truncate
          ">
            {usuario?.rol || "No asignado"}
          </p>


        </div>

      </div>


    </aside>
  );
};