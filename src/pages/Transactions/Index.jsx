import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

export default function Transaction() {
    return (
        <>  
            <Breadcrumb />
            <h1>Daftar Transaksi</h1>
            <Link to="/transaksi/tambah">Buat Transaksi</Link>
        </>
    )
}