import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, KeyRound, ArrowLeft } from "lucide-react";
import bgImage from "../assets/shab (3).jpg";
import Aos from "aos";
import "aos/dist/aos.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Small delay for smooth feel
      await new Promise(resolve => setTimeout(resolve, 800));

      const res = await axios.get("http://localhost:3001/login");
      const users = res.data;
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        login({ username });
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    } catch (error) {
      console.error("Login error", error);
      setError("حدث خطأ أثناء محاولة تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-helvetica overflow-hidden bg-slate-900">
      {/* Background with Professional Gradient & Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          className="w-full h-full object-cover scale-110 blur-[1px] opacity-80"
          alt="Marine themed background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-[#001f3f]/60 to-cyan-900/70"></div>
        {/* Animated Water Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/water.png')] animate-pulse"></div>
        </div>
      </div>

      {/* Decorative Bubbles (Floating upward) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.4, 0],
              x: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
            className="absolute rounded-full bg-cyan-200/20 backdrop-blur-[1px]"
            style={{
              width: `${10 + Math.random() * 40}px`,
              height: `${10 + Math.random() * 40}px`,
              left: `${5 + Math.random() * 90}%`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[480px] mx-4"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[40px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden">

          {/* Top accent light glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

          <div className="text-center mb-10">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-xl shadow-cyan-500/20 mb-6"
            >
              <KeyRound className="text-white w-10 h-10" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-2 font-serif tracking-tight">
              تسجيل الدخول
            </h2>
            <p className="text-cyan-100/70 text-lg">بوابة المسؤول - BlueShark</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-2xl text-center text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-200/50 group-focus-within:text-cyan-300 transition-colors" size={20} />
              <input
                type="text"
                placeholder="اسم المستخدم"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-blue-950/40 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all duration-300 text-lg"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-200/50 group-focus-within:text-cyan-300 transition-colors" size={20} />
              <input
                type="password"
                placeholder="كلمة المرور"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-blue-950/40 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all duration-300 text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group mt-4 h-[60px] overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl transition-all duration-500 hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.5)] active:scale-[0.98] disabled:opacity-70"
            >
              <span className={`relative z-10 flex items-center justify-center gap-3 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                دخول
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </form>

          <div className="mt-10 flex items-center justify-between text-cyan-100/40 text-sm border-t border-white/5 pt-8">
            <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-2 group">
              <span className="group-hover:translate-x-1 transition-transform">رجوع للموقع</span>
            </Link>
            <span>&copy; {new Date().getFullYear()} BlueShark</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Wave SVG Decorator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-20">
        <svg className="relative block w-full h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-cyan-500"></path>
        </svg>
      </div>
    </div>
  );
}

export default AdminLogin;
