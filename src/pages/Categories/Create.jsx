import { Link, Outlet } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumb"
import MainContainer from "../../components/MainContainer"
import FormControl from "../../components/FormControl";
import LabelInput from "../../components/LabelInput";
import InputForm from "../../components/InputForm";
import ButtonSubmit from "../../components/ButttonSubmit";
export default function CategoryCreate() {
    const handleSubmit = () => {
        alert('Submit');
    }
    return(
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6 text-white">Kategori</h1>
            <MainContainer>
                <div className="flex justify-between w-full mb-5">
                    <Breadcrumb />
                </div>
                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <FormControl>
                        <LabelInput for="name" label="Nama" />
                        <InputForm type="text" name="name" id="name" placeholder="Masukkan nama"  />
                    </FormControl>
                    <ButtonSubmit >Submit</ButtonSubmit>
                </form>
            </MainContainer>
        </div>
    )
}