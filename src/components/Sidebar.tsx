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

    // Agrupamos la logística
    {
      path: "/compras",
      label: "Recepción de Órdenes",
      icon: PackageCheck,
      roles: ["Administrador", "Almacenero"],
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

    // Gestión administrativa
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
    {
      path: "/operaciones",
      label: "Ventas y Kardex",
      icon: Activity,
      roles: ["Administrador", "Farmacéutico"],
    },
  ];

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col h-full shadow-sm z-50">
      {/* Logo y Marca */}
      <div className="p-6 flex items-center gap-3 border-b border-outline-variant/30">
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white font-bold shadow-sm">
          G
        </div>
        <span className="font-headline font-bold text-on-surface text-xl tracking-tight">
          Girasoles
        </span>
      </div>

      {/* Navegación Dinámica */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems
          .filter((item) => item.roles.includes(usuario?.rol || ""))
          .map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-body text-[14px] font-semibold ${
                    isActive
                      ? "bg-primary-container text-white shadow-md"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
      </nav>

      {/* Tarjeta inferior del Usuario */}
      <div className="p-4 border-t border-outline-variant/30">
        <div className="px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl">
          <p className="text-[11px] font-bold text-outline uppercase tracking-wider mb-0.5">
            Rol Activo
          </p>
          <p className="text-[14px] text-primary font-bold">{usuario?.rol}</p>
        </div>
      </div>
    </aside>
  );
};
