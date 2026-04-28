import { useEffect, useState } from "react";
import axios from "axios";
import ImageModal from "./ImageModal";
import { motion, AnimatePresence } from "framer-motion";
import { Tent, Search, Trash2, Users, MapPin, Calendar, Phone, User, Eye, Sun } from "lucide-react";
import bgDesert from "../assets/camb.jpg";

function Cambing() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [booking, setBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageClick = (url) => setSelectedImage(url);

    const filteredTrips = booking.filter(b =>
        b.trip?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.firstname?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("http://localhost:3001/cambing");
            setBooking(res.data);
        } catch (err) {
            console.error("error", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this camping booking?")) return;
        try {
            await axios.delete(`http://localhost:3001/cambing/${id}`);
            fetchBooking();
        } catch (err) {
            console.error("error 2 ", err);
        }
    };

    return (
        <div className="min-h-screen relative font-helvetica pb-20 bg-[#1a1005]">
            {/* Warm Desert Background */}
            <div className="fixed inset-0 z-0">
                <img src={bgDesert} className="w-full h-full object-cover opacity-30 sepia-[0.3] brightness-75" alt="Desert background" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1005]/80 via-transparent to-[#1a1005]"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-12 max-w-[1500px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Sun className="text-amber-500 w-6 h-6 animate-pulse" />
                            <p className="text-amber-500/80 font-bold uppercase tracking-[0.3em] text-sm">Wilderness Admin</p>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white font-serif tracking-tight">
                            Camping Expeditions
                        </h2>
                    </div>

                    <div className="relative group w-full md:w-[400px]">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-900/50 group-focus-within:text-amber-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search desert trips or names..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-amber-950/20 border-2 border-amber-900/30 text-amber-50 pl-14 pr-6 py-4 rounded-3xl outline-none focus:border-amber-500/50 backdrop-blur-md transition-all text-lg"
                        />
                    </div>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-40">
                        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredTrips.map((book, index) => (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-amber-950/10 backdrop-blur-xl border border-amber-900/20 rounded-[40px] p-8 shadow-2xl hover:border-amber-500/30 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-950/50 group-hover:rotate-6 transition-transform">
                                            <Tent className="text-white w-8 h-8" />
                                        </div>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="text-amber-900/50 hover:text-red-500 transition-colors p-2"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                                                {book.firstname}
                                            </h3>
                                            <div className="flex items-center gap-2 text-amber-500/60 font-medium">
                                                <MapPin size={16} />
                                                <span>{book.trip}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-amber-900/20">
                                            <div>
                                                <p className="text-amber-100/30 text-xs uppercase font-bold tracking-widest mb-1">Participants</p>
                                                <div className="flex items-center gap-2 text-white">
                                                    <Users size={18} className="text-amber-500" />
                                                    <span className="text-xl font-bold">{book.people}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-amber-100/30 text-xs uppercase font-bold tracking-widest mb-1">Date</p>
                                                <div className="flex items-center gap-2 text-white font-semibold">
                                                    <Calendar size={18} className="text-amber-500" />
                                                    <span>{book.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-3 text-amber-50 text-sm bg-white/5 py-2 px-4 rounded-full border border-white/5">
                                                <Phone size={14} className="text-amber-500" />
                                                {book.phone}
                                            </div>

                                            {book.passport && (
                                                <div
                                                    onClick={() => handleImageClick(book.passport)}
                                                    className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/20 cursor-pointer hover:border-amber-500 transition-all"
                                                >
                                                    <img src={book.passport} alt="ID" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-amber-500/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <Eye className="text-white w-5 h-5" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {filteredTrips.length === 0 && !isLoading && (
                    <div className="py-40 text-center">
                        <p className="text-amber-950/50 text-2xl font-serif">The desert is quiet. No bookings found.</p>
                    </div>
                )}
            </div>

            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div>
    );
}

export default Cambing;