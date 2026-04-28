
import react from "react";
import { useTranslation } from "react-i18next";
import { compressImage } from "../../utils/compressImage";
import sanga3 from "../../assets/marine (1).jpg";
import supply from "../../assets/work (16).jpg"
import supply1 from "../../assets/shipsuplly (19).jpg"
import supply2 from "../../assets/shipsuplly (18).jpg"
import supply3 from "../../assets/shipsuplly (1).jpg"
import supply4 from "../../assets/shipsuplly (8).jpg"
import supply15 from "../../assets/shipsuplly (9).jpg"
import supply5 from "../../assets/shipsuplly (20).jpg"
import supply6 from "../../assets/shipsuplly (2).jpg"
import supply7 from "../../assets/shipsuplly (3).jpg"
import supply8 from "../../assets/shipsuplly (4).jpg"
import supply9 from "../../assets/shipsuplly (5).jpg"
import supply10 from "../../assets/shipsuplly (6).jpg"
import supply11 from "../../assets/shipsuplly (7).jpg"
import supply12 from "../../assets/shipsuplly (22).jpg"
import supply13 from "../../assets/shipsuplly (23).jpg"
import supply14 from "../../assets/shipsuplly (24).jpg"



import { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
import axios from 'axios';
import LocationPicker from '../../components/LocationPicker';


function ShipsSupplay() {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });

  const images = [supply,
    supply1,
    supply2, sanga3, supply3,
    supply4,
    supply5,
    supply6,
    supply7,
    supply8,
    supply9,
    supply10,
    supply11,
    supply12,
    supply13,
    supply14,
    supply15
  ]

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: " ",
    companyName: " ",
    location: " ",
    phone: " ",
    date: " ",
    passport: null,
    supplyLitter: '',
    email: '',
    IMO: "",
    services: [],

  });

  const handleCheckbox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFormData({
        ...formData, services:
          [...formData.services, value]
      });
    } else {
      setFormData({
        ...formData, services:
          formData.services.filter((s) => s !== value)
      });
    }

  }

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

    if (!formData.name.trim() || !formData.companyName.trim() || !formData.location.trim() || !formData.supplyLitter.trim() || !formData.phone.trim()
      || !formData.date.trim() || !formData.passport || !formData.email.trim() || !formData.IMO.trim() || !formData.services.join().trim()) {
      alert("فضلاً املئي املاء كل الحقول");
      return;
    }

    const data = {
      ...formData, services: formData.services.join(" , ")
    };
    try {
      await axios.post('http://localhost:3001/shipSupply', formData);
      alert('تم الحجز بنجاح');
    }
    catch (err) {
      console.log(err);
      alert("في مشكلة")
    }
  };

  return (

    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">

      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <img src={sanga3} className="absolute inset-0 w-full h-full object-cover" alt="Ship Supply Hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-indigo-900/80 to-slate-900/60"></div>

        <div className="relative z-10 text-center text-white p-6 max-w-4xl mx-auto">
          <h2 data-aos="fade-down" className="text-xl md:text-2xl font-bold tracking-widest text-amber-500 uppercase mb-2">Blue Shark Marine</h2>
          <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl">
            Ship <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Supply</span>
          </h1>
          <div className="h-1 w-24 bg-amber-500 mx-auto rounded"></div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="relative -mt-20 z-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 py-6 px-8 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-500 rounded-sm"></span>
              Supply Order Form
            </h2>
            <p className="text-slate-400 mt-1 pl-5">Fill in the details to order ship supplies and provisions.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* Personal & Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div data-aos="fade-up">
                <label htmlFor="first-name" className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                <input onChange={handleChange} type='text' value={formData.name} id="first-name" name="name" autoComplete="given-name"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 transition-colors" />
              </div>

              <div data-aos="fade-up">
                <label htmlFor="last-name" className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                <input onChange={handleChange} id="last-name" type="text" value={formData.companyName} name="companyName" autoComplete="family-name"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 transition-colors" />
              </div>

              <div data-aos="fade-up">
                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input onChange={handleChange} id="phone" type="tel" value={formData.phone} name="phone" autoComplete="tel"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 transition-colors" />
              </div>

              <div data-aos="fade-up">
                <label htmlFor="imo" className="block text-sm font-bold text-slate-700 mb-2">IMO Number</label>
                <input onChange={handleChange} id="imo" type="text" value={formData.IMO} name="IMO"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 transition-colors" />
              </div>

              <div data-aos="fade-up">
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input onChange={handleChange} id="email" type="email" value={formData.email} name="email" autoComplete="email"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 transition-colors" />
              </div>

              <div data-aos="fade-up" className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                <LocationPicker
                  value={formData.location}
                  onChange={(addr) => setFormData({ ...formData, location: addr })}
                  focusColor="indigo"
                />
              </div>

              <div data-aos="fade-up" className="md:col-span-2">
                <label htmlFor="date" className="block text-sm font-bold text-slate-700 mb-2">Arrival Date</label>
                <input onChange={handleChange} id="date" type="date" value={formData.date} name="date" autoComplete="bday"
                  className="w-full md:w-1/2 bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 transition-colors" />
              </div>
            </div>

            {/* Service Selection */}
            <div data-aos="fade-up" className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <label className="block text-lg font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">Supply Categories</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Food & water", "Fuel/ Marine Diesel Oil", "Oil & lubricants",
                  "Spare parts", "Safty & PPE", "Technical crew for repair & maintenance",
                  "Cleaning tools", "Marine transport"
                ].map((service) => (
                  <label key={service} className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded hover:border-indigo-400 transition-colors cursor-pointer">
                    <input type="checkbox" onChange={handleCheckbox} value={service} className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
                    <span className="text-slate-700 font-medium text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Details Letter */}
            <div data-aos="fade-up">
              <label htmlFor="about" className="block text-sm font-bold text-slate-700 mb-2">Supply Letter / Details</label>
              <textarea onChange={handleChange} id="about" name="supplyLitter" value={formData.supplyLitter} rows="4"
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-3 transition-colors"
                placeholder="Please list the items you need..."></textarea>
            </div>

            {/* File Upload */}
            <div data-aos="fade-up">
              <label className="block text-sm font-bold text-slate-700 mb-2">ID Photo</label>
              <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-10 hover:bg-slate-50 transition-colors bg-white">
                <div className="text-center">
                  {!preview ? (
                    <>
                      <svg className="mx-auto h-12 w-12 text-slate-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                      </svg>

                      <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="passport" type="file" className="sr-only" onChange={handleChange} accept='image/*' />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  ) : (
                    <div className="relative group">
                      <img src={preview} alt="Passport Preview" className="mx-auto h-48 object-contain rounded-lg shadow-md" />
                      <button type="button" onClick={() => setPreview(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button type="submit" className="flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-8 py-3 text-base font-bold text-white shadow-lg hover:from-green-500 hover:to-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all transform hover:-translate-y-1">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-slate-900 mb-2 font-serif">Ship Supply Gallery</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div data-aos="fade-up" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {images.map((image, index) => (
              <div key={index} className="group overflow-hidden rounded-xl shadow-lg border border-slate-200 bg-white">
                <img src={image} className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110" alt={`Supply Item ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

}

export default ShipsSupplay;