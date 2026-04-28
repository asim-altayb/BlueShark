
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dive from "../../assets/gido (13).jpg"
import dive16 from "../../assets/gido (20).jpg"
import kid4 from "../../assets/kid (1).jpg"
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";
import DiveCourses from './DiveCourses';
import KidsCourses from './KidsCourses';
import axios from 'axios';
import { useTranslation } from "react-i18next";


function Courses() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  });

  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();

  <Routes>
    <Route path="./DiveCourses" element={<DiveCourses />} />
    <Route path="./KidsCourses" element={<KidsCourses />} />

  </Routes>
  const [price, setPrice] = useState([]);
  useEffect(() => {
    async function getPrice() {
      try {
        const responce = await axios.get("http://localhost:3001/prices");
        setPrice(responce.data);
      }
      catch (error) {
        console.error(error)
      }
    } getPrice();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" data-aos="fade-up">
        <img src={dive} className="absolute inset-0 w-full h-full object-cover" alt="Diving Hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/50 to-slate-900/80"></div>

        <div className="relative z-10 text-center text-white p-6">
          <h2 data-aos="fade-down" className="text-xl md:text-2xl font-bold tracking-widest text-cyan-400 uppercase mb-2">{t("siteName")}</h2>
          <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
            {t("courses")}
          </h1>
          <div className="h-1 w-24 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 -mt-20 relative z-20 space-y-16">

        {/* Adult Dive Course Card */}
        <Link to={"./DiveCourses"} className="block group">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-900/20">
            <div className="flex flex-col md:flex-row-reverse">

              <div className='relative md:w-1/2 h-64 md:h-96 overflow-hidden'>
                <img src={dive16} data-aos="fade-left" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" alt="Adult Course" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  15+ Years
                </div>
              </div>

              {price.filter((el) => el.id === "8").map((item) => (
                <div key={item.id} data-aos="fade-right" dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  className="p-8 md:p-12 flex flex-col justify-center md:w-1/2 bg-gradient-to-br from-white to-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {t("course")}
                    </h2>
                    <span className="text-2xl md:text-3xl font-extrabold text-cyan-600">SD {item.price} K</span>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-8 text-lg font-medium">
                    {t("course1")}
                  </p>

                  <div className='flex flex-row w-full justify-between items-center border-t border-slate-200 pt-6 mt-auto'>
                    <h3 className="text-slate-600 font-bold flex items-center gap-2 text-lg">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      {t("course3")}
                    </h3>
                    <h3 className="text-slate-600 font-bold flex items-center gap-2 text-lg">
                      <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                      {t("course4")}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* Kids Course Card */}
        <Link to={"./KidsCourses"} className="block group">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-900/20">
            <div className="flex flex-col md:flex-row-reverse">

              <div className='relative md:w-1/2 h-64 md:h-96 overflow-hidden'>
                <img src={kid4} data-aos="fade-right" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" alt="Kids Course" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                <div className="absolute top-4 right-4 bg-cyan-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  5 - 15 Years
                </div>
              </div>

              {price.filter((el) => el.id === "7").map((item) => (
                <div key={item.id} data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  className="p-8 md:p-12 flex flex-col justify-center md:w-1/2 bg-gradient-to-br from-white to-cyan-50">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                      {t("kidcourse")}
                    </h2>
                    <span className="text-2xl md:text-3xl font-extrabold text-blue-600">SD {item.price} K</span>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-8 text-lg font-medium">
                    {t("kidcourse1")}
                  </p>

                  <div className='flex flex-row w-full justify-between items-center border-t border-slate-200 pt-6 mt-auto'>
                    <h3 className="text-slate-600 font-bold flex items-center gap-2 text-lg">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      {t("course3")}
                    </h3>
                    <h3 className="text-slate-600 font-bold flex items-center gap-2 text-lg">
                      <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                      {t("course4")}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Courses;