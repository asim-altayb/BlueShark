import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Edit3, Save, X, Waves, TrendingUp, Info } from "lucide-react";
import bgSea from "../assets/shab (7).jpg";

function Prices() {
  const [prices, setPrices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = () => {
    setIsLoading(true);
    axios.get("http://localhost:3001/prices")
      .then((res) => {
        setPrices(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const savePrice = (id) => {
    const item = prices.find(p => p.id === id);
    axios.put(`http://localhost:3001/prices/${id}`, {
      ...item,
      price: newPrice
    })
      .then((res) => {
        setPrices(prices.map(item =>
          item.id === id ? { ...item, price: newPrice } : item
        ));
        setEditingId(null);
        setNewPrice("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen relative font-helvetica pb-20 bg-slate-900">
      {/* Dynamic Sea Background */}
      <div className="fixed inset-0 z-0">
        <img src={bgSea} className="w-full h-full object-cover opacity-20 blur-sm" alt="Sea background" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-blue-900/30 to-slate-900"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-12 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[25px] flex items-center justify-center shadow-xl shadow-cyan-500/20 rotate-3">
              <DollarSign className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Tariff Management</h1>
              <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                <Waves size={14} className="animate-pulse" />
                Global Trip Pricing
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-[30px] backdrop-blur-xl flex flex-col items-end">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Active Currencies</span>
            <span className="text-white font-black text-2xl">SD / Sudanese Pound</span>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-white/5 rounded-[40px] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {prices.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl hover:border-cyan-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <TrendingUp className="text-cyan-400 w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
                      {item.trip}
                    </h3>
                  </div>

                  <div className="bg-slate-900/40 rounded-3xl p-6 border border-white/5 mb-8">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="w-full bg-white/10 border border-cyan-500/50 text-white rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-cyan-500/20 text-xl font-bold font-mono"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">{item.price}</span>
                        <span className="text-cyan-400 font-bold">SD</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {editingId === item.id ? (
                      <>
                        <button
                          onClick={() => savePrice(item.id)}
                          className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/30"
                        >
                          <Save size={18} />
                          Update
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 bg-white/5 hover:bg-white/10 text-white py-3 rounded-2xl transition-all border border-white/10"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setNewPrice(item.price);
                        }}
                        className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-white/5 group/btn"
                      >
                        <Edit3 size={18} className="text-cyan-400 group-hover/btn:scale-125 transition-transform" />
                        Modify Price
                      </button>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-slate-500 text-xs">
                    <Info size={12} />
                    <span>Last updated recently</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prices;
