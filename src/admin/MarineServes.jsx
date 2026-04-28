import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageModal from "./ImageModal";
import TextModal from "./TextModal";
import { motion, AnimatePresence } from "framer-motion";
import {
    Ship,
    Anchor,
    Building2,
    Orbit,
    Search,
    Trash2,
    Mail,
    Phone,
    MapPin,
    FileText,
    Eye,
    Settings
} from "lucide-react";
import bgWork from "../assets/work (21).jpg";

function MarineServer() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedLetter, setSelectedLetter] = useState(null);

    const [shipSupply, setShipSupply] = useState([]);
    const [shipHusbandry, setShipHusbandry] = useState([]);
    const [civilWork, setCivilWork] = useState([]);
    const [offshoreWork, setOffshoreWork] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [supply, husbandry, civil, offshore] = await Promise.all([
                axios.get("http://localhost:3001/shipSupply"),
                axios.get("http://localhost:3001/ShipHusbandry"),
                axios.get("http://localhost:3001/CivilWork"),
                axios.get("http://localhost:3001/OffshoreWork")
            ]);
            setShipSupply(supply.data);
            setShipHusbandry(husbandry.data);
            setCivilWork(civil.data);
            setOffshoreWork(offshore.data);
        } catch (err) {
            console.error("Error fetching marine services data", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (collection, id) => {
        if (!window.confirm("Delete this service record?")) return;
        try {
            await axios.delete(`http://localhost:3001/${collection}/${id}`);
            fetchAllData();
        } catch (err) {
            console.error("Delete error", err);
        }
    };

    const ServiceTable = ({ title, data, icon: Icon, collection, color }) => {
        const filtered = data.filter(item =>
            item.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
                        <Icon className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-white font-serif">{title}</h2>
                    <div className="h-[2px] flex-grow bg-white/10 ml-4"></div>
                    <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-cyan-200 text-sm">
                        {filtered.length} Records
                    </span>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="p-5 text-slate-400 font-medium text-xs uppercase tracking-widest">Client / Company</th>
                                    <th className="p-5 text-slate-400 font-medium text-xs uppercase tracking-widest">Vessel Details</th>
                                    <th className="p-5 text-slate-400 font-medium text-xs uppercase tracking-widest">Contact</th>
                                    <th className="p-5 text-slate-400 font-medium text-xs uppercase tracking-widest">Location</th>
                                    <th className="p-5 text-slate-400 font-medium text-xs uppercase tracking-widest">Docs</th>
                                    <th className="p-5 text-slate-400 font-medium text-xs uppercase tracking-widest">Service Date</th>
                                    <th className="p-5 text-slate-400 font-medium text-xs uppercase tracking-widest">Letter</th>
                                    <th className="p-5 text-slate-400 font-medium text-xs uppercase tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-5">
                                            <p className="text-white font-bold">{item.name}</p>
                                            <p className="text-cyan-400/70 text-sm">{item.companyName}</p>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Anchor size={14} className="text-slate-500" />
                                                <span className="font-mono text-sm">IMO: {item.IMO}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">{item.services}</p>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col gap-1 text-sm text-slate-400">
                                                <span className="flex items-center gap-2"><Phone size={12} /> {item.phone}</span>
                                                <span className="flex items-center gap-2 text-xs truncate max-w-[150px]"><Mail size={12} /> {item.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            {item.location ? (() => {
                                                // Detect raw coordinates: "lat, lng"
                                                const coordMatch = item.location.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
                                                const mapsUrl = coordMatch
                                                    ? `https://www.google.com/maps?q=${coordMatch[1]},${coordMatch[3]}`
                                                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`;
                                                return (
                                                    <a
                                                        href={mapsUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title={item.location}
                                                        className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/25 hover:border-red-400/50 transition-all duration-200"
                                                    >
                                                        <MapPin size={13} className="text-red-400 group-hover:animate-bounce flex-shrink-0" />
                                                        <span className="text-red-300 group-hover:text-red-200 text-xs font-semibold whitespace-nowrap">
                                                            View on Map ↗
                                                        </span>
                                                    </a>
                                                );
                                            })() : (
                                                <span className="text-slate-600 text-xs italic">No location</span>
                                            )}
                                        </td>
                                        <td className="p-5">
                                            {item.passport && (
                                                <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-white/10 group/img cursor-pointer" onClick={() => setSelectedImage(item.passport)}>
                                                    <img src={item.passport} alt="Passport" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                                        <Eye className="text-white w-4 h-4" />
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-5 text-slate-400 text-sm">
                                            {item.date}
                                        </td>
                                        <td className="p-5">
                                            <button
                                                onClick={() => setSelectedLetter(item.supplyLitter)}
                                                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                                            >
                                                <FileText size={16} />
                                                View
                                            </button>
                                        </td>
                                        <td className="p-5 text-center">
                                            <button
                                                onClick={() => handleDelete(collection, item.id)}
                                                className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center mx-auto"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length === 0 && (
                        <div className="p-12 text-center text-slate-500 underline decoration-slate-800">No records found.</div>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen relative font-helvetica bg-[#0a1118]">
            {/* Heavy Industrial Background */}
            <div className="fixed inset-0 z-0">
                <img src={bgWork} className="w-full h-full object-cover opacity-20 grayscale brightness-50" alt="Work background" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1118]/90 via-transparent to-[#0a1118]"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-12 max-w-[1700px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16"
                >
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter uppercase italic flex items-center gap-5">
                            <Settings className="w-12 h-12 text-blue-500 animate-spin-slow" />
                            Marine Ops Center
                        </h1>
                        <p className="text-slate-500 text-xl font-medium">Global Logistics & Field Services Management</p>
                    </div>

                    <div className="relative group w-full md:w-[450px]">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={22} />
                        <input
                            type="text"
                            placeholder="Search services, companies, or IMO..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900/60 border-2 border-slate-800 text-white pl-14 pr-6 py-5 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-lg shadow-2xl"
                        />
                    </div>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-40">
                        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <ServiceTable
                            title="Ship Supply"
                            data={shipSupply}
                            icon={Ship}
                            collection="shipSupply"
                            color="from-blue-600 to-indigo-700"
                        />
                        <ServiceTable
                            title="Ship Husbandry"
                            data={shipHusbandry}
                            icon={Anchor}
                            collection="ShipHusbandry"
                            color="from-slate-700 to-slate-900"
                        />
                        <ServiceTable
                            title="Civil Marine Work"
                            data={civilWork}
                            icon={Building2}
                            collection="CivilWork"
                            color="from-amber-600 to-orange-700"
                        />
                        <ServiceTable
                            title="Offshore Operations"
                            data={offshoreWork}
                            icon={Orbit}
                            collection="OffshoreWork"
                            color="from-cyan-600 to-blue-800"
                        />
                    </>
                )}
            </div>

            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
            {selectedLetter && <TextModal text={selectedLetter} onClose={() => setSelectedLetter(null)} />}
        </div>
    );
}

export default MarineServer;