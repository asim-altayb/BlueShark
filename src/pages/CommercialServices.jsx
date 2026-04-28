
import ShipsSupplay from "./marineServis/ShipsSuplly";
import ShipHusbandry from "./marineServis/ShipHusbandry";
import CivilWork from "./marineServis/CivilWokr";
import OffshoreWork from "./marineServis/OffshoreWork";

import supply from "../assets/marine (1).jpg"
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sanga3 from "../assets/gedo (8).jpg"
import hus from "../assets/gedo (8).jpg"
import civil from "../assets/civil2.webp"
import shore from "../assets/work (24).jpg"

import Aos from 'aos';
import 'aos/dist/aos.css'
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function CommercialServices() {

  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });
  <Routes>
    <Route path="./marineServis/ShipsSuplly" element={<ShipsSupplay />} />
    <Route path="./marineServis/ShipHusbandry" element={<ShipHusbandry />} />
    <Route path="./marineServis/CivilWork" element={<CivilWork />} />
    <Route path="./marineServis/OffshoreWork" element={<OffshoreWork />} />
  </Routes>

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full min-h-screen relative group overflow-hidden" >
        <div className="absolute inset-0 bg-slate-900/40 z-10 transition-colors duration-500 group-hover:bg-slate-900/20"></div>
        <img src={sanga3} className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 origin-center" alt="Commercial Hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900/60 to-transparent z-10"></div>

        <div className='absolute inset-0 flex items-center z-20'>
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="border-l-8 border-amber-500 pl-8 py-4 backdrop-blur-sm bg-slate-900/30 max-w-2xl rounded-r-xl">
              <span data-aos="fade-down" className="text-amber-400 font-bold tracking-[0.2em] uppercase text-sm mb-2 block">Marine Solutions</span>
              <h1 data-aos="fade-right" className="text-white text-5xl md:text-7xl font-bold mb-4 drop-shadow-xl">{t("main")}</h1>
              <p data-aos="fade-up" className="text-slate-200 text-xl font-light border-t border-slate-500/50 pt-4 mt-2 max-w-lg">
                {t("marine")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-30 pb-20 space-y-12">

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-12">

          {/* Card 1: Ships Supply */}
          <Link to={"./marineServis/ShipsSuplly"} className="block group">
            <div className="bg-white hover:bg-slate-50 transition-colors duration-300 rounded-lg shadow-xl border-l-8 border-blue-600 overflow-hidden group-hover:shadow-2xl group-hover:border-amber-500 relative">
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                  <div className="absolute top-0 left-0 bg-amber-500 text-slate-900 font-bold px-4 py-2 z-10 skew-x-[-20deg] -ml-4 pl-8 uppercase text-xs tracking-wider shadow-md">
                    Logistics & Supply
                  </div>
                  <img src={supply} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" alt="Supply" />
                  <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-8 flex flex-col justify-center relative">
                  {/* Watermark Icon */}
                  <i className="fas fa-boxes text-9xl text-slate-100 absolute right-4 top-1/2 -translate-y-1/2 -z-10 group-hover:scale-110 transition-transform duration-500"></i>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{t("supply")}</h2>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-mono border border-slate-200 px-2 py-1 rounded">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Operational
                    </div>
                  </div>

                  <div className="text-slate-600 mb-6 text-lg leading-relaxed">{t("sup")} <span className="font-semibold text-slate-800 block mt-1">{t("sup2")}</span></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-500">
                    {["Provision Supply", "Deck & Engine Stores", "Safety Equipment", "Fuel & Lubricants", "Custom Requests"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <i className="fas fa-check-square text-amber-500"></i> {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center text-blue-600 font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform">
                    View Service Details <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Ship Husbandry */}
          <Link to={"./marineServis/ShipHusbandry"} className="block group">
            <div className="bg-white hover:bg-slate-50 transition-colors duration-300 rounded-lg shadow-xl border-l-8 border-cyan-600 overflow-hidden group-hover:shadow-2xl group-hover:border-amber-500 relative">
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden md:order-2">
                  <div className="absolute top-0 right-0 bg-cyan-600 text-white font-bold px-4 py-2 z-10 skew-x-[20deg] -mr-4 pr-8 uppercase text-xs tracking-wider shadow-md">
                    Vessel Support
                  </div>
                  <img src={hus} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" alt="Husbandry" />
                  <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-8 flex flex-col justify-center relative md:order-1">
                  <i className="fas fa-anchor text-9xl text-slate-100 absolute left-4 top-1/2 -translate-y-1/2 -z-10 group-hover:scale-110 transition-transform duration-500"></i>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">{t("husbandry")}</h2>
                    <span className="text-slate-400 font-mono text-xs">REF: HUS-24</span>
                  </div>

                  <div className="text-slate-600 mb-6 text-lg leading-relaxed">{t("hus")} <span className="font-semibold text-slate-800 block mt-1">{t("hus2")}</span></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-500">
                    {["Hull Cleaning", "Underwater Inspection", "Vessel Maintenance", "Waste Disposal", "Bunker Coordination", "Crew Change"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <i className="fas fa-tools text-cyan-600"></i> {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center text-cyan-700 font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform">
                    View Service Details <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>


          {/* Card 3: Civil Work */}
          <Link to={"./marineServis/CivilWokr"} className="block group">
            <div className="bg-white hover:bg-slate-50 transition-colors duration-300 rounded-lg shadow-xl border-l-8 border-slate-600 overflow-hidden group-hover:shadow-2xl group-hover:border-amber-500 relative">
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                  <div className="absolute top-0 left-0 bg-slate-600 text-white font-bold px-4 py-2 z-10 skew-x-[-20deg] -ml-4 pl-8 uppercase text-xs tracking-wider shadow-md">
                    Construction
                  </div>
                  <img src={civil} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" alt="Civil Work" />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-8 flex flex-col justify-center relative">
                  <i className="fas fa-hard-hat text-9xl text-slate-100 absolute right-4 top-1/2 -translate-y-1/2 -z-10 group-hover:scale-110 transition-transform duration-500"></i>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-slate-800 group-hover:text-slate-600 transition-colors">{t("civil")}</h2>
                    <div className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase">Heavy Duty</div>
                  </div>

                  <div className="text-slate-600 mb-6 text-lg leading-relaxed">{t("civ")} <span className="font-semibold text-slate-800 block mt-1">{t("civ2")}</span></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-500">
                    {["Breakwaters & Seawalls", "Floating & Fixed Piers", "Slipways & Dry Docks", "Dredging & Reclamation", "Wharf Construction"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <i className="fas fa-layer-group text-slate-500"></i> {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center text-slate-700 font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform">
                    View Service Details <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 4: Offshore Work */}
          <Link to={"./marineServis/OffshoreWork"} className="block group">
            <div className="bg-white hover:bg-slate-50 transition-colors duration-300 rounded-lg shadow-xl border-l-8 border-teal-600 overflow-hidden group-hover:shadow-2xl group-hover:border-amber-500 relative">
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden md:order-2">
                  <div className="absolute top-0 right-0 bg-teal-600 text-white font-bold px-4 py-2 z-10 skew-x-[20deg] -mr-4 pr-8 uppercase text-xs tracking-wider shadow-md">
                    Deep Sea Ops
                  </div>
                  <img src={shore} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" alt="Offshore" />
                  <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-8 flex flex-col justify-center relative md:order-1">
                  <i className="fas fa-oil-well text-9xl text-slate-100 absolute left-4 top-1/2 -translate-y-1/2 -z-10 group-hover:scale-110 transition-transform duration-500"></i>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors">{t("offshore")}</h2>
                    <span className="text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded text-xs font-mono">ZONE 4</span>
                  </div>

                  <div className="text-slate-600 mb-6 text-lg leading-relaxed">{t("off")} <span className="font-semibold text-slate-800 block mt-1">{t("off2")}</span></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-500">
                    {["Offshore Construction", "Supply & Logistics", "Maintenance & Repairs", "Crew Transfer", "Diving & ROV Services"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <i className="fas fa-water text-teal-500"></i> {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center text-teal-700 font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform">
                    View Service Details <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommercialServices;