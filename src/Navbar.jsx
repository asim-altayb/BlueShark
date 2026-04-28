import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Waves,
  ShieldCheck,
  GraduationCap,
  Phone,
  Info,
  Globe,
  ChevronDown,
  Menu,
  X,
  Anchor,
  Compass,
  LifeBuoy
} from "lucide-react";
import logo from "./assets/logo3.png";

function Navbar() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setActiveDropdown(null);
  };

  const navItems = [
    { name: t("home"), path: "/", icon: Home },
    {
      name: t("services"),
      id: "services",
      icon: Waves,
      dropdown: [
        { name: t("services"), path: "/leisure" },
        { name: t("cambing"), path: "/leisure/trips/Arkaweet" },
        { name: t("sanganb"), path: "/leisure/sanganb" },
        { name: t("arq"), path: "/leisure/trips/Irg" },
        { name: t("rumi"), path: "/leisure/trips/Romy" },
        { name: t("umbria"), path: "/leisure/trips/Umbria" },
      ]
    },
    {
      name: t("commercial"),
      id: "commercial",
      icon: ShieldCheck,
      dropdown: [
        { name: t("commercial"), path: "/commircal" },
        { name: t("supply"), path: "/commircal/marineServis/ShipsSuplly" },
        { name: t("husbandry"), path: "/commircal/marineServis/ShipHusbandry" },
        { name: t("civil"), path: "/commircal/marineServis/CivilWokr" },
        { name: t("offshore"), path: "/commircal/marineServis/OffshoreWork" },
      ]
    },
    {
      name: t("courses"),
      id: "courses",
      icon: GraduationCap,
      dropdown: [
        { name: t("courses"), path: "/courses/Courses" },
        { name: t("dive"), path: "/courses/Courses/DiveCourses" },
        { name: t("kid"), path: "/courses/Courses/KidsCourses" },
      ]
    },
    { name: t("contact"), path: "/contact", icon: Phone },
    { name: t("about"), path: "/about", icon: Info },
  ];

  const DropdownIcon = ({ isOpen }) => (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      className={isRTL ? "mr-auto" : "ml-auto"}
    >
      <ChevronDown size={16} className="opacity-60" />
    </motion.div>
  );

  return (
    <div className="font-helvetica" dir={isRTL ? "rtl" : "ltr"}>
      {/* 🚢 Enhanced Navbar */}
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled
          ? "py-2 bg-white/95 dark:bg-slate-900/98 backdrop-blur-xl shadow-2xl border-b border-cyan-500/20"
          : "py-4 md:py-6 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">

          {/* Mobile Menu Icon (Floating Style for better visibility) */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-3 rounded-2xl transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center ${mobileMenuOpen
                ? "bg-cyan-500 text-white shadow-cyan-500/40 rotate-180"
                : isScrolled
                  ? "bg-slate-900 text-white shadow-slate-900/20"
                  : "bg-white/20 backdrop-blur-md text-white border border-white/30"
                }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group z-[110]">
            <div className="relative">
              <img
                src={logo}
                alt="BlueShark Logo"
                className="w-10 h-10 sm:w-16 sm:h-16 object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-2xl font-black tracking-tighter ${isScrolled ? 'text-blue-900 dark:text-white' : 'text-white'} transition-colors leading-none`}>
                BLUESHARK <span className="text-cyan-500">MARINE</span>
              </span>
              <span className={`text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold ${isScrolled ? 'text-slate-500' : 'text-slate-200'} transition-colors mt-0.5`}>
                Sea Trips
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const hasDropdown = !!item.dropdown;
              const isActive = activeDropdown === item.id;

              return (
                <div key={item.name || item.id} className="relative px-1" ref={hasDropdown ? menuRef : null}>
                  {hasDropdown ? (
                    <button
                      onClick={() => setActiveDropdown(isActive ? null : item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${isActive
                        ? "bg-cyan-500 text-white shadow-lg"
                        : isScrolled ? "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600" : "text-white hover:bg-blue-500/20"
                        }`}
                    >
                      <Icon size={18} />
                      {item.name}
                      <DropdownIcon isOpen={isActive} />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${location.pathname === item.path
                        ? "bg-blue-600 text-white shadow-lg"
                        : isScrolled ? "text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600" : "text-white hover:bg-blue-500/20"
                        }`}
                    >
                      <Icon size={18} />
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hasDropdown && isActive && (
                      <motion.ul
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute top-full mt-3 w-64 bg-white/98 dark:bg-slate-800/98 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-2xl overflow-hidden p-2 z-[110] ${isRTL ? 'right-0' : 'left-0'}`}
                      >
                        {item.dropdown.map((drop) => (
                          <li key={drop.path}>
                            <Link
                              to={drop.path}
                              className="flex items-center gap-3 px-5 py-3 rounded-[20px] text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 transition-all font-bold text-sm"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                              {drop.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Language Selection */}
            <div className="ml-4 border-l border-white/10 pl-4 flex gap-2">
              {['en', 'ar'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all ${i18n.language === lang
                    ? "bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-md"
                    : isScrolled ? "text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600" : "text-white/60 hover:bg-blue-500/20"
                    }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 📱 Mobile Side Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[150]"
            />
            <motion.div
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-[85%] max-w-[380px] bg-white dark:bg-slate-900 z-[200] shadow-2xl overflow-y-auto`}
            >
              <div className="p-6 pt-24">
                {/* Language Switchers Mobile */}
                <div className="flex gap-3 mb-8 bg-slate-100 dark:bg-slate-800/50 p-2 rounded-[30px]" dir="ltr">
                  {['en', 'ar'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => i18n.changeLanguage(lang)}
                      className={`flex-1 py-3 rounded-[24px] font-black text-xs sm:text-sm transition-all shadow-sm ${i18n.language === lang
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-slate-600"
                        }`}
                    >
                      {lang === 'en' ? 'ENGLISH' : 'العربية'}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const hasDropdown = !!item.dropdown;
                    const isOpen = activeDropdown === item.id;

                    return (
                      <div key={item.name || item.id}>
                        {hasDropdown ? (
                          <>
                            <button
                              onClick={() => setActiveDropdown(isOpen ? null : item.id)}
                              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${isOpen ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-cyan-400" : "text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                                }`}
                            >
                              <div className="flex items-center gap-4 font-bold">
                                <Icon size={20} className={isOpen ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400'} />
                                {item.name}
                              </div>
                              <ChevronDown className={`transition-transform duration-300 opacity-40 ${isOpen ? 'rotate-180' : ''}`} size={18} />
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50 dark:bg-slate-800/20 rounded-2xl mt-1 mx-2"
                                >
                                  {item.dropdown.map((drop) => (
                                    <Link
                                      key={drop.path}
                                      to={drop.path}
                                      className={`block p-4 text-sm font-bold border-l-2 border-transparent hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all ${location.pathname === drop.path ? 'text-blue-600 dark:text-cyan-400 border-blue-500' : 'text-slate-500 dark:text-slate-400'}`}
                                    >
                                      {drop.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${location.pathname === item.path
                              ? "bg-blue-600 text-white shadow-lg"
                              : "text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                              }`}
                          >
                            <Icon size={20} className={location.pathname === item.path ? 'text-white' : 'text-slate-400'} />
                            {item.name}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 p-6 bg-gradient-to-br from-blue-700 to-cyan-600 rounded-[35px] text-white overflow-hidden relative shadow-xl">
                  <Anchor className={`absolute -bottom-8 -right-8 text-white/10 w-32 h-32 rotate-12 ${isRTL ? '!-left-8' : ''}`} />
                  <h4 className="text-lg font-black mb-1 relative z-10">Dive into Excellence</h4>
                  <p className="text-blue-100/80 text-xs mb-5 relative z-10">The Red Sea's premier marine logistics & leisure partner.</p>
                  <Link
                    to="/contact"
                    className="inline-block bg-white text-blue-700 px-6 py-3 rounded-xl font-black text-sm shadow-lg hover:scale-105 transition-transform active:scale-95 relative z-10"
                  >
                    Get in Touch
                  </Link>
                </div>

                <p className="mt-8 text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase pb-6">
                  © {new Date().getFullYear()} BlueShark Marine
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;