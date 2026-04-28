
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
function Contact() {
    const { i18n } = useTranslation();
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-sky-100 via-blue-100 to-cyan-50 pt-16 pb-24 font-sans overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900 to-transparent -z-10 opacity-80"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-400 rounded-full blur-[100px] opacity-30 -z-10"></div>
            <div className="absolute top-40 -left-20 w-60 h-60 bg-blue-600 rounded-full blur-[80px] opacity-20 -z-10"></div>

            <div className="max-w-6xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg tracking-wide">Contact Us</h1>
                    <p className="text-blue-100 text-xl font-light">Get in touch with the Blue Shark team</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Info Card */}
                    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}
                        className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-200 to-transparent opacity-50 rounded-bl-full -mr-8 -mt-8"></div>

                        <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-cyan-200 pb-4 inline-block">
                            Information
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 text-slate-700 hover:text-blue-700 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <i className="fas fa-map-marker-alt text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-blue-900 mb-1">Address</h3>
                                    <p className="leading-relaxed">Port Sudan, The Sea Street</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-slate-700 hover:text-blue-700 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <i className="fas fa-envelope text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-blue-900 mb-1">Email</h3>
                                    <p className="leading-relaxed break-all">bluesharkdivingsudan@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-slate-700 hover:text-blue-700 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-blue-900 mb-1">Phone</h3>
                                    <p className="leading-relaxed font-mono">+249 129102102</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Wave */}
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>
                    </div>

                    {/* Map Section */}
                    <div className="h-[400px] lg:h-full min-h-[400px] w-full bg-white p-2 rounded-3xl shadow-xl overflow-hidden relative border-4 border-white/50">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.990811251419!2d37.2354716!3d19.627690599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15d7553f3099b799%3A0x4bc21e53fe688aa5!2sBlue%20shark%20for%20marine%20services!5e0!3m2!1sen!2s!4v1770848401565!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-2xl"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* WhatsApp Button - Green Circle */}
            <a href="https://wa.me/+249129102102" target="_blank" rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 group">
                {/* Pulse Effect */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 group-hover:opacity-100"></div>

                {/* The Green Circle Container */}
                <div className="relative bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform transform group-hover:scale-110 border-4 border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">

                        <path fillRule="evenodd" clipRule="evenodd" d="M18.403 16.73c-.22.614-1.286 1.135-1.782 1.164-.476.028-1.097.133-3.886-.975-3.66-1.455-6.035-5.183-6.216-5.424-.18-.241-1.492-1.983-1.492-3.78 0-1.797.942-2.679 1.275-3.04.312-.34.68-.426.906-.426.226 0 .453.003.651.009.208.006.486-.078.761.64.283.744.962 2.378 1.048 2.548.085.17.142.368.028.595-.113.227-.17.368-.34.566-.17.198-.368.425-.51.566-.16.142-.328.32-.142.632.189.317.842 1.396 1.806 2.254 1.259 1.121 2.33 1.468 2.66 1.638.33.17.527.142.724-.085.198-.227.85-1.077 1.076-1.446.226-.368.453-.311.764-.198.311.113 1.98.934 2.32 1.104.34.17.566.255.651.396.085.142.085.822-.141 1.436z" fill="white" />
                    </svg>
                </div>
            </a>

        </div>
    )
}

export default Contact;