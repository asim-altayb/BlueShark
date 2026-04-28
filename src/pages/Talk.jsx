import React, { useState, useEffect } from "react";
import axios from "axios";
import Aos from 'aos';
import { Translation, useTranslation } from "react-i18next";

export default function Talk() {
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    message: "",
    imageFile: null,
    imagePreview: null,
  });
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (file) {
        setForm((p) => ({
          ...p,
          imageFile: file,
          imagePreview: URL.createObjectURL(file),
        }));
      }
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const resetForm = () => {

    if (form.imagePreview) URL.revokeObjectURL(form.imagePreview);
    setForm({ name: "", rating: 5, message: "", imageFile: null, imagePreview: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      alert("فضلاً املئي الاسم والتعليق");
      return;
    }

    setSending(true);
    try {

      let payload = {
        name: form.name.trim(),
        rating: Number(form.rating),
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
      };


      if (form.imageFile) {
        const toBase64 = (file) =>
          new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = () => res(reader.result);
            reader.onerror = (err) => rej(err);
            reader.readAsDataURL(file);
          });
        const b64 = await toBase64(form.imageFile);
        payload.image = b64;
      }


      await axios.post("http://localhost:3001/comments", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMsg("تم إرسال تعليقك بنجاح — شكراً ليك!");
      resetForm();

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      alert("حصل خطأ في الإرسال. حاولي بعد شوية.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-aos="fade-up" className="mx-auto rounded-3xl shadow-2xl p-8 md:w-[80%] w-full bg-gradient-to-br from-white to-blue-50 border border-blue-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-8 text-blue-900 font-serif flex items-center gap-3">
          <span className="text-4xl">💭</span> {t("comment")}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-2 ml-1">{t("name")}</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm"
                placeholder={t("name")}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-2 ml-1">{t("rating")}</label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm"
              >
                <option value={5}>⭐⭐⭐⭐⭐ — Excellent</option>
                <option value={4}>⭐⭐⭐⭐ — Very Good</option>
                <option value={3}>⭐⭐⭐ — Good</option>
                <option value={2}>⭐⭐ — Weak</option>
                <option value={1}>⭐ — Bad</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-800 mb-2 ml-1">{t("comment2")}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm resize-none"
              placeholder={t("comment2")}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-800 mb-2 ml-1">{t("photo (ghos)")}</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2">
                <span>📷</span> Upload Photo
                <input type="file" accept="image/*" name="image" onChange={handleChange} className="hidden" />
              </label>
              {form.imagePreview && (
                <div className="relative group">
                  <img src={form.imagePreview} alt="preview" className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-md" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              type="submit"
              disabled={sending}
              className="bg-gradient-to-r from-blue-500 to-sky-500 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {sending ? (
                <>⏳ Sending...</>
              ) : (
                <>🚀 Send Comment</>
              )}
            </button>

            {successMsg && (
              <div className="text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200 animate-fade-in flex items-center gap-2">
                ✅ {successMsg}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
