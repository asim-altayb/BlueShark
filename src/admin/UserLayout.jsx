import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import Talk from "../pages/Talk";
import CommentsSlider from "../pages/CommentSlider";

export default function UserLayout ({children}){
return(

    <div>
        <Navbar/>
        <Outlet/>
        <Talk/>
        <CommentsSlider/>
        <Footer/>
        <mai>
            {children}
        </mai>
    </div>
);


};  