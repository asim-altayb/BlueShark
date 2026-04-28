import { Outlet } from "react-router-dom"
import AdminNavbar from "./AdminNavbar"
import Footer from "../pages/Footer"

export default function AdminLayout({children}){
return(
<div>

    <AdminNavbar/>
    <Outlet/>
    
    
    <main className="p-4">
        {children}
    </main>
</div>

)

}