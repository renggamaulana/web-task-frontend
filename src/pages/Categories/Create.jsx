import { Link, Outlet } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumb"
export default function CategoryCreate() {
    return(
        <>
            <Breadcrumb />
            <div className="bg-blue-100">
                <h1>Kategori</h1>
            </div>
        </>
    )
}