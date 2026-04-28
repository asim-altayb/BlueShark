
import sanga3 from "../../assets/shab (2).jpg"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css'
import shab from "../../assets/shab (7).jpg"
import shab1 from "../../assets/shab (8).jpg"

import roomy from "../../assets/shab (2).jpg"
import roomy1 from "../../assets/shab (3).jpg"
import roomy2 from "../../assets/shab (4).jpg"
import roomy3 from "../../assets/shab (5).jpg"
import { useTranslation } from "react-i18next";
import { compressImage } from "../../utils/compressImage";

export default function Romy() {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });
  const images = [roomy2,
    roomy,
    roomy1, shab1,
    roomy3, shab,

  ];

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

  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstname: " ",

    people: " ",
    phone: " ",
    date: " ",
    passport: null,
    tribname: "Romy"

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
      await axios.post('http://localhost:3001/booking', formData, {});
      alert('تم الحجز بنجاح');
    }
    catch (err) {
      console.log(err);
      alert("في مشكل ")
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-violet-100 overflow-hidden font-sans text-slate-700">

      {/* Hero Section */}
      <div className="relative w-full min-h-screen">
        <img src={sanga3} className="absolute inset-0 w-full h-full object-cover" alt="Romy Hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>

        <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-20 pt-32 pb-12">

          {/* Hero Text */}
          <div data-aos="fade-right" className="lg:w-1/2 text-center lg:text-left text-white space-y-4 z-10 mb-8 lg:mb-0">
            <h1 className="text-5xl md:text-7xl font-bold drop-shadow-xl tracking-wide">{t("rumi")}</h1>
            <h3 className="text-xl md:text-2xl font-medium text-indigo-100/90 max-w-lg mx-auto lg:mx-0 border-l-4 border-pink-400 pl-4"> {t("hero2")}</h3>
          </div>

          {/* Booking Form */}
          <div data-aos="fade-left" className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">

            {/* Decorative Form Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-[80px] opacity-20 -z-10"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {price.filter((el) => el.id === "5").map((item) => (
                <div key={item.id} className="text-center border-b border-white/10 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-white mb-1">Book Shaab Rumi Trip</h2>
                  <span className="inline-block bg-indigo-600 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg border border-indigo-400">
                    SD {item.price} K / Person
                  </span>

                  <div className="mt-6 space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-medium text-indigo-50 mb-1">{t("name")}</label>
                      <input onChange={handleChange} type='text' value={formData.firstname} name="firstname" className="w-full bg-indigo-900/40 border border-indigo-400/30 rounded-lg px-4 py-2 text-white placeholder-indigo-300/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-50 mb-1">{t("phone")}</label>
                      <input onChange={handleChange} type="tel" value={formData.phone} name="phone" className="w-full bg-indigo-900/40 border border-indigo-400/30 rounded-lg px-4 py-2 text-white placeholder-indigo-300/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-indigo-50 mb-1">{t("date3")}</label>
                        <input onChange={handleChange} type='date' value={formData.date} name="date" className="w-full bg-indigo-900/40 border border-indigo-400/30 rounded-lg px-4 py-2 text-white placeholder-indigo-300/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-indigo-50 mb-1">{t("people")}</label>
                        <input onChange={handleChange} type="text" value={formData.people} name="people" className="w-full bg-indigo-900/40 border border-indigo-400/30 rounded-lg px-4 py-2 text-white placeholder-indigo-300/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-50 mb-1">{t("photo")}</label>
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-indigo-300/30 rounded-lg cursor-pointer hover:bg-indigo-900/30 transition-colors">
                        {preview ? (
                          <img src={preview} alt="Preview" className="h-20 w-auto rounded object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-2 pb-3">
                            <i className="fas fa-camera text-2xl text-indigo-200 mb-1"></i>
                            <p className="text-xs text-indigo-100">Upload Passport</p>
                          </div>
                        )}
                        <input type="file" name="passport" onChange={handleChange} accept='image/*' className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-xl p-8 md:p-12 overflow-hidden relative border border-indigo-100">

          {/* Decorative Background Elements */}
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Image */}
            <div className="md:w-1/2 relative group">
              <div className="absolute inset-0 bg-pink-400 rounded-3xl rotate-2 opacity-20 group-hover:rotate-4 transition-transform"></div>
              <img src={sanga3} data-aos="zoom-in" className="relative rounded-3xl shadow-lg w-full object-cover h-[400px] z-10 transform transition-transform group-hover:scale-[1.02]" alt="Romy Detail" />
            </div>

            {/* Text */}
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="md:w-1/2 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 relative inline-block">
                {t("rumi")}
                <span className="absolute bottom-1 left-0 w-full h-3 bg-pink-200 -z-10 opacity-60 skew-x-12"></span>
              </h2>
              <div className="text-lg text-slate-600 leading-relaxed font-medium">
                <p>{t("romy")}</p>
              </div>
              <div className="flex gap-4 justify-center md:justify-start pt-4">
                <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold border border-indigo-200">#SharkDiving</span>
                <span className="bg-pink-100 text-pink-800 px-4 py-1 rounded-full text-sm font-semibold border border-pink-200">#Adventure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="relative py-16 bg-gradient-to-t from-indigo-100/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-indigo-900 mb-2 font-serif">Deep Ocean Gallery</h2>
            <div className="w-24 h-1 bg-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6" data-aos="fade-up">
            {images.map((image, index) => (
              <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg group relative">
                <img src={image} className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${index}`} />
                <div className="absolute inset-0 bg-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white border border-white px-4 py-2 rounded-full backdrop-blur-sm">View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

}
