

import shell2 from "../assets/gido (14).jpg"
import shell3 from "../assets/gido (33).jpg"
import ship from "../assets/shipw.webp"
import ship2 from "../assets/shipw2.webp"
import ship3 from "../assets/shipw3.webp"
import ship4 from "../assets/shipw4.webp"
import Aos from 'aos';
import 'aos/dist/aos.css'
import sanga3 from "../assets/gido (1).jpg"
import camb from "../assets/camb.jpg"
import sanga from "../assets/sanga.webp"
import umbria from "../assets/omria.jpg"
import irg from "../assets/irg.webp"
import dive from "../assets/camb (1).jpg"
import shore from "../assets/shore.png"

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Slider from "react-slick";
function Home() {

  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [camb, sanga, umbria, irg, dive, shore,]

  return (
    <div className="bg-gradient-to-b from-sky-50 via-blue-50 to-cyan-50 min-h-screen">
      <style>
        {`
          @keyframes floatShip {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes waveMove {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
           .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.5);
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="w-full h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={shell3} className="w-full h-full object-cover scale-105 animate-[pulse_20s_infinite]" alt="Hero" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-cyan-800/40 mix-blend-multiply z-10"></div>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-4 max-w-4xl space-y-6">
            <h1 data-aos="zoom-out" className="text-white text-5xl md:text-8xl font-bold drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] tracking-wide">
              {t("main")}
            </h1>
            <div data-aos="fade-up" className="h-1 w-32 bg-cyan-400 mx-auto rounded-full"></div>
            <h3 data-aos="fade-up" data-aos-delay="200" className="text-cyan-50 text-xl md:text-3xl font-light tracking-wider drop-shadow-md">
              {t("main2")}
            </h3>
            <button data-aos="fade-up" data-aos-delay="400" className="mt-8 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-cyan-400/50 transform hover:-translate-y-1">
              Explore the Deep
            </button>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full z-20 leading-none">
          <svg className="block w-full h-16 md:h-32 text-sky-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* About Section - Sea Style */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto space-y-24">

        {/* Info Block 1 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
          <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 relative inline-block">
              Blue Shark
              <span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-200/50 -z-10 skew-x-12"></span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-cyan-400 pl-6">
              {t("info")}
            </p>
          </div>
          <div className='relative md:w-1/2 w-full'>
            <div className="absolute inset-0 bg-blue-400 rounded-3xl rotate-3 transform group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
            <img src={sanga3} data-aos="fade-right"
              className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover hover:scale-[1.02] transition-transform duration-500 border-4 border-white" alt="About Blue Shark" />
          </div>
        </div>

        {/* Info Block 2 */}
        <div className="flex flex-col md:flex-row items-center gap-12 group">
          <div data-aos="fade-right" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 relative inline-block">
              {t("time")}
              <span className="absolute bottom-0 right-0 w-full h-3 bg-amber-200/50 -z-10 -skew-x-12"></span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed border-r-4 border-amber-400 pr-6 text-right">
              {t("info2")}
            </p>
          </div>
          <div className='relative md:w-1/2 w-full'>
            <div className="absolute inset-0 bg-amber-400 rounded-3xl -rotate-3 transform group-hover:-rotate-6 transition-transform duration-500 opacity-20"></div>
            <img src={shell2} data-aos="fade-left" className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover hover:scale-[1.02] transition-transform duration-500 border-4 border-white" alt="Time Info" />
          </div>
        </div>

      </section>

      {/* Services Grid - Glass Cards */}
      <section className="relative py-24 bg-gradient-to-b from-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h1 data-aos="fade-up" className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">{t("marine")}</h1>
            <p className="text-cyan-200 text-xl max-w-2xl mx-auto">{t("marine2")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: ship, title: t("supply"), desc: t("supply2") },
              { img: ship2, title: t("offshore"), desc: t("offsore2") },
              { img: ship3, title: t("civil"), desc: t("civil2") },
              { img: ship4, title: t("husbandry"), desc: t("husbandry2") }
            ].map((item, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100} className="glass-card rounded-2xl p-4 hover:bg-white/10 transition-colors group">
                <div className="overflow-hidden rounded-xl mb-4 h-48 w-full">
                  <img src={item.img} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-cyan-300 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 data-aos="fade-down" className='text-4xl md:text-5xl font-bold text-blue-900'>Gallery</h1>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div data-aos="fade-up" className='columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'>
            {images.map((image, index) => (
              <div key={index} className="break-inside-avoid overflow-hidden rounded-2xl shadow-lg border border-white hover:shadow-2xl transition-shadow duration-300">
                <img src={image} className='w-full h-auto transform hover:scale-105 transition-transform duration-500' alt={`Gallery ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home;