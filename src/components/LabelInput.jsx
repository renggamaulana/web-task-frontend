export default function LabelInput(props) {
    return (
        <div className="text-white font-semibold">
            <label htmlFor={props.for}>{props.label}</label>
        </div>
    )
}