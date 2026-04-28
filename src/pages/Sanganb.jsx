
import { Routes, Route } from 'react-router-dom';
import sanga3 from "../assets/sanga5.jpg";
import { useState, useEffect } from 'react';
import axios from 'axios';
import shell from "../assets/sanga.webp"
import { compressImage } from "../utils/compressImage";
import shell2 from "../assets/sanga3.jpg"
import shell3 from "../assets/star.webp"
import shell4 from "../assets/dolphin2.avif"
import star from "../assets/sanga4.jpg"
import jelly from "../assets/jelly5.jpg"
import jelly2 from "../assets/seashell6.jpg"
import dive13 from "../assets/gido (17).jpg"
import dive14 from "../assets/gido (18).jpg"
import dive15 from "../assets/gido (19).jpg"
import dive16 from "../assets/gido (20).jpg"
import dive17 from "../assets/gido (21).jpg"
import dive19 from "../assets/gido (23).jpg"
import dive20 from "../assets/gido (24).jpg"
import dive21 from "../assets/gido (25).jpg"
import dive22 from "../assets/gido (26).jpg"
import dive23 from "../assets/gido (27).jpg"
import dive24 from "../assets/gido (28).jpg"
import dive25 from "../assets/gido (29).jpg"
import dive26 from "../assets/gido (30).jpg"
import dive27 from "../assets/gido (31).jpg"
import dive28 from "../assets/gido (32).jpg"
import dive29 from "../assets/gido (33).jpg"

import { useTranslation } from "react-i18next";
export default function Sanganb() {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();

  const images = [sanga3, shell, dive13, dive14, dive15, dive16, dive17
    , dive19, dive21, dive22, dive23, dive24, dive25, dive26, dive27
    , dive29,
  ];
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstname: " ",
    people: " ",
    phone: " ",
    date: " ",
    passport: null,
    tribname: "Sanganb"

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
      await axios.post('http://localhost:3001/booking', formData, { passport: "/sanga3.jpg" });
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-cyan-100 to-blue-200 overflow-hidden font-sans text-slate-700">

      {/* Hero Section */}
      <div className="relative w-full min-h-screen">
        <img src={sanga3} className="absolute inset-0 w-full h-full object-cover" alt="Sanganb Hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>

        <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-20 pt-32 pb-12">

          {/* Hero Text */}
          <div data-aos="fade-right" className="lg:w-1/2 text-center lg:text-left text-white space-y-4 z-10 mb-8 lg:mb-0">
            <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg tracking-wide">{t("sanganb")} </h1>
            <h3 className="text-xl md:text-2xl font-medium text-cyan-100/90 max-w-lg mx-auto lg:mx-0 border-l-4 border-amber-400 pl-4"> {t("hero2")}</h3>
          </div>

          {/* Booking Form */}
          <div data-aos="fade-left" className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">

            {/* Decorative Form Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-[80px] opacity-20 -z-10"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {price.filter((el) => el.id === "1").map((item) => (
                <div key={item.id} className="text-center border-b border-white/10 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-white mb-1">Book Your Trip</h2>
                  <span className="inline-block bg-amber-400 text-blue-900 font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                    SD {item.price} k / Person
                  </span>

                  <div className="mt-6 space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-medium text-cyan-50 mb-1">{t("name")}</label>
                      <input onChange={handleChange} type='text' value={formData.firstname} name="firstname" className="w-full bg-blue-900/40 border border-blue-400/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-cyan-50 mb-1">{t("phone")}</label>
                      <input onChange={handleChange} type="tel" value={formData.phone} name="phone" className="w-full bg-blue-900/40 border border-blue-400/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-cyan-50 mb-1">{t("date3")}</label>
                        <input onChange={handleChange} type='date' value={formData.date} name="date" className="w-full bg-blue-900/40 border border-blue-400/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cyan-50 mb-1">{t("people")}</label>
                        <input onChange={handleChange} type="text" value={formData.people} name="people" className="w-full bg-blue-900/40 border border-blue-400/30 rounded-lg px-4 py-2 text-white placeholder-blue-300/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-cyan-50 mb-1">{t("photo")}</label>
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-blue-300/30 rounded-lg cursor-pointer hover:bg-blue-900/30 transition-colors">
                        {preview ? (
                          <img src={preview} alt="Preview" className="h-20 w-auto rounded object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-2 pb-3">
                            <i className="fas fa-cloud-upload-alt text-2xl text-cyan-200 mb-1"></i>
                            <p className="text-xs text-cyan-100">Upload Passport</p>
                          </div>
                        )}
                        <input type="file" name="passport" onChange={handleChange} accept='image/*' className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              <button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Description Section with Shells */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 space-y-12">

        {/* Decorative Sea Creatures Top */}


        <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-xl p-8 md:p-12 overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Image */}
            <div className="md:w-1/2 relative group">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform"></div>
              <img src={sanga3} data-aos="zoom-in" className="relative rounded-3xl shadow-lg w-full object-cover h-[400px] z-10 transform transition-transform group-hover:scale-[1.02]" alt="Sanganb" />
            </div>

            {/* Text */}
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="md:w-1/2 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 relative inline-block">
                {t("sanganb")}
                <span className="absolute bottom-0 left-0 w-full h-3 bg-amber-300 -z-10 opacity-60 skew-x-12"></span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t("sanganbs")}
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">#Lighthouse</span>
                <span className="bg-cyan-100 text-cyan-800 px-4 py-1 rounded-full text-sm font-semibold">#CoralReefs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Sea Creatures Bottom */}

      </div>

      {/* Gallery Section */}
      <div className="relative py-16 bg-gradient-to-b from-transparent to-blue-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-blue-900 mb-2 font-serif">Deep Blue Gallery</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6" data-aos="fade-up">
            {images.map((image, index) => (
              <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg group">
                <img src={image} className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${index}`} />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

}
