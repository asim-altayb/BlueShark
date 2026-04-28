import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Trash2, Calendar, Star, User, Image as ImageIcon } from "lucide-react";
import bgSea from "../assets/shab (7).jpg";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/comments");
      setComments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا التعليق؟")) return;
    try {
      await axios.delete(`http://localhost:3001/comments/${id}`);
      setComments((p) => p.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("فشل الحذف");
    }
  };

  return (
    <div className="min-h-screen relative font-helvetica pb-20 bg-slate-900">
      {/* Serene Sea Background */}
      <div className="fixed inset-0 z-0">
        <img src={bgSea} className="w-full h-full object-cover opacity-20 blur-md" alt="Sea background" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-blue-900/40 to-slate-900"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-12 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif flex items-center gap-4">
              <MessageCircle className="text-cyan-400 w-10 h-10" />
              تعليقات المستخدمين
            </h2>
            <p className="text-cyan-100/60 text-lg">إدارة وتعديل آراء العملاء حول خدمات BlueShark</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-3 rounded-2xl backdrop-blur-md">
            <span className="text-cyan-400 font-bold text-xl">{comments.length} تعليق</span>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {comments.map((c, index) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[35px] hover:border-cyan-500/30 transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <MessageCircle size={100} />
                  </div>

                  <div className="w-full md:w-32 flex-shrink-0 flex md:flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-[30px] overflow-hidden border-2 border-white/10 shadow-xl">
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <User className="text-slate-500" size={30} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                      <Star className="text-yellow-500 fill-yellow-500" size={14} />
                      <span className="text-yellow-500 font-bold">{c.rating}</span>
                    </div>
                  </div>

                  <div className="flex-1 text-right" dir="rtl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1">{c.name}</h4>
                        <div className="flex items-center gap-2 text-cyan-200/40 text-sm font-medium">
                          <Calendar size={14} />
                          {new Date(c.createdAt).toLocaleDateString('ar-EG', { dateStyle: 'long' })}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="mt-4 md:mt-0 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 text-sm self-end md:self-center"
                      >
                        <Trash2 size={16} />
                        حذف التعليق
                      </button>
                    </div>

                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative">
                      <div className="absolute -top-3 right-8 bg-slate-800 text-cyan-400 px-3 py-0.5 rounded-full text-xs border border-white/10">MESSAGE</div>
                      <p className="text-cyan-100/80 text-lg leading-relaxed">{c.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {comments.length === 0 && !isLoading && (
          <div className="py-40 text-center">
            <p className="text-cyan-200/20 text-3xl font-serif">لا يوجد تعليقات حتى الآن</p>
          </div>
        )}
      </div>
    </div>
  );
}
