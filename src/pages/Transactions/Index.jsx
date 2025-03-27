import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import MainContainer from "../../components/MainContainer";
import { useEffect, useState } from "react";
import transactionService from "../../services/transactionService";

export default function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const data = await transactionService.getAllTransactions();
            setTransactions(data.data);
          } catch (error) {
            console.error("Failed to fetch transactions:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchTransactions();
    }, []);

    return (
        <div className="text-white">
        <h1 className="text-3xl font-bold mb-6 text-white">Transaksi</h1>
        <MainContainer>
            <div className="flex justify-between w-full mb-5">
                <Breadcrumb />
                <Link to="/transaksi/tambah" className="cursor-pointer font-semibold bg-sky-800/50 px-3 py-1 rounded-lg hover:bg-sky-600/50">
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
                        <th className="p-3">Nama Barang</th>
                        <th className="p-3">Stok</th>
                        <th className="p-3">Jumlah Terjual</th>
                        <th className="p-3">Tanggal Transaksi</th>
                        <th className="p-3">Jenis Barang</th>
                        <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                            <td colSpan="3" className="p-3 text-center text-gray-400 italic">
                                Tidak ada data barang.
                            </td>
                            </tr>
                        ) : (
                            transactions.map((transaction, index) => (
                            <tr key={transaction.id} className="border-b border-white/20 hover:bg-white/20 transition">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{transaction.product?.name}</td>
                                <td className="p-3">{transaction.product?.stock}</td>
                                <td className="p-3">{transaction.product?.sold}</td>
                                <td className="p-3">{transaction.transaction_date}</td>
                                <td className="p-3">{transaction.product?.category?.name}</td>
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