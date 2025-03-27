export default function ButtonSubmit(props) {
    return (
        <button type="submit" className="text-white font-semibold rounded-lg bg-sky-600/40 hover:bg-sky-400/40 self-baseline px-3 py-1 cursor-pointer">{props.children}</button>
    )
}