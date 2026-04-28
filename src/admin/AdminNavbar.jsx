import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Waves,
    MessageSquare,
    Star,
    Tent,
    GraduationCap,
    FileText,
    DollarSign,
    UserCircle
} from "lucide-react";

function AdminNavbar() {
    const location = useLocation();

    const navLinks = [
        { to: "/dashboard", label: "Trips", icon: LayoutDashboard },
        { to: "/dashboard/MarineServes", label: "Marine Services", icon: Waves },
        { to: "/dashboard/Comments", label: "Comments", icon: MessageSquare },
        { to: "/dashboard/Special", label: "Special Trips", icon: Star },
        { to: "/dashboard/Cambing", label: "Camping Trips", icon: Tent },
        { to: "/dashboard/Course", label: "Courses", icon: GraduationCap },
        { to: "/dashboard/Reports", label: "Reports", icon: FileText },
        { to: "/dashboard/Prices", label: "Prices", icon: DollarSign },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 text-white shadow-xl">
            <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Waves className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        BlueShark Admin
                    </h1>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === (link.to.startsWith('/') ? link.to : `/dashboard/${link.to.split('/').pop()}`);
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                                        : "hover:bg-white/5 text-slate-300 hover:text-white"
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{link.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-cyan-500 rounded-xl -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-white/10">
                    <div className="text-right">
                        <p className="text-xs text-slate-400">Welcome,</p>
                        <p className="text-sm font-semibold">Admin User</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden hover:border-cyan-500 transition-colors cursor-pointer">
                        <UserCircle className="text-slate-400" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;