
import { Routes, Route } from 'react-router-dom';
import Sanganb from "./Sanganb"

import Umbria from './trips/Umbria';
import Romy from './trips/Romy';
import Irg from './trips/Irg';
import Arkaweet from './trips/Arkaweet';
import { Link } from 'react-router-dom';
import sanga3 from "../assets/sanga4.jpg"
import Aos from 'aos';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";

function LeisureServices() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

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



  const [idPhoto, setIdPhoto] = useState(null);
  const [idPhotoPreview, setIdPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    firstname: " ",
    phone: " ",
    kids: "",
    adults: "",
    departure: "",
    return: "",
    describe: "",
    idPhoto: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files[0]) {
      const file = files[0];
      setIdPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, idPhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname.trim() || !formData.return.trim() || !formData.departure.trim() || !formData.phone.trim() || !formData.kids.trim() || !formData.adults.trim()) {
      alert("فضلاً املئي املاء كل الحقول");
      return;
    }

    if (!formData.idPhoto) {
      alert("فضلاً قم برفع صورة الهوية");
      return;
    }

    try {
      await axios.post('http://localhost:3001/spicalTrip', formData);
      alert('تم الحجز بنجاح');
      setFormData({ firstname: " ", phone: " ", kids: "", adults: "", departure: "", return: "", describe: "", idPhoto: "" });
      setIdPhoto(null);
      setIdPhotoPreview(null);
    }
    catch (err) {
      console.log(err);
      alert("في مشكل ")
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-amber-50 font-sans overflow-hidden text-slate-700" data-aos="fade-up">

      {/* Routes for nested pages */}
      <Routes>
        <Route path="/leisure/sanganb" element={<Sanganb />} />
        <Route path="/leisure/trips/Umbria" element={<Umbria />} />
        <Route path="/leisure/trips/Romy" element={<Romy />} />
        <Route path="/leisure/trips/Irg" element={<Irg />} />
        <Route path="/leisure/trips/Arkaweet" element={<Arkaweet />} />
      </Routes>

      {/* Hero Section - Sea & Adventure */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <img src={sanga3} className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" alt="Leisure Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-black/30"></div>

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-4" data-aos="zoom-in">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-400 text-blue-900 text-sm font-bold tracking-widest uppercase mb-2">Discover the Unknown</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg font-serif">{t("hero")}</h1>
            <h3 className="text-xl md:text-2xl text-cyan-100 font-medium max-w-2xl mx-auto leading-relaxed">{t("hero2")}</h3>
            <div className="mt-8 flex justify-center gap-4">
              <i className="fas fa-water text-3xl text-cyan-300 animate-bounce"></i>
              <i className="fas fa-campground text-3xl text-amber-400 animate-bounce delay-100"></i>
              <i className="fas fa-hiking text-3xl text-green-400 animate-bounce delay-200"></i>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-none">
          <svg className="block w-full h-12 md:h-24 text-blue-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">

        {/* Special Request Form - Camping Diary Style */}
        <section className="relative">
          {/* Decorative Background for Form */}
          <div className="absolute md:-right-20 md:-top-20 -z-10 opacity-10 text-blue-900 text-[15rem]">
            <i className="fas fa-compass"></i>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Form Introductory Text */}
            <div className="md:w-1/3 space-y-6 pt-10" data-aos="fade-right">
              <h2 className="text-4xl font-bold text-blue-900 font-serif border-l-4 border-amber-500 pl-4">{t("dod")}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Ready for a custom adventure? Whether it's a private boat trip, a secluded beach camp, or a family diving expedition, tell us your dream plan.
              </p>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600"><i className="fas fa-ship"></i></div>
                  <span className="font-medium">Private Charters</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><i className="fas fa-fire"></i></div>
                  <span className="font-medium">Beach Bonfires & Camping</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><i className="fas fa-binoculars"></i></div>
                  <span className="font-medium">Guided Explorations</span>
                </li>
              </ul>
            </div>

            {/* The Form */}
            <form onSubmit={handleSubmit} data-aos="fade-left"
              className="flex-1 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-blue-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-500"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t("name")}</label>
                  <input onChange={handleChange} type='text' value={formData.firstname} name="firstname" autoComplete="given-name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all" placeholder="Your Full Name" />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t("phone")}</label>
                  <input onChange={handleChange} type="tel" value={formData.phone} name="phone" autoComplete="phone"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all" placeholder="+123 456 7890" />
                </div>

                {/* Dates */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t("date")}</label>
                  <input onChange={handleChange} type='date' value={formData.departure} name="departure"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t("date2")}</label>
                  <input onChange={handleChange} type="date" value={formData.return} name="return"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all" />
                </div>

                {/* Counts */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t("kids")}</label>
                  <select value={formData.kids} onChange={handleChange} name="kids"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all">
                    <option value="">Select Kids</option>
                    <option value="No kids">No kids</option>
                    <option value="One ">1 Kid</option>
                    <option value="Tow ">2 Kids</option>
                    <option value="more than 3">3+ Kids</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t("adults")}</label>
                  <select value={formData.adults} onChange={handleChange} name="adults"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all">
                    <option value="">Select Adults</option>
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="3 Adults">3 Adults</option>
                    <option value="+3 Adults">3+ Adults</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t("trip")}</label>
                  <textarea onChange={handleChange} name="describe" value={formData.describe} rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all resize-none" placeholder="Describe your ideal trip... e.g. 'Camping near the reef with BBQ'"></textarea>
                </div>

                {/* ID Photo Upload */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <i className="fas fa-id-card text-blue-500"></i> Upload ID Photo
                  </label>
                  <label
                    htmlFor="idPhotoInput"
                    className="flex flex-col items-center justify-center w-full border-2 border-dashed border-blue-200 rounded-xl px-4 py-6 bg-slate-50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    {idPhotoPreview ? (
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src={idPhotoPreview}
                          alt="ID Preview"
                          className="w-40 h-28 object-cover rounded-xl shadow-md border border-blue-200"
                        />
                        <span className="text-sm text-blue-600 font-semibold flex items-center gap-1">
                          <i className="fas fa-check-circle text-green-500"></i>
                          {idPhoto?.name}
                        </span>
                        <span className="text-xs text-slate-400">Click to change photo</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
                        <i className="fas fa-cloud-upload-alt text-4xl"></i>
                        <span className="font-semibold text-sm">Click to upload your ID photo</span>
                        <span className="text-xs">JPG, PNG or WEBP — Max 5MB</span>
                      </div>
                    )}
                    <input
                      id="idPhotoInput"
                      type="file"
                      name="idPhoto"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Submit */}
                <div className="md:col-span-2 mt-4">
                  <button type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex justify-center items-center gap-2">
                    <i className="fas fa-paper-plane"></i> {t("send")}
                  </button>
                </div>

              </div>
            </form>
          </div>
        </section>


        {/* Featured Trips Grid */}
        <section>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 font-serif">Explore Our Destinations</h2>
            <div className="h-1 w-24 bg-amber-400 mx-auto rounded-full"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">From the depths of sunken ships to the serene sands of island camps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {price.slice(0, 6).map((item) => (
              <div key={item.id} className="group relative bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up">

                {/* Card Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img src={item.photo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.trip} />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-blue-900 font-bold px-3 py-1 rounded-lg shadow-sm text-sm">
                    SD {item.price} K
                  </div>
                  <div className="absolute top-4 right-4 z-20 bg-amber-400/90 text-blue-900 font-bold px-3 py-1 rounded-full shadow-sm text-xs uppercase tracking-wide">
                    Available All Week
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="text-2xl font-bold font-serif">{item.trip}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3"> {t(item.describe)} </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex text-amber-400 text-sm gap-0.5">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
                    </div>
                    <Link to={item.path}>
                      <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors group-hover:underline decoration-2 underline-offset-4">
                        {t("dodo")} <i className="fas fa-arrow-right"></i>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Hover decorative border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-300 rounded-3xl pointer-events-none transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default LeisureServices;