import sanga3 from "../assets/gedo (8).jpg";
import gido from "../assets/gido (2).jpg";
import gido2 from "../assets/gido (6).jpg";
import gido3 from "../assets/gido (5).jpg";
import gido4 from "../assets/gido (4).jpg";
import gido5 from "../assets/gido (3).jpg";
import gido6 from "../assets/gido (7).jpg";
import gido7 from "../assets/gido (8).jpg";
import about from "../assets/gedo (4).jpg";
import vision from "../assets/gedo (5).jpg";
import mision from "../assets/gedo (2).jpg";
import team1 from "../assets/work (21).jpg";
import team2 from "../assets/gedo (10).jpg";
import team3 from "../assets/gedo (11).jpg";
import asina from "../assets/asina.jpg";
import shipa from "../assets/shipa.jpg";
import magzob from "../assets/kids (2).jpg";
import teamm1 from "../assets/teamm (1).jpg";
import teamm from "../assets/teamm (2).jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const team = [
    {
      name: "Madani Abdalla Madani",
      email: "General Manager , Instructor Driver , IMCA Air Diver 50 meters",
      phone: "+249 129102102",
      image: team1,
    },
    {
      name: "Majzoub Badr Al-Deen kamel",
      email: "CEO , Commercila diver (IDAS)",
      phone: "+249 900008229",
      image: magzob,
    },
    {
      name: "Mohammed AlHafiz Abd Alrahman",
      email: "Marine projects Coordinator",
      phone: "+249 900008226 ",
      image: teamm1,
    },
    {
      name: "Abd Alwase Mohamed Babeker",
      email: "Field Operation Manager ",
      phone: "+249 918023363",
      image: teamm,
    }
  ];

  /* Reusable Section Component for cleaner code */
  const InfoSection = ({ img, title, desc, reverse, aosImg, aosText }) => (
    <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 py-12 px-6 md:px-12 max-w-7xl mx-auto`}>
      <div className="w-full md:w-1/2 relative group" data-aos={aosImg}>
        <div className="absolute inset-0 bg-blue-400 rounded-3xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
        <img
          src={img}
          alt={title}
          className="relative w-full h-[300px] md:h-[400px] object-cover rounded-3xl shadow-lg border-4 border-white"
        />
      </div>
      <div className="w-full md:w-1/2 text-slate-700" data-aos={aosText} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 drop-shadow-sm font-serif">
          {title}
        </h2>
        <p className="text-lg leading-relaxed text-slate-600 bg-white/50 p-6 rounded-2xl shadow-sm backdrop-blur-sm border border-blue-100">
          {desc}
        </p>
      </div>
    </div>
  );

  /* Timeline Item Component */
  const TimelineItem = ({ img, title, text, year = "15 years" }) => (
    <div className="relative flex flex-col md:flex-row items-center gap-8 py-12 px-4 md:px-0 max-w-6xl mx-auto">
      {/* Central Line (Desktop only) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 hidden md:block transform -translate-x-1/2"></div>

      {/* Image Side */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-12 relative z-10" data-aos="fade-right">
        <div className="relative">
          <img src={img} className="w-full max-w-md h-64 object-cover rounded-2xl shadow-xl border-4 border-white" alt={title} />
          <div className="absolute -top-4 -right-4 bg-sky-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce-slow">
            {year}
          </div>
        </div>
      </div>

      {/* Bubble on Line */}
      <div className="hidden md:absolute left-1/2 top-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-md"></div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-12 z-10" data-aos="fade-left" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow w-full max-w-md">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">{title}</h3>
          <p className="text-slate-600 leading-relaxed font-medium">{text}</p>
        </div>
      </div>
    </div>
  );


  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-blue-50 overflow-hidden font-helvetica pb-20">

      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 z-10"></div>
        <img src={sanga3} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl" data-aos="fade-up">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-14 rounded-3xl shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg font-serif">{t("siteName")}</h1>
            <p className="text-xl md:text-2xl font-light tracking-wide mb-2">{t("main2")}</p>
            <div className="h-1 w-20 bg-sky-400 mx-auto my-4 rounded"></div>
            <p className="text-lg opacity-90">{t("since")}</p>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-sky-50"></path>
          </svg>
        </div>
      </div>

      {/* Intro Sections */}
      <div className="space-y-0">
        <InfoSection img={about} title={t("siteName")} desc={t("team")} reverse={true} aosImg="fade-right" aosText="fade-left" />
        <InfoSection img={vision} title={t("vision2")} desc={t("vision")} reverse={false} aosImg="fade-left" aosText="fade-right" />
        <InfoSection img={mision} title={t("mission")} desc={t("mision")} reverse={true} aosImg="fade-right" aosText="fade-left" />
      </div>

      {/* Team Section */}
      <div className="py-20 bg-blue-900 bg-opacity-5 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900 font-serif" data-aos="fade-up">{t("teame")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-6 md:px-20 max-w-7xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="aspect-w-3 aspect-h-4 h-96">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-200 text-sm mb-2">{member.email.split(',')[0]}</p>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-xs opacity-80 mb-2">{member.email}</p>
                  <p className="text-white font-mono">{member.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline Title */}
      <div className="text-center mt-24 mb-12">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-700 relative inline-block">
          <span className="relative z-10">{t("experience")}</span>
          <div className="absolute bottom-2 left-0 w-full h-4 bg-yellow-200/50 -rotate-2 z-0 rounded-full blur-[2px]"></div>
        </h1>
      </div>

      {/* Timeline Sections */}
      <div className="space-y-4">
        <TimelineItem img={asina} title={t("asina")} text={t("asina2")} />
        <TimelineItem img={gido} title={t("gido_year")} text={t("gido_desc")} />
        <TimelineItem img={gido3} title={t("gido3_title")} text={t("africa")} />
        <TimelineItem img={gido4} title={t("sunck")} text={t("sunck2")} />
        <TimelineItem img={gido5} title={t("ship")} text={t("ship2")} />
        <TimelineItem img={gido7} title={t("ut")} text={t("ut2")} />
        <TimelineItem img={gido6} title={t("shape")} text={t("shape2")} />
        <TimelineItem img={gido2} title={t("goos")} text={t("goos2")} />
      </div>

    </div>
  );
}