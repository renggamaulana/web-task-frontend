import { Link, Outlet } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import MainContainer from "../../components/MainContainer";
import { useEffect, useState } from "react";
import categoryService from "../../services/categoryService";
export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const data = await categoryService.getAllCategories();
            setCategories(data.data);
          } catch (error) {
            console.error("Failed to fetch categories:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCategories();
      }, []);

    return(
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6 text-white">Kategori</h1>
            <MainContainer>
                <div className="flex justify-between w-full mb-5">
                    <Breadcrumb />
                    <Link to="/kategori/tambah" className="cursor-pointer font-semibold bg-sky-800/50 px-3 py-1 rounded-lg hover:bg-sky-700/50">
                        Tambah
                    </Link>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-white/10 backdrop-blur-md text-left text-gray-200">
                            <th className="p-3">No</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                <td colSpan="3" className="p-3 text-center text-gray-400 italic">
                                    Tidak ada data kategori.
                                </td>
                                </tr>
                            ) : (
                                categories.map((category, index) => (
                                <tr key={category.id} className="border-b border-white/20 hover:bg-white/20 transition">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{category.name}</td>
                                    <td className="p-3">
                                    <div className="flex gap-2">
                                        <button className="rounded px-3 py-1 bg-green-600/30 hover:bg-green-600 transition text-white">
                                        Edit
                                        </button>
                                        <button className="rounded px-3 py-1 bg-red-600/30 hover:bg-red-600 transition text-white">
                                        Hapus
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                )}

            </MainContainer>
        </div>
    )
}