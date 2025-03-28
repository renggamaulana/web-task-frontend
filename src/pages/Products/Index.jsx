import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import MainContainer from "../../components/MainContainer";
import { useEffect, useState } from "react";
import productService from "../../services/productService";
import { BsFillInboxFill } from "react-icons/bs";

export default function Product(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data = await productService.getAllProducts();
            setProducts(data.data);
          } catch (error) {
            console.error("Failed to fetch products:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
    }, []);

    return (
        <div className="text-white">
        <h1 className="text-3xl font-bold mb-6 text-white">Barang</h1>
        <MainContainer>
            <div className="flex justify-between w-full mb-5">
                <Breadcrumb />
                <Link to="/kategori/tambah" className="cursor-pointer font-semibold bg-sky-800/50 px-3 py-1 rounded-lg hover:bg-sky-600/50">
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
                        <th className="p-3">Stok</th>
                        <th className="p-3">Terjual</th>
                        <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                            <td colSpan="5" className="p-3 text-center text-gray-400 italic">
                                 <div className="flex flex-col items-center gap-2">
                                    <BsFillInboxFill className="text-8xl"/>
                                    <span>Tidak ada data barang.</span>
                                </div>
                            </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                            <tr key={product.id} className="border-b border-white/20 hover:bg-white/20 transition">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.stock}</td>
                                <td className="p-3">{product.sold}</td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button className="rounded px-3 py-1 bg-green-600/30 hover:bg-green-600/50 transition cursor-pointer text-white">
                                            Edit
                                        </button>
                                        <button className="rounded px-3 py-1 bg-red-600/30 hover:bg-red-600/50 transition cursor-pointer text-white">
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