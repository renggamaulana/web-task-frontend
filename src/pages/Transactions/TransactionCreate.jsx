import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import Breadcrumb from "../../components/Breadcrumb";
import FormControl from "../../components/FormControl";
import LabelInput from "../../components/LabelInput";
import InputForm from "../../components/InputForm";
import ButtonSubmit from "../../components/ButttonSubmit";
import Swal from "sweetalert2";
import productService from "../../services/productService";
import transactionService from "../../services/transactionService";

export default function TransactionCreate() {
    const [productId, setProductId] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(productId, transactionDate, quantity);
        try {
            const res = await transactionService.createTransaction({
                product_id: productId,
                transaction_date: transactionDate,
                quantity: quantity,
            });
            console.log(res.data);

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Transaksi berhasil disimpan!",
                timer: 2000,
                showConfirmButton: true,
            });

            setTimeout(() => {
                navigate("/transaksi");
            }, 1500);
        } catch (error) {
            if (error.response && error.response.data) {
                const { message, errors } = error.response.data;
                let errorMessage = message; // Pesan default dari Laravel

                // Ambil pesan error spesifik dari backend
                if (errors) {
                    if (errors.product_id) errorMessage = errors.product_id[0];
                    if (errors.transaction_date) errorMessage = errors.transaction_date[0];
                    if (errors.quantity) errorMessage = errors.quantity[0];
                }

                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: errorMessage,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan saat menyimpan transaksi.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6">Tambah Transaksi</h1>
            <MainContainer>
                <div className="flex justify-between mb-5">
                    <Breadcrumb />
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <FormControl>
                        <LabelInput htmlFor="product_id" label="Pilih Produk" />
                        <select
                            id="product_id"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="text-white bg-white/5 p-3 rounded-lg w-full"
                            required
                        >
                            <option value="" disabled>Pilih produk...</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id} className="text-black">
                                    {product.name} - Stok: {product.stock}
                                </option>
                            ))}
                        </select>
                    </FormControl>

                    <FormControl>
                        <LabelInput htmlFor="transaction_date" label="Tanggal Transaksi" />
                        <InputForm
                            type="date"
                            id="transaction_date"
                            value={transactionDate}
                            onChange={(e) => setTransactionDate(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl>
                        <LabelInput htmlFor="quantity" label="Jumlah Barang" />
                        <InputForm
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            min="1" 
                            placeholder="Masukkan jumlah barang"
                        />
                    </FormControl>

                    <ButtonSubmit disabled={loading}>
                        {loading ? "Menyimpan..." : "Tambah Transaksi"}
                    </ButtonSubmit>
                </form>
            </MainContainer>
        </div>
    );
}
