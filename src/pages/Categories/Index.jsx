import { Link, Outlet } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import MainContainer from "../../components/MainContainer";
export default function Category() {
    return(
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6 text-white">Kategori</h1>
            <MainContainer>
                <Breadcrumb />
                <table className="w-full border-collapse rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-white/10 backdrop-blur-md text-left text-gray-200">
                        <th className="p-3">No</th>
                        <th className="p-3">Nama</th>
                        <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-white/20 hover:bg-white/20 transition">
                            <td className="p-3">1</td>
                            <td className="p-3">Konsumsi</td>
                            <td className="p-3">
                                <div className="flex gap-2">
                                <button className="rounded cursor-pointer px-3 py-1 bg-green-600/30 hover:bg-green-600 transition text-white">
                                    Edit
                                </button>
                                <button className="rounded cursor-pointer px-3 py-1 bg-red-600/30 hover:bg-red-600 transition text-white">
                                    Hapus
                                </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-white/20 hover:bg-white/20 transition">
                            <td className="p-3">1</td>
                            <td className="p-3">Konsumsi</td>
                            <td className="p-3">
                                <div className="flex gap-2">
                                <button className="rounded cursor-pointer px-3 py-1 bg-green-600/30 hover:bg-green-600 transition text-white">
                                    Edit
                                </button>
                                <button className="rounded cursor-pointer px-3 py-1 bg-red-600/30 hover:bg-red-600 transition text-white">
                                    Hapus
                                </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    </table>

            </MainContainer>
        </div>
    )
}