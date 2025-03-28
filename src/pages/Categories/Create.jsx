import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumb"
import MainContainer from "../../components/MainContainer"
import FormControl from "../../components/FormControl";
import LabelInput from "../../components/LabelInput";
import InputForm from "../../components/InputForm";
import ButtonSubmit from "../../components/ButttonSubmit";
import { useState } from "react";
import categoryService from "../../services/categoryService";
import Swal from "sweetalert2";

export default function CategoryCreate() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await categoryService.createCategory({name});
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Kategori berhasil ditambahkan!",
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => {
                navigate('/kategori');
            }, 1500);
        } catch (error) {
            if (error.response && error.response.data) {
                const { message, errors } = error.response.data;
                let errorMessage = message; // Default pesan Laravel

                if (errors && errors.name) {
                    errorMessage = errors.name[0]; // Ambil pesan spesifik untuk "name"
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
                    text: "Terjadi kesalahan saat memperbarui kategori.",
                });
            }
        } finally {
            setLoading(false);
        }
    }
    return(
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6 text-white">Tambah Kategori</h1>
            <MainContainer>
                <div className="flex justify-between w-full mb-5">
                    <Breadcrumb />
                </div>
                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <FormControl>
                        <LabelInput for="name" label="Nama" />
                        <InputForm
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan nama"   />
                    </FormControl>
                    <ButtonSubmit disabled={loading}>{loading ? "Menyimpan..." : "Submit"}</ButtonSubmit>
                </form>
            </MainContainer>
        </div>
    )
}