import { Link } from "react-router-dom";

export default function Category() {
    return(
        <>
            <h1>Category Create</h1>
                <Link to="/categories/create">
                    Create Category 
                </Link>
        </>
    )
}