import "./header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <Link className="logo" to="/">Prime Flix</Link>
            <Link className="favs" to="/favoritos">My movies</Link>
        </header>
    );
}

export default Header;