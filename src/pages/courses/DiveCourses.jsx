
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sanga3 from "../../assets/camb (4).jpg"
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import dive from "../../assets/gido (13).jpg"
import adult from "../../assets/gedo (10).jpg"
import kids from "../../assets/gedo (14).jpg"

import dive3 from "../../assets/gedo (12).jpg"

import dive5 from "../../assets/gido (1).jpg"
import dive6 from "../../assets/gido (10).jpg"

import { useTranslation } from "react-i18next";


function DiveCourses() {

  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });

  const images = [dive, kids, adult, dive3, dive5
    , dive6
  ];

  const [formData, setFormData] = useState({
    firstname: " ",
    phone: " ",
    age: "",
    stars: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname.trim() || !formData.phone.trim() || !formData.age.trim() || !formData.stars.trim()) {
      alert("فضلاً املئي املاء كل الحقول");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key])
    }

    try {
      await axios.post('http://localhost:3001/diveCourses', formData);
      alert('تم الحجز بنجاح');
    }
    catch (err) {
      console.log(err);
      alert("في مشكل ")
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img src={sanga3} className="w-full h-full object-cover" alt="Dive Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-slate-900/80 to-blue-900/60 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 pt-32 pb-12">

          {/* Text Content */}
          <div data-aos="fade-right" className="lg:w-1/2 text-center lg:text-left text-white" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-xl">
              {t("dive")}
            </h1>
            <h3 className="text-xl md:text-2xl font-light text-blue-100 max-w-lg mx-auto lg:mx-0">
              {t("go")}
            </h3>
            <div className="mt-8 hidden lg:block h-1 w-32 bg-cyan-500 rounded-full"></div>
          </div>

          {/* Registration Form */}
          <div className="lg:w-1/2 w-full max-w-md">
            <form onSubmit={handleSubmit} data-aos="fade-left"
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">

              {/* Decorative Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>

              <div className="relative z-10 space-y-6">
                <div className="text-center border-b border-white/10 pb-6 mb-6">
                  <h2 className="text-2xl font-bold tracking-wide">{t("dive2")}</h2>
                  <p className="text-blue-200 text-sm mt-1">Join the underwater adventure</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold text-blue-100 mb-1">{t("name")}</label>
                    <input onChange={handleChange} type='text' value={formData.firstname} id="first-name" name="firstname" autoComplete="given-name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-blue-100 mb-1">{t("phone")}</label>
                    <input onChange={handleChange} id="phone" type="tel" value={formData.phone} name="phone" autoComplete="tel"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-100 mb-1">{t("dive")}</label>
                    <select value={formData.stars} onChange={handleChange} name="stars"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none [&>option]:text-slate-900">
                      <option value="">{t("courseStars")}</option>
                      <option value="One Star">{t("oneStar")}</option>
                      <option value="Tow Stars">{t("twoStars")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-100 mb-1">{t("age")}</label>
                    <select value={formData.age} onChange={handleChange} name="age"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none [&>option]:text-slate-900">
                      <option value="">{t("age")}</option>
                      <option value="14 - 18">14 - 18</option>
                      <option value="18 - 25">18 - 25</option>
                      <option value="more than 25">more than 25</option>
                    </select>
                  </div>
                </div>

                <button type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-cyan-500/30 mt-4">
                  {t("send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 data-aos="fade-up" className='text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif'>{t("dgalary")}</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div data-aos="fade-up" className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {images.map((image, index) => (
              <div key={index} className="group overflow-hidden rounded-2xl shadow-lg border border-slate-200 bg-white">
                <img src={image} className='w-full h-80 object-cover transform transition-transform duration-700 ease-out group-hover:scale-110' alt={`Gallery ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
export default DiveCourses;