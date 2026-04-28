
import { Routes, Route } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'
import sanga3 from "../../assets/omria.jpg";
import omria2 from "../../assets/camb (8).jpg";
import dive from "../../assets/vedio.mp4"
import omria3 from "../../assets/omriacut.jpg"

import crack3 from "../../assets/crack (10).jpg"
import { compressImage } from "../../utils/compressImage";
import crack4 from "../../assets/crack (2).jpg"
import crack5 from "../../assets/crack (3).jpg"
import crack6 from "../../assets/crack (4).jpg"
import crack7 from "../../assets/crack (5).jpg"
import crack8 from "../../assets/crack (6).jpg"
import crack9 from "../../assets/crack (7).jpg"
import crack10 from "../../assets/crack (9).jpg"
import crack11 from "../../assets/crack (8).jpg"
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';


export default function Umbria() {
  const { t, i18n } = useTranslation();
  const images = [sanga3, omria2, omria3, crack3, crack4, crack5, crack6, crack7,
    crack8, crack9, crack10, crack11];


  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstname: " ",
    people: " ",
    phone: " ",
    date: " ",
    passport: null,
    tribname: "Umbria"

  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "passport" && files && files.length > 0) {
      const file = files[0];
      if (file) {
        compressImage(file, (compressedBase64) => {
          setFormData({ ...formData, [name]: compressedBase64 });
          setPreview(compressedBase64);
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname.trim() || !formData.people.trim() || !formData.phone.trim()
      || !formData.date.trim() || !formData.passport) {
      alert("فضلاً املئي املاء كل الحقول");
      return;
    }

    const data = new FormData();
    for (let key in formData) {

      data.append(key, formData[key])

    }

    try {
      await axios.post('http://localhost:3001/booking', formData);
      alert('تم الحجز بنجاح');
    }
    catch (err) {
      console.log(err);
      alert("في مشكل ")
    }
  };

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-blue-900 to-[#0f172a] text-slate-200 font-sans overflow-hidden">
      <style>
        {`
          @keyframes floatBubble {
            0% { transform: translateY(100vh) scale(0); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
          }
          .bubble {
            position: absolute;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
            border-radius: 50%;
            z-index: 1;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
        `}
      </style>

      {/* Bubbles Animation Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              animation: `floatBubble ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20">
        {/* Background Video */}
        <video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover opacity-60 z-0'>
          <source src={dive}></source>
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/40 to-[#0f172a] mix-blend-multiply z-0"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">

          {/* Hero Text - Sunken Ship Vibe */}
          <div data-aos="fade-right" className="text-center md:text-start md:w-1/2 space-y-6">
            <div className="inline-block border-2 border-amber-600/50 rounded-lg px-3 py-1 bg-black/40 backdrop-blur-sm text-amber-500 font-serif tracking-widest text-sm mb-2">
              HISTORIC WRECK
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-100 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] font-serif">
              {t("umbriah")}
            </h1>
            <h3 className="text-xl md:text-2xl text-cyan-100/80 font-light max-w-lg leading-relaxed border-l-4 border-amber-700 pl-4">
              {t("hero2")}
            </h3>
          </div>


          {/* Booking Form - Rusty Metal / Glass style */}
          <div data-aos="fade-left" className="md:w-1/2 w-full max-w-md mx-auto relative">
            {/* Decorative Elements around form */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-amber-600/30 rounded-tl-3xl z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-cyan-500/30 rounded-br-3xl z-0"></div>

            <form onSubmit={handleSubmit}
              className="relative bg-[#0c1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10">

              {/* Form Header */}
              <div className="text-center mb-8 border-b border-white/5 pb-4">
                <h2 className="text-2xl font-serif text-amber-500 tracking-wider">EXPEDITION LOG</h2>
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-2"></div>
              </div>

              <div className="space-y-6">
                {price.filter((el) => el.id === "4").map((item) => (
                  <div key={item.id} className="space-y-5">
                    <div className="flex justify-between items-center bg-blue-950/50 p-3 rounded-lg border border-blue-900/50">
                      <span className="text-cyan-200/70 text-sm">Passage Fare</span>
                      <span className="text-2xl font-bold text-white font-mono">SD {item.price} K / Person</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-cyan-400 mb-1 uppercase tracking-wider">{t("name")}</label>
                        <input onChange={handleChange} type='text' value={formData.firstname} name="firstname"
                          className="w-full bg-black/40 border border-blue-900/50 rounded-lg px-4 py-2.5 text-cyan-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-blue-900/50" />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-cyan-400 mb-1 uppercase tracking-wider">{t("phone")}</label>
                        <input onChange={handleChange} type="tel" value={formData.phone} name="phone"
                          className="w-full bg-black/40 border border-blue-900/50 rounded-lg px-4 py-2.5 text-cyan-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-cyan-400 mb-1 uppercase tracking-wider">{t("date3")}</label>
                          <input onChange={handleChange} type='date' value={formData.date} name="date"
                            className="w-full bg-black/40 border border-blue-900/50 rounded-lg px-4 py-2.5 text-cyan-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-cyan-400 mb-1 uppercase tracking-wider">{t("people")}</label>
                          <input onChange={handleChange} type="text" value={formData.people} name="people"
                            className="w-full bg-black/40 border border-blue-900/50 rounded-lg px-4 py-2.5 text-cyan-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                        </div>
                      </div>

                      {/* File Upload Custom */}
                      <div>
                        <label className="block text-xs font-medium text-cyan-400 mb-1 uppercase tracking-wider">{t("photo")}</label>
                        <div className="relative group cursor-pointer border-2 border-dashed border-blue-900/50 rounded-lg hover:border-amber-500/50 transition-colors bg-black/20 p-4 text-center">
                          <input type="file" name="passport" onChange={handleChange} accept='image/*' className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <i className="fas fa-passport text-3xl text-blue-800 group-hover:text-amber-600 transition-colors"></i>
                            <span className="text-sm text-blue-400 group-hover:text-amber-100">{preview ? "Document Attached" : "Upload Passport"}</span>
                          </div>
                        </div>
                        {preview && (
                          <div className="mt-2 text-center">
                            <p className="text-xs text-green-400 mb-1">Preview:</p>
                            <img src={preview} alt="Passport Preview" className="h-16 w-auto mx-auto rounded border border-amber-500/50" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button type="submit"
                  className="w-full relative overflow-hidden group bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-amber-900/50 transition-all duration-300">
                  <span className="relative z-10 tracking-widest uppercase text-sm">Confirm Booking</span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content: Ship Story */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 py-20'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div data-aos="fade-up" className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-600 to-cyan-600 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition duration-500"></div>
            <img src={sanga3} className='relative w-full rounded-xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-grayscale duration-700' alt="Umbria Wreck" />
          </div>

          <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="space-y-8">
            <div>
              <h2 className="text-4xl font-serif font-bold text-amber-500 mb-6 flex items-center gap-4">
                <span className="w-12 h-1 bg-amber-700"></span>
                {t("umbriahead")}
              </h2>
              <p className='text-lg leading-relaxed text-slate-300 first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:text-cyan-600 first-letter:mr-3'>
                {t("umbriastory1")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-900 to-transparent hidden md:block"></div>

          <div data-aos="fade-up" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="bg-blue-950/30 p-8 rounded-2xl border border-blue-900/30 hover:bg-blue-950/50 transition-colors">
            <div className="mb-4 text-cyan-400 text-4xl opacity-50"><i className="fas fa-anchor"></i></div>
            <p className='text-lg leading-relaxed text-slate-300'>
              {t("umbriastory3")}
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="bg-blue-950/30 p-8 rounded-2xl border border-blue-900/30 hover:bg-blue-950/50 transition-colors">
            <div className="mb-4 text-amber-500 text-4xl opacity-50"><i className="fas fa-ship"></i></div>
            <p className='text-lg leading-relaxed text-slate-300'>
              {t("umbriastory2")}
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-[#0c1220] mb-24 group">
          <video data-aos="zoom-in" loop controls playsInline
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" ><source src={dive}></source> </video>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className='relative z-10 w-full bg-[#0c1220] py-20 border-t border-white/5'>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 data-aos="fade-up" className='font-serif text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-600 mb-4'>Captured History</h1>
            <p className="text-cyan-200/50 text-lg">Glimpses into the silent world of the Umbria</p>
          </div>

          <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6'>
            {images.map((image, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 50} className='break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer'>
                <div className="absolute inset-0 bg-cyan-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <span className="text-white text-3xl font-light">+</span>
                </div>
                <img src={image} className='w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale-[0.3] group-hover:grayscale-0' />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

}
