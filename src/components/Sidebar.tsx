import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState, ReactNode } from "react";
import logo from "../assets/oceanus-logo.svg";

// Definición del tipo para el contexto
interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`h-screen ${expanded ? "w-64" : "w-16"} transition-all`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Cabecera del sidebar */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <a href="#">
            <img
              src={logo}
              alt="oceanus_logo"
              className={`w-12 hover:scale-105 transition-all overflow-hidden ${
                expanded ? "w-12" : "w-0"
              }`}
            />
          </a>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        {/* Sección de perfil de usuario */}
        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=C4EEF8&color=0C5668&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

// Definición de las propiedades del SidebarItem
interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const sidebarContext = useContext(SidebarContext);
  if (!sidebarContext) {
    throw new Error("SidebarItem must be used within a SidebarContext");
  }
  const { expanded } = sidebarContext;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-[#C4EEF8] to-[#E5F7FB] text-[#0C5668]"
          : "hover:bg-[#E5F7FB] text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-[#E5F7FB] ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-[#E5F7FB] text-[#117991] text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}
