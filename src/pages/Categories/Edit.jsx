import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import Breadcrumb from "../../components/Breadcrumb";
import FormControl from "../../components/FormControl";
import LabelInput from "../../components/LabelInput";
import InputForm from "../../components/InputForm";
import ButtonSubmit from "../../components/ButttonSubmit";
import categoryService from "../../services/categoryService";
import Swal from "sweetalert2";

export default function CategoryEdit() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const [category, setCategory] = useState(null);
    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const res = await categoryService.getCategoryById(id);
            setName(res.data.name);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await categoryService.updateCategory(id, { name });
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Kategori berhasil diperbarui!",
                timer: 2000,
                showConfirmButton: true,
            });
            setTimeout(() => {
                navigate("/kategori");
            }, 1500);
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
                    text: "Terjadi kesalahan saat memperbarui kategori.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6">Edit Kategori</h1>
            <MainContainer>
                <div className="flex justify-between mb-5">
                    <Breadcrumb />
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <FormControl>
                        <LabelInput htmlFor="name" label="Nama" />
                        <InputForm type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama jenis barang"  required />
                    </FormControl>
                    <ButtonSubmit disabled={loading}>{loading ? "Menyimpan..." : "Update"}</ButtonSubmit>
                </form>
            </MainContainer>
        </div>
    );
}
