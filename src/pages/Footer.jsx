
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-[#0f172a] text-blue-50 py-16 border-t-4 border-sky-500 relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Column 1: Branding & Info */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                        {t("siteName")}
                    </h1>
                    <p className="text-blue-200/70 text-sm leading-relaxed max-w-xs">
                        {t("info")?.substring(0, 150)}...
                    </p>
                    <div className="flex space-x-4 pt-2">
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-sky-500 transition-all duration-300">
                            <span className="sr-only">Facebook</span>
                            <span className="text-xl">f</span>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-pink-500 transition-all duration-300">
                            <span className="sr-only">Instagram</span>
                            <span className="text-xl">i</span>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-sky-400 transition-all duration-300">
                            <span className="sr-only">Twitter</span>
                            <span className="text-xl">t</span>
                        </a>
                    </div>
                </div>

                {/* Column 2: Our Trips (Leisure) */}
                <div>
                    <h2 className="text-lg font-bold mb-6 text-sky-400 border-b border-sky-500/30 pb-2 inline-block">
                        {t("services")}
                    </h2>
                    <ul className="grid grid-cols-1 gap-3 text-sm text-blue-200/70">
                        <li><Link to="/leisure" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>⚓</span> {t("services")}</Link></li>
                        <li><Link to="/leisure/sanganb" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>⚓</span> {t("sanganb")}</Link></li>
                        <li><Link to="/leisure/trips/Umbria" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>⚓</span> {t("umbria")}</Link></li>
                        <li><Link to="/leisure/trips/Romy" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>⚓</span> {t("rumi")}</Link></li>
                        <li><Link to="/leisure/trips/Irg" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>⚓</span> {t("arq")}</Link></li>
                        <li><Link to="/leisure/trips/Arkaweet" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>⚓</span> {t("cambing")}</Link></li>
                    </ul>
                </div>

                {/* Column 3: Commercial & Courses */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-lg font-bold mb-6 text-sky-400 border-b border-sky-500/30 pb-2 inline-block">
                            {t("commercial")}
                        </h2>
                        <ul className="grid grid-cols-1 gap-3 text-sm text-blue-200/70">
                            <li><Link to="/commircal" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>🛠️</span> {t("commercial")}</Link></li>
                            <li><Link to="/commircal/marineServis/ShipsSuplly" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>🏗️</span> {t("supply")}</Link></li>
                            <li><Link to="/commircal/marineServis/ShipHusbandry" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>🔧</span> {t("husbandry")}</Link></li>
                            <li><Link to="/commircal/marineServis/CivilWokr" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>🧱</span> {t("civil")}</Link></li>
                            <li><Link to="/commircal/marineServis/OffshoreWork" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>🌊</span> {t("offshore")}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-sky-400 border-b border-sky-500/30 pb-2 inline-block">
                            {t("courses")}
                        </h2>
                        <ul className="grid grid-cols-1 gap-3 text-sm text-blue-200/70">
                            <li><Link to="/courses/Courses" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>🥽</span> {t("courses")}</Link></li>
                            <li><Link to="/courses/Courses/DiveCourses" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>🐬</span> {t("dive")}</Link></li>
                            <li><Link to="/courses/Courses/KidsCourses" className="hover:text-sky-400 transition-colors flex items-center gap-2"><span>🧒</span> {t("kid")}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Column 4: Quick Links & Contact */}
                <div>
                    <h2 className="text-lg font-bold mb-6 text-sky-400 border-b border-sky-500/30 pb-2 inline-block">
                        {t("contact")}
                    </h2>
                    <ul className="space-y-4 text-sm text-blue-200/70">
                        <li>
                            <Link to="/" className="hover:text-sky-400 transition-colors flex items-center gap-3">
                                <span className="text-lg">🏠</span> {t("home")}
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-sky-400 transition-colors flex items-center gap-3">
                                <span className="text-lg">📝</span> {t("about")}
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-sky-400 transition-colors flex items-center gap-3">
                                <span className="text-lg">☎️</span> {t("contact")}
                            </Link>
                        </li>
                        <li className="pt-4 border-t border-blue-800/50">
                            <p className="flex items-center gap-3 mb-2">
                                <span className="text-sky-400">📍</span> Port Sudan, Sudan
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="text-sky-400">📧</span>bluesharkdivingsudan@gmail.com
                            </p>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Copyright Section */}
            <div className="max-w-7xl mx-auto px-6 text-center text-blue-400/40 text-xs mt-16 pt-8 border-t border-blue-900/50">
                <p>&copy; {new Date().getFullYear()} {t("siteName")}. All rights Reserved. Built with ❤️ for the Red Sea.</p>
            </div>
        </footer>
    );
}

export default Footer;