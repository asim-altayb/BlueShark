import { useEffect, useState } from "react";
import axios from "axios";
import ImageModal from "./ImageModal";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Users, Calendar, Phone, MapPin, Eye } from "lucide-react";
import bgSea from "../assets/shab (7).jpg";

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [booking, setBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const filteredTrips = booking.filter(b =>
        b.tribname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPeople = filteredTrips.reduce((sum, book) => sum + Number(book.people || 0), 0);

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("http://localhost:3001/booking");
            setBooking(res.data);
        } catch (err) {
            console.error("error", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this trip record?")) return;
        try {
            await axios.delete(`http://localhost:3001/booking/${id}`);
            fetchBooking();
        } catch (err) {
            console.error("error 2 ", err);
        }
    };

    const handleImageClick = (url) => setSelectedImage(url);

    return (
        <div className="min-h-screen relative font-helvetica pb-20 bg-slate-900">
            {/* Background with Theme */}
            <div className="fixed inset-0 z-0">
                <img src={bgSea} className="w-full h-full object-cover opacity-30 blur-sm" alt="Sea background" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-blue-900/40 to-slate-900/80"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-12 max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif flex items-center gap-4">
                            <span className="bg-cyan-500 w-2 h-12 rounded-full"></span>
                            Manage Trips
                        </h2>
                        <p className="text-cyan-100/60 text-lg">Detailed overview of all underwater and coastal bookings</p>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-200/50 group-focus-within:text-cyan-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by trip or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 text-white pl-12 pr-6 py-4 rounded-2xl w-full md:w-[400px] backdrop-blur-md outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-lg"
                        />
                    </div>
                </motion.div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: "Total Bookings", value: filteredTrips.length, icon: Calendar, color: "from-blue-500 to-cyan-500" },
                        { label: "Total Participants", value: totalPeople, icon: Users, color: "from-emerald-500 to-teal-500" },
                        { label: "Trip Types", value: [...new Set(booking.map(b => b.tribname))].length, icon: MapPin, color: "from-purple-500 to-blue-500" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[24px] flex items-center gap-6"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="text-white w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-cyan-100/40 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Table Container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[30px] overflow-hidden shadow-2xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="p-6 text-cyan-200/60 font-medium uppercase tracking-wider text-xs">Trip Name</th>
                                    <th className="p-6 text-cyan-200/60 font-medium uppercase tracking-wider text-xs">Guest Details</th>
                                    <th className="p-6 text-cyan-200/60 font-medium uppercase tracking-wider text-xs">Contact Info</th>
                                    <th className="p-6 text-cyan-200/60 font-medium uppercase tracking-wider text-xs">Participants</th>
                                    <th className="p-6 text-cyan-200/60 font-medium uppercase tracking-wider text-xs">Documents</th>
                                    <th className="p-6 text-cyan-200/60 font-medium uppercase tracking-wider text-xs">Scheduled Date</th>
                                    <th className="p-6 text-cyan-200/60 font-medium uppercase tracking-wider text-xs">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence>
                                    {filteredTrips.map((book) => (
                                        <motion.tr
                                            key={book.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                                        >
                                            <td className="p-6">
                                                <span className="text-cyan-400 font-bold bg-cyan-400/10 px-3 py-1 rounded-full text-sm">
                                                    {book.tribname}
                                                </span>
                                            </td>
                                            <td className="p-6 text-white font-semibold">
                                                {book.firstname} {book.lastname}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-cyan-100/70">
                                                    <Phone size={14} />
                                                    {book.phone}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-white">
                                                    <Users size={16} className="text-cyan-400" />
                                                    <span className="font-bold">{book.people}</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {book.passport ? (
                                                    <div className="relative group/img cursor-pointer" onClick={() => handleImageClick(book.passport)}>
                                                        <img
                                                            src={book.passport}
                                                            alt="Passport"
                                                            className="w-16 h-12 object-cover rounded-lg border border-white/20 group-hover:border-cyan-400 transition-all"
                                                        />
                                                        <div className="absolute inset-0 bg-cyan-500/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                                                            <Eye className="text-white w-5 h-5" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-500 text-sm">No Document</span>
                                                )}
                                            </td>
                                            <td className="p-6 text-cyan-100/70">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    {book.date}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <button
                                                    onClick={() => handleDelete(book.id)}
                                                    className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center group"
                                                >
                                                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    {filteredTrips.length === 0 && (
                        <div className="p-20 text-center">
                            <p className="text-slate-500 text-lg">No bookings found matching your criteria.</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div>
    );
}

export default Dashboard;