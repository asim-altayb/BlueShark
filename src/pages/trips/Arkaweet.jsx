
import { Routes, Route } from 'react-router-dom';
import sanga3 from "../../assets/camb2.jpg";
import { useState } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useTranslation } from "react-i18next";

import camb3 from "../../assets/camb (13).jpg"

import camb5 from "../../assets/camb (15).jpg"

import faja from "../../assets/campland (2).jpg"
import faja2 from "../../assets/campland (3).jpg"
import faja3 from "../../assets/campland (4).jpg"
import salada from "../../assets/campland (1).jpg"
import salada2 from "../../assets/campland (5).jpg"
import salada3 from "../../assets/campland (6).jpg"
import salada4 from "../../assets/campland (7).jpg"
import masharf from "../../assets/masharf (1).jpg"
import masharf1 from "../../assets/masharf (2).jpg"
import masharf2 from "../../assets/masharf (3).jpg"
import masharf3 from "../../assets/masharf (4).jpg"

import aroos from "../../assets/newaros (1).jpg"
import aroos1 from "../../assets/newaros (2).jpg"
import aroos2 from "../../assets/newaros (3).jpg"
import aroos3 from "../../assets/newaros (4).jpg"
import aroos4 from "../../assets/newaros (5).jpg"
import aroos5 from "../../assets/newaros (6).jpg"
import aroos6 from "../../assets/newaros (7).jpg"
import aroos7 from "../../assets/newaros (8).jpg"


import mgool from "../../assets/aroos (5).jpg"
import mgool1 from "../../assets/aroos (6).jpg"
import mgool2 from "../../assets/aroos (7).jpg"
import mgool3 from "../../assets/aroos (8).jpg"
import mgool4 from "../../assets/aroos (9).jpg"
import arkweet from "../../assets/arkweet (11).jpg"
import arkweet2 from "../../assets/arkweet (12).jpg"
import arkweet3 from "../../assets/arkweet (14).jpg"
import arkweet4 from "../../assets/arkweet (16).jpg"
import arkweet5 from "../../assets/arkweet (19).jpg"
import arkweet6 from "../../assets/arkweet (3).jpg"

import darah from "../../assets/darah (1).jpg"
import darah1 from "../../assets/darah (2).jpg"

import darah3 from "../../assets/darah (4).jpg"
import darah4 from "../../assets/darah (13).jpg"

import darah6 from "../../assets/darah (15).jpg"
import darah7 from "../../assets/darah (16).jpg"


import { useEffect } from 'react';

import { compressImage } from "../../utils/compressImage";

export default function Arkaweet() {

  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();
  const images6 = [arkweet3,
    arkweet2,
    arkweet6,
    arkweet4,
    arkweet5,
    arkweet];
  const images = [faja, faja2, faja3];
  const images2 = [salada, salada2, salada3, salada4, camb3, camb5];
  const images3 = [masharf, masharf2, masharf1, masharf3];
  const images4 = [aroos,
    aroos1,
    aroos2,
    aroos3, aroos4,
    aroos5,
    aroos6,
    aroos7
  ];

  const images5 = [mgool,
    mgool1,
    mgool2,
    mgool3,
    mgool4];
  const images7 = [darah,
    darah1,

    darah3,
    darah4,

    darah6,
    darah7];

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstname: " ",
    lastname: " ",
    people: " ",
    phone: " ",
    date: " ",
    passport: null,
    trip: ""

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

    if (!formData.firstname.trim() || !formData.trip.trim() || !formData.people.trim() || !formData.phone.trim()
      || !formData.date.trim() || !formData.passport) {
      alert("فضلاً املئي املاء كل الحقول");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key])
    }

    try {
      await axios.post('http://localhost:3001/cambing', formData);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-sky-100 overflow-hidden text-slate-700 font-sans">

      {/* Hero Section */}
      <div className="relative min-h-screen w-full pt-32 pb-20">
        <img src={sanga3} className="absolute inset-0 w-full h-full object-cover" alt="Hero Background" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-amber-900/40 backdrop-blur-[2px]"></div>

        <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center p-4 max-w-7xl mx-auto gap-10">

          {/* Hero Text */}
          <div data-aos="fade-right" className="text-center md:text-start md:w-1/2 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md font-serif">
              {t("hero3")}
            </h1>
            <h3 className="text-xl md:text-2xl text-amber-100 font-medium max-w-lg">
              {t("hero2")}
            </h3>
            <div className="h-1 w-24 bg-amber-500 rounded-full mx-auto md:mx-0 mt-4"></div>
          </div>

          {/* Booking Form - Glassmorphism Desert Style */}
          <div data-aos="fade-left" className="md:w-1/2 w-full max-w-md">
            <form onSubmit={handleSubmit} dir={i18n.language === "ar" ? "rtl" : "ltr"}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-[80px] opacity-20 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-[80px] opacity-20 -z-10"></div>

              {price.filter((el) => el.id === "3").map((item) => (
                <div key={item.id} className="space-y-5">
                  <div className="text-center border-b border-white/10 pb-4 mb-4">
                    <h2 className="text-2xl font-serif font-bold text-white">{t("form")}</h2>
                    <p className="text-amber-300 text-xl font-bold mt-1">SD {item.price} k</p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-amber-50 mb-1">{t("name")}</label>
                      <input onChange={handleChange} type='text' value={formData.firstname} name="firstname"
                        className="w-full bg-white/80 border-0 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-400 transition-all hover:bg-white"
                        placeholder={t("name")} />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-amber-50 mb-1">{t("phone")}</label>
                      <input onChange={handleChange} type="tel" value={formData.phone} name="phone"
                        className="w-full bg-white/80 border-0 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-400 transition-all hover:bg-white"
                        placeholder={t("phone")} />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-amber-50 mb-1">{t("date3")}</label>
                      <input onChange={handleChange} type='date' value={formData.date} name="date"
                        className="w-full bg-white/80 border-0 rounded-xl px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-amber-400 transition-all hover:bg-white" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* People */}
                      <div>
                        <label className="block text-sm font-medium text-amber-50 mb-1">{t("people")}</label>
                        <select value={formData.people} onChange={handleChange} name="people"
                          className="w-full bg-white/80 border-0 rounded-xl px-3 py-2.5 text-gray-800 focus:ring-2 focus:ring-amber-400 transition-all hover:bg-white">
                          <option value="">{t("people")}</option>
                          <option value="10 - 20">10 - 20</option>
                          <option value="20 - 50">20 - 50</option>
                        </select>
                      </div>

                      {/* Trip */}
                      <div>
                        <label className="block text-sm font-medium text-amber-50 mb-1">{t("trips")}</label>
                        <select value={formData.trip} onChange={handleChange} name="trip"
                          className="w-full bg-white/80 border-0 rounded-xl px-3 py-2.5 text-gray-800 focus:ring-2 focus:ring-amber-400 transition-all hover:bg-white">
                          <option value="">{t("cambing")}</option>
                          <option value="Aroos">{t("aroos")}</option>
                          <option value="Arkweet">{t("arkweet")}</option>
                          <option value="Faja Island">{t("faja")}</option>
                          <option value="Masharef">{t("masharf")}</option>
                          <option value="Mohamed Gool">{t("gool")}</option>
                          <option value="Salada">{t("salada")}</option>
                          <option value="Darah">{t("durah")}</option>
                        </select>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-amber-50 mb-1">{t("photo")}</label>
                      <div className="relative group">
                        <input type="file" name="passport" onChange={handleChange} accept='image/*' className="hidden" id="file-upload" />
                        <label htmlFor="file-upload" className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-white/10 transition-all">
                          <div className="text-center text-white text-sm">
                            {preview ? "Image Selected" : "Upload Passport/ID"}
                          </div>
                        </label>
                        {preview && (
                          <div className="absolute top-0 right-0 h-full w-12 p-1">
                            <img src={preview} alt="preview" className="h-full w-full object-cover rounded-lg border border-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    {t("send")}
                  </button>
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>

      {/* Content Wrapper for alternating sections */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">

        {/* Section 1: Faja (Sea Theme) */}
        <section className="group">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 backdrop-blur-sm bg-white/60 rounded-[3rem] p-6 shadow-xl border border-sky-100/50 hover:shadow-2xl transition-all duration-500">
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-4 px-4">
              <div className="inline-block px-4 py-1.5 bg-sky-100 text-sky-800 rounded-full text-sm font-semibold mb-2">Sea Adventure</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-sky-900">{t("faja")}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t("faja-story")}</p>
            </div>
            <div className="relative md:w-1/2 overflow-hidden rounded-3xl shadow-lg border-4 border-white transform md:rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img src={faja} alt="Faja" className="w-full h-[400px] object-cover hover:scale-110 transition-duration-700" />
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h3 className="text-center text-3xl font-serif text-sky-900 mb-8 opacity-80 decoration-wavy underline decoration-sky-300">{t("faja")} {t("Galary")}</h3>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
              {images.map((image, index) => (
                <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <img src={image} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" alt={`Faja ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Section 2: Salada (Desert Theme) */}
        <section className="group">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 backdrop-blur-sm bg-amber-50/60 rounded-[3rem] p-6 shadow-xl border border-amber-100/50 hover:shadow-2xl transition-all duration-500">
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-4 px-4">
              <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-2">Desert Camp</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">{t("salada")}</h2>
              <p className="text-lg text-amber-900/70 leading-relaxed">{t("salada-story")}</p>
            </div>
            <div className="relative md:w-1/2 overflow-hidden rounded-3xl shadow-lg border-4 border-amber-50 transform md:-rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img src={salada2} alt="Salada" className="w-full h-[400px] object-cover hover:scale-110 transition-duration-700" />
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h3 className="text-center text-3xl font-serif text-amber-900 mb-8 opacity-80 decoration-wavy underline decoration-amber-300">{t("salada")} {t("Galary")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images2.map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-md hover:shadow-amber-200/50 hover:shadow-xl transition-all duration-300 bg-white p-1">
                  <img src={image} className="w-full h-64 object-cover rounded-xl hover:opacity-90 transition-opacity" alt={`Salada ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Section 3: Durah (Sea Theme) */}
        <section className="group">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 backdrop-blur-sm bg-white/60 rounded-[3rem] p-6 shadow-xl border border-sky-100/50 hover:shadow-2xl transition-all duration-500">
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-4 px-4">
              <div className="inline-block px-4 py-1.5 bg-sky-100 text-sky-800 rounded-full text-sm font-semibold mb-2">Island Life</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-sky-900">{t("durah")}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t("durah-story")}</p>
            </div>
            <div className="relative md:w-1/2 overflow-hidden rounded-3xl shadow-lg border-4 border-white transform md:rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img src={darah} alt="Durah" className="w-full h-[400px] object-cover hover:scale-110 transition-duration-700" />
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h3 className="text-center text-3xl font-serif text-sky-900 mb-8 opacity-80 decoration-wavy underline decoration-sky-300">{t("durah")} {t("Galary")}</h3>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
              {images7.map((image, index) => (
                <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <img src={image} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" alt={`Durah ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Section 4: Arkweet (Mountain/Desert Theme) */}
        <section className="group">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 backdrop-blur-sm bg-stone-50/80 rounded-[3rem] p-6 shadow-xl border border-stone-200 hover:shadow-2xl transition-all duration-500">
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-4 px-4">
              <div className="inline-block px-4 py-1.5 bg-stone-200 text-stone-800 rounded-full text-sm font-semibold mb-2">Mountain Resort</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800">{t("arkweet")}</h2>
              <p className="text-lg text-stone-700 leading-relaxed">{t("arkweet-story")}</p>
            </div>
            <div className="relative md:w-1/2 overflow-hidden rounded-3xl shadow-lg border-4 border-stone-100 transform md:-rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img src={arkweet} alt="Arkweet" className="w-full h-[400px] object-cover hover:scale-110 transition-duration-700" />
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h3 className="text-center text-3xl font-serif text-stone-800 mb-8 opacity-80 decoration-wavy underline decoration-stone-400">{t("arkweet")} {t("Galary")}</h3>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
              {images6.map((image, index) => (
                <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200">
                  <img src={image} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" alt={`Arkweet ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Section 5: Aroos (Sea Theme) */}
        <section className="group">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 backdrop-blur-sm bg-cyan-50/50 rounded-[3rem] p-6 shadow-xl border border-cyan-100 hover:shadow-2xl transition-all duration-500">
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-4 px-4">
              <div className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold mb-2">Red Sea Jewel</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-cyan-900">{t("aroos")}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t("aroos-story")}</p>
            </div>
            <div className="relative md:w-1/2 overflow-hidden rounded-3xl shadow-lg border-4 border-white transform md:rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img src={aroos3} alt="Aroos" className="w-full h-[400px] object-cover hover:scale-110 transition-duration-700" />
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h3 className="text-center text-3xl font-serif text-cyan-900 mb-8 opacity-80 decoration-wavy underline decoration-cyan-300">{t("aroos")} {t("Galary")}</h3>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
              {images4.map((image, index) => (
                <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <img src={image} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" alt={`Aroos ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Section 6: Masharf (Desert/Mix Theme) */}
        <section className="group">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 backdrop-blur-sm bg-orange-50/60 rounded-[3rem] p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-500">
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-4 px-4">
              <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-2">Safari</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-orange-900">{t("masharf")}</h2>
              <p className="text-lg text-orange-900/80 leading-relaxed">{t("masharf-story")}</p>
            </div>
            <div className="relative md:w-1/2 overflow-hidden rounded-3xl shadow-lg border-4 border-orange-50 transform md:-rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img src={masharf} alt="Masharf" className="w-full h-[400px] object-cover hover:scale-110 transition-duration-700" />
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h3 className="text-center text-3xl font-serif text-orange-900 mb-8 opacity-80 decoration-wavy underline decoration-orange-300">{t("masharf")} {t("Galary")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images3.map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-md hover:shadow-orange-200/50 hover:shadow-xl transition-all duration-300 bg-white p-1">
                  <img src={image} className="w-full h-64 object-cover rounded-xl hover:opacity-90 transition-opacity" alt={`Masharf ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Section 7: Mohamed Gool (Sea Theme) */}
        <section className="group">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 backdrop-blur-sm bg-teal-50/60 rounded-[3rem] p-6 shadow-xl border border-teal-100 hover:shadow-2xl transition-all duration-500">
            <div data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"} className="flex-1 space-y-4 px-4">
              <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-2">Coastal Gem</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-teal-900">{t("gool")}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t("mgool-story")}</p>
            </div>
            <div className="relative md:w-1/2 overflow-hidden rounded-3xl shadow-lg border-4 border-white transform md:rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img src={mgool} alt="Gool" className="w-full h-[400px] object-cover hover:scale-110 transition-duration-700" />
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h3 className="text-center text-3xl font-serif text-teal-900 mb-8 opacity-80 decoration-wavy underline decoration-teal-300">{t("gool")} {t("Galary")}</h3>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
              {images5.map((image, index) => (
                <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <img src={image} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" alt={`Gool ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );

}
