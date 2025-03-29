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
import categoryService from "../../services/categoryService";

export default function ProductCreate() {
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const [category, setCategory] = useState(null);
    useEffect(() => {
        fetchCategories();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await productService.createProduct({ name, stock, category_id: categoryId });
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Barang berhasil ditambahkan!",
                timer: 2000,
                showConfirmButton: true,
            });
            setTimeout(() => {
                navigate("/barang");
            }, 1500);
            navigate("/barang");
        } catch (error) {
            if (error.response && error.response.data) {
                const { message, errors } = error.response.data;
                let errorMessage = message; // Default pesan Laravel

                if (errors && errors.name) {
                    errorMessage = errors.name[0]; // Ambil pesan spesifik untuk "name"
                }

                // Tampilkan SweetAlert2 dengan pesan dari Laravel
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: errorMessage,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan saat menambahkan barang.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6">Edit Barang</h1>
            <MainContainer>
                <div className="flex justify-between mb-5">
                    <Breadcrumb />
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <FormControl>
                        <LabelInput htmlFor="name" label="Nama Barang" />
                        <InputForm type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Masukkan nama barang"  />
                    </FormControl>
                    <FormControl>
                        <LabelInput htmlFor="stock" label="Stok" />
                        <InputForm type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} required placeholder="Masukkan jumlah stok barang"  />
                    </FormControl>
                    <FormControl>
                        <LabelInput htmlFor="category_id" label="Jenis Barang" />
                        <select name="category_id" id="category_id" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="text-white bg-white/5 p-3 rounded-lg w-full">
                            <option selected value="">Pilih Jenis Barang</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}  className="text-black">
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </FormControl>
                    <ButtonSubmit disabled={loading}>{loading ? "Menyimpan..." : "Update"}</ButtonSubmit>
                </form>
            </MainContainer>
        </div>
    );
}
