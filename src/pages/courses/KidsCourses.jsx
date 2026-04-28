
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sanga3 from "../../assets/camb (4).jpg"
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import kid3 from "../../assets/kid (1).jpg"
import kid4 from "../../assets/kid (2).jpg"
import kid5 from "../../assets/kid (3).jpg"

import kid from "../../assets/kids (1).jpg"
import kid2 from "../../assets/kids (3).jpg"


import { useTranslation } from "react-i18next";

function KidsCourses() {


  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();
  const images = [kid, kid2, kid3, kid4, kid5
  ];

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });

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
      await axios.post('http://localhost:3001/kidsCourses', formData);
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
          <img src={kid5} className="w-full h-full object-cover" alt="Kids Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 via-blue-900/80 to-cyan-800/60 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 pt-32 pb-12">

          {/* Text Content */}
          <div data-aos="fade-right" className="lg:w-1/2 text-center lg:text-left text-white" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-xl text-cyan-200">
              {t("kid")}
            </h1>
            <h3 className="text-xl md:text-2xl font-light text-white max-w-lg mx-auto lg:mx-0 bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block">
              {t("go")}
            </h3>
          </div>

          {/* Registration Form */}
          <div className="lg:w-1/2 w-full max-w-md">
            <form onSubmit={handleSubmit} data-aos="fade-left"
              className="bg-white/95 backdrop-blur-sm border-2 border-cyan-200 rounded-3xl shadow-2xl p-8 text-slate-800 relative overflow-hidden">

              <div className="relative z-10 space-y-6">
                <div className="text-center border-b border-cyan-100 pb-4 mb-4">
                  <h2 className="text-2xl font-bold tracking-wide text-cyan-700">{t("kidform")}</h2>
                  <p className="text-slate-500 text-sm mt-1">Start their ocean journey!</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-bold text-slate-700 mb-1">{t("name")}</label>
                    <input onChange={handleChange} type='text' value={formData.firstname} id="first-name" name="firstname" autoComplete="given-name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">{t("phone")}</label>
                    <input onChange={handleChange} id="phone" type="tel" value={formData.phone} name="phone" autoComplete="tel"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{t("dive")}</label>
                    <select value={formData.stars} onChange={handleChange} name="stars"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none">
                      <option value="">{t("courseStars")}</option>
                      <option value="One Star">{t("oneStar")}</option>
                      <option value="Tow Stars">{t("twoStars")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{t("age")}</label>
                    <select value={formData.age} onChange={handleChange} name="age"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none">
                      <option value="">{t("age")}</option>
                      <option value="5 - 10">5 - 10</option>
                      <option value="10 - 14">10 - 13</option>
                    </select>
                  </div>

                </div>

                <button type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-cyan-400/50 mt-4">
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
            <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div data-aos="fade-up" className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {images.map((image, index) => (
              <div key={index} className="group overflow-hidden rounded-3xl shadow-lg border-2 border-white bg-white">
                <img src={image} className='w-full h-80 object-cover transform transition-transform duration-700 ease-out group-hover:scale-110' alt={`Kids Gallery ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
export default KidsCourses;