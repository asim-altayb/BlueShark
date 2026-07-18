import Aos from 'aos';
import 'aos/dist/aos.css'
import './App.css';
import './index.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import LeisureServices from './pages/LeisureServices';
import CommercialServices from './pages/CommercialServices';
import Contact from './pages/Contact';
import ShipsSupplay from './pages/marineServis/ShipsSuplly';
import Sanganb from './pages/Sanganb';

import Irg from './pages/trips/Irg';
import Arkaweet from './pages/trips/Arkaweet';
import Romy from './pages/trips/Romy';
import Umbria from './pages/trips/Umbria';
import Dashboard from './admin/Dashboard';
import Reports from './admin/Reports';
import MarineServer from './admin/MarineServes';
import UserLayout from './admin/UserLayout';
import AdminLayout from './admin/AdminLayout';
import Talk from './pages/Talk';
import Comments from './admin/Comments';
import ShipHusbandry from './pages/marineServis/ShipHusbandry';
import CivilWork from './pages/marineServis/CivilWokr';
import OffshoreWork from './pages/marineServis/OffshoreWork';
import Courses from './pages/courses/Courses';
import DiveCourses from './pages/courses/DiveCourses';
import KidsCourses from './pages/courses/KidsCourses';
import Special from './admin/Special';
import Cambing from './admin/Cambing';
import Course from './admin/Course';
import Prices from './admin/Prices';
import AdminLogin from './admin/Login';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import AboutUs from './pages/AboutUs';
import { useTranslation } from "react-i18next";
import Navbar from './Navbar';


function App() {
  const { i18n } = useTranslation();
  return (


    <AuthProvider>

      {i18n.language === 'ar' && (
        <style>
          {`
        p {
          direction: rtl;
          text-align: right;
        }
      `}
        </style>
      )}

      <Routes>
        <Route path="/Login" element={<AdminLogin />} />
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/commircal" element={<CommercialServices />} />
          <Route path="/courses/Courses" element={<Courses />} />
          <Route path="/courses/Courses/DiveCourses" element={<DiveCourses />} />
          <Route path="/courses/Courses/KidsCourses" element={<KidsCourses />} />
          <Route path="/leisure" element={<LeisureServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leisure/sanganb" element={<Sanganb />} />
          <Route path="/leisure/trips/Umbria" element={<Umbria />} />
          <Route path="/leisure/trips/Romy" element={<Romy />} />
          <Route path="/leisure/trips/Irg" element={<Irg />} />
          <Route path="/leisure/trips/Arkaweet" element={<Arkaweet />} />
          <Route path="commircal/marineServis/ShipsSuplly" element={<ShipsSupplay />} />
          <Route path="commircal/marineServis/ShipHusbandry" element={<ShipHusbandry />} />
          <Route path="commircal/marineServis/CivilWokr" element={<CivilWork />} />
          <Route path="commircal/marineServis/OffshoreWork" element={<OffshoreWork />} />
          <Route path="./pages/Talk" element={<Talk />} />
          <Route path="/about" element={<AboutUs />} />

        </Route>



        <Route element={<PrivateRoute><AdminLayout /></PrivateRoute>}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='dashboard/Reports' element={<Reports />} />
          <Route path='dashboard/MarineServes' element={<MarineServer />} />
          <Route path="dashboard/Comments" element={<Comments />} />
          <Route path="dashboard/Special" element={<Special />} />
          <Route path="dashboard/Cambing" element={<Cambing />} />
          <Route path="dashboard/Course" element={<Course />} />
          <Route path="dashboard/Prices" element={<Prices />} />
        </Route>
      </Routes>
    </AuthProvider>




  );
}

export default App;
