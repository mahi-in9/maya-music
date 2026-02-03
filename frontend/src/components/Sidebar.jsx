import React from "react";
import { Home, Zap, PlaySquare, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={22} />, label: "Home", path: "/" },
    { icon: <Zap size={22} />, label: "Explore", path: "/expolre" },
    {
      icon: <PlaySquare size={22} />,
      label: "Subscriptions",
      path: "/subscriptions",
    },
    { icon: <UserCircle size={22} />, label: "You", path: "/you" },
  ];

  return (
    <aside
      className="
      fixed z-50 bg-[#0f0f0f] border-white/5 transition-all duration-300
      /* Mobile: Bottom bar */
      bottom-0 left-0 w-full h-16 border-t flex flex-row justify-around items-center px-2
      /* Desktop: Side bar */
      md:top-16 md:left-0 md:w-20 md:h-[calc(100vh-64px)] md:border-r md:flex-col md:justify-start md:pt-4 md:gap-2
    "
    >
      {menuItems.map((item) => (
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}
    </aside>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      whileTap={{ scale: 0.9 }}
      className={`
        relative flex flex-col items-center justify-center cursor-pointer rounded-xl transition-all duration-300
        /* Mobile sizing */
        flex-1 h-full
        /* Desktop sizing */
        md:w-16 md:h-16 md:flex-none
        ${active ? "text-blue-400 font-bold" : "text-zinc-500 hover:text-white"}
      `}
    >
      <div className={`${active ? "scale-110" : ""} transition-transform`}>
        {icon}
      </div>
      <span className="text-[10px] mt-1 font-medium">{label}</span>

      {active && (
        <motion.div
          layoutId="nav-active-bg"
          className="absolute inset-0 bg-blue-500/10 rounded-xl z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
};

export default Sidebar;
