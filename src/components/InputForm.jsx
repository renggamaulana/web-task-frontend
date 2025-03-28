export default function InputForm({ id, type = "text", name, placeholder, className = "", ...props }) {
    return (
        <div className="w-full">
            <input 
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                className={`text-white bg-white/5 p-3 rounded-lg w-full ${className}`}
                {...props} // Menangani event seperti onChange, value, dll.
            />
        </div>
    );
}
