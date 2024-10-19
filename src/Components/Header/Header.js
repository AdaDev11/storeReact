import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {

return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Logo</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarMenu">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/products">Products</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contact">Contact</a>
                    </li>
                </ul>


            </div>
        </div>
    </nav>
);

}

export default Header;