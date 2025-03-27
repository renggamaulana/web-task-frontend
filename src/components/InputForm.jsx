export default function InputForm(props) {
    return (
        <div className="w-full">
            <input className="text-white bg-white/5 p-3 rounded-lg w-full" id={props.id} type={props.type} name={props.name} placeholder={props.placeholder} />
        </div>
    )
}