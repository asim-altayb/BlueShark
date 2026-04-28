import { useEffect, useState } from "react";
import axios from "axios";
import TextModal from "./TextModal";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Search, Trash2, Calendar, Users, Phone, FileText, MapPin, Eye } from "lucide-react";
import bgSea from "../assets/shab (7).jpg";

function Special() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [booking, setBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleDescriptionClick = (text) => setSelectedDescription(text);

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("http://localhost:3001/spicalTrip");
            setBooking(res.data);
        } catch (err) {
            console.error("error", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this special request?")) return;
        try {
            await axios.delete(`http://localhost:3001/spicalTrip/${id}`);
            fetchBooking();
        } catch (err) {
            console.error("error 2 ", err);
        }
    };

    const filteredTrips = booking.filter(b =>
        b.firstname?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen relative font-helvetica pb-20 bg-slate-900">
            {/* Background with Theme */}
            <div className="fixed inset-0 z-0">
                <img src={bgSea} className="w-full h-full object-cover opacity-20 blur-sm" alt="Sea background" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-blue-900/30 to-slate-900"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-12 max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="text-cyan-400 fill-cyan-400 w-5 h-5 animate-pulse" />
                            <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Exclusive Services</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white font-serif italic tracking-tight">Special Expeditions</h2>
                    </div>

                    <div className="relative group w-full md:w-[400px]">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by client name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 text-white pl-14 pr-6 py-4 rounded-3xl outline-none focus:border-cyan-500/50 backdrop-blur-xl transition-all shadow-2xl"
                        />
                    </div>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-40">
                        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="p-6 text-cyan-400 font-bold uppercase tracking-widest text-xs">Client Profile</th>
                                        <th className="p-6 text-cyan-400 font-bold uppercase tracking-widest text-xs">Capacity</th>
                                        <th className="p-6 text-cyan-400 font-bold uppercase tracking-widest text-xs">Logistics</th>
                                        <th className="p-6 text-cyan-400 font-bold uppercase tracking-widest text-xs">Briefing</th>
                                        <th className="p-6 text-cyan-400 font-bold uppercase tracking-widest text-xs">ID Photo</th>
                                        <th className="p-6 text-cyan-400 font-bold uppercase tracking-widest text-xs">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <AnimatePresence>
                                        {filteredTrips.map((item, idx) => (
                                            <motion.tr
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-white/10 text-cyan-400 font-bold text-xl">
                                                            {item.firstname?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-bold text-lg">{item.firstname}</p>
                                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                                <Phone size={12} className="text-cyan-500" />
                                                                {item.phone}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-slate-300">
                                                            <Users size={14} className="text-cyan-500" />
                                                            <span className="font-bold">{item.adults} Adults</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                                            {item.kids} Children
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-cyan-100/80 text-sm">
                                                            <Calendar size={14} className="text-cyan-500" />
                                                            <span>Departure: <span className="text-white font-medium">{item.departure}</span></span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-cyan-100/80 text-sm">
                                                            <Calendar size={14} className="text-cyan-500" />
                                                            <span>Return: <span className="text-white font-medium">{item.return}</span></span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6 max-w-[300px]">
                                                    <div
                                                        onClick={() => handleDescriptionClick(item.describe)}
                                                        className="bg-white/5 p-4 rounded-2xl border border-white/5 cursor-pointer hover:border-cyan-500/30 transition-all group/desc"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <FileText size={14} className="text-cyan-500" />
                                                            <Eye size={14} className="text-slate-500 opacity-0 group-hover/desc:opacity-100 transition-opacity" />
                                                        </div>
                                                        <p className="text-slate-400 text-sm line-clamp-2 italic leading-relaxed">
                                                            "{item.describe}"
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-center">
                                                    {item.idPhoto ? (
                                                        <a href={item.idPhoto} target="_blank" rel="noreferrer" title="View full ID photo">
                                                            <img
                                                                src={item.idPhoto}
                                                                alt="ID"
                                                                className="w-16 h-12 object-cover rounded-xl border border-white/10 hover:scale-110 transition-transform shadow-lg cursor-pointer"
                                                            />
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-600 text-xs italic">No photo</span>
                                                    )}
                                                </td>
                                                <td className="p-6 text-center">
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-3 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>

            {selectedDescription && (
                <TextModal text={selectedDescription} onClose={() => setSelectedDescription(null)} />
            )}
        </div>
    );
}

export default Special;