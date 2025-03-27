export default function MainContainer(props) {
    return (
        <div className="bg-white/5 h-[83vh] backdrop-blur-md rounded-lg shadow-lg p-10 border border-white/20">
            {props.children}
        </div>
    )
}