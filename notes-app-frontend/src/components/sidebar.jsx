
import { Link } from "react-router-dom";
import style from './sidebar.module.css'

export function SiderBar() {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}