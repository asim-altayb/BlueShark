import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Search, Trash2, Phone, User, Calendar, Star, Sparkles, Sun } from "lucide-react";
import bgDesert from "../assets/camb.jpg";

function Course() {
    const [searchTerm, setSearchTerm] = useState("");
    const [kidsCourses, setKidsCourses] = useState([]);
    const [diveCourses, setDiveCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const fetchAllCourses = async () => {
        setIsLoading(true);
        try {
            const [kids, dive] = await Promise.all([
                axios.get("http://localhost:3001/kidsCourses"),
                axios.get("http://localhost:3001/diveCourses")
            ]);
            setKidsCourses(kids.data);
            setDiveCourses(dive.data);
        } catch (err) {
            console.error("Error fetching courses", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (collection, id) => {
        if (!window.confirm("Delete this student record?")) return;
        try {
            await axios.delete(`http://localhost:3001/${collection}/${id}`);
            fetchAllCourses();
        } catch (err) {
            console.error("Delete error", err);
        }
    };

    const getStarCount = (stars) => {
        if (!stars) return 0;
        if (typeof stars === 'number') return stars;
        const s = String(stars).toLowerCase();
        if (s.includes("one")) return 1;
        if (s.includes("two") || s.includes("tow")) return 2;
        if (s.includes("three")) return 3;
        if (s.includes("four")) return 4;
        if (s.includes("five")) return 5;
        const parsed = parseInt(s);
        return isNaN(parsed) ? 0 : parsed;
    };

    const CourseTable = ({ title, data, collection, icon: Icon, color }) => {
        const filtered = data.filter(item =>
            item.firstname?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shadow-amber-950/20`}>
                            <Icon className="text-white w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-bold text-white font-serif">{title}</h2>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-2xl backdrop-blur-md">
                        <span className="text-amber-500 font-bold">{filtered.length} Students</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filtered.map((student, idx) => (
                            <motion.div
                                key={student.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[35px] hover:border-amber-500/30 transition-all group relative overflow-hidden"
                            >
                                {/* Decorative Sun Glow */}
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors"></div>

                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                        <User className="text-amber-500 w-5 h-5" />
                                    </div>
                                    <button
                                        onClick={() => handleDelete(collection, student.id)}
                                        className="text-white/20 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4">{student.firstname}</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-amber-100/60 text-sm">
                                        <Phone size={14} className="text-amber-500" />
                                        {student.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-amber-100/60 text-sm">
                                        <Calendar size={14} className="text-amber-500" />
                                        Age: {student.age}
                                    </div>
                                    <div className="flex items-center gap-3 text-amber-100/60 text-sm">
                                        <Star size={14} className="text-amber-500" />
                                        Stars: {student.stars}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex gap-1">
                                    {[...Array(getStarCount(student.stars))].map((_, i) => (
                                        <Sparkles key={i} size={12} className="text-amber-400" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen relative font-helvetica pb-20 bg-[#150f08]">
            {/* Desert Background */}
            <div className="fixed inset-0 z-0">
                <img src={bgDesert} className="w-full h-full object-cover opacity-20 blur-sm" alt="Desert background" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#150f08] via-transparent to-[#150f08]"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-12 max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[30px] bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-950/40">
                            <GraduationCap className="text-white w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black text-white font-serif tracking-tight">Academic Portal</h1>
                            <p className="text-amber-400 font-medium tracking-[0.2em] flex items-center gap-2">
                                <Sun size={14} className="animate-spin-slow" />
                                TRAINING & CERTIFICATIONS
                            </p>
                        </div>
                    </div>

                    <div className="relative group w-full md:w-[450px]">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-900/50 group-focus-within:text-amber-500 transition-colors" size={22} />
                        <input
                            type="text"
                            placeholder="Search by student name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-amber-950/20 border border-amber-900/40 text-white pl-16 pr-8 py-5 rounded-3xl outline-none focus:border-amber-500/60 backdrop-blur-xl transition-all text-lg shadow-xl"
                        />
                    </div>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-40">
                        <div className="w-14 h-14 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <CourseTable
                            title="Kids Diving Courses"
                            data={kidsCourses}
                            collection="kidsCourses"
                            icon={Sun}
                            color="from-amber-400 to-yellow-600"
                        />
                        <CourseTable
                            title="Advanced Diving Courses"
                            data={diveCourses}
                            collection="diveCourses"
                            icon={Sparkles}
                            color="from-orange-500 to-red-600"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Course;