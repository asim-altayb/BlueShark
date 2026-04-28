import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import { motion } from "framer-motion";
import { BarChart3, PieChart, Activity, TrendingUp, Ship, Users, GraduationCap, Settings } from "lucide-react";
import bgWork from "../assets/work (21).jpg";

function Reports() {
  const [booking, setBooking] = useState([]);
  const [serviceStats, setServiceStats] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookings, supply, husbandry, civil, offshore, kids, adults] = await Promise.all([
        axios.get("http://localhost:3001/booking"),
        axios.get("http://localhost:3001/shipSupply"),
        axios.get("http://localhost:3001/ShipHusbandry"),
        axios.get("http://localhost:3001/CivilWork"),
        axios.get("http://localhost:3001/OffshoreWork"),
        axios.get("http://localhost:3001/kidsCourses"),
        axios.get("http://localhost:3001/diveCourses")
      ]);

      setBooking(bookings.data);
      setServiceStats([
        { name: "Supply", count: supply.data.length },
        { name: "Husbandry", count: husbandry.data.length },
        { name: "Civil", count: civil.data.length },
        { name: "Offshore", count: offshore.data.length }
      ]);
      setCourseStats([
        { name: "Kids", count: kids.data.length },
        { name: "Adults", count: adults.data.length }
      ]);
    } catch (err) {
      console.error("Error fetching report data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const tripcount = {};
  booking.forEach((book) => {
    const name = book.tribname || "Unknown";
    tripcount[name] = (tripcount[name] || 0) + 1;
  });

  const tripChartData = Object.entries(tripcount).map(([name, count]) => ({ name, count }));

  const COLORS = ["#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef"];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[30px] flex items-center gap-5 group hover:border-blue-500/30 transition-all"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="text-white w-7 h-7" />
      </div>
      <div>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-white mt-1">{value}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative font-helvetica bg-[#0a1118] pb-20">
      {/* Analytics Background */}
      <div className="fixed inset-0 z-0">
        <img src={bgWork} className="w-full h-full object-cover opacity-10 grayscale" alt="Analytics background" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1118] via-transparent to-[#0a1118]"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
              <TrendingUp className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Operational Insights</h1>
              <p className="text-slate-500 font-medium">Real-time performance analytics & logistics distribution</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-500 font-bold text-sm tracking-widest">LIVE DATA FEED</span>
          </div>
        </motion.div>

        {/* Top Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Bookings" value={booking.length} icon={Ship} color="from-cyan-500 to-blue-600" />
          <StatCard title="Active Services" value={serviceStats.reduce((a, b) => a + b.count, 0)} icon={Settings} color="from-indigo-500 to-purple-600" />
          <StatCard title="Student Enroll" value={courseStats.reduce((a, b) => a + b.count, 0)} icon={GraduationCap} color="from-amber-500 to-orange-600" />
          <StatCard title="System Health" value="OPTIMAL" icon={Activity} color="from-emerald-500 to-teal-600" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Trips Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <Ship className="text-cyan-500" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Trip Distribution</h2>
            </div>
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tripChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", color: "#fff" }}
                    itemStyle={{ color: "#06b6d4" }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={40}>
                    {tripChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Service Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <Settings className="text-indigo-500" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Marine Services Activity</h2>
            </div>
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={serviceStats}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px" }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Diving Courses Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl xl:col-span-2"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <GraduationCap className="text-amber-500" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Academic Enrollment Distribution</h2>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseStats} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#fff" fontSize={14} tickLine={false} axisLine={false} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                  <Bar dataKey="count" radius={[0, 15, 15, 0]} barSize={50}>
                    {courseStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#f59e0b" : "#f97316"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Reports;