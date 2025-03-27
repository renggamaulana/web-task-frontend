export default function MainContainer(props) {
    return (
        <div className="bg-white/5 min-h-[85vh] backdrop-blur-md rounded-lg shadow-lg p-10">
            {props.children}
        </div>
    )
}