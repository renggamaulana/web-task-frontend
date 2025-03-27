import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

export default function Product(){
    return (
        <>
            <Breadcrumb />
            <h1>Daftar Barang</h1>
            <Link to="/barang/tambah">Create Product</Link>
        </>
    )
}