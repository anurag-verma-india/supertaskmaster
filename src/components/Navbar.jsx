import NavbarGoogleLogin from "../components/NavbarGoogleLogin";
import STLogo from "../assets/four-logo.svg";

const Navbar = () => {
    return (
        <div className="main-title-navbar">
            <img
                style={{ height: "2rem", paddingRight: "10px" }}
                className="main-logo-img"
                src={STLogo}
                alt="Edit"
            />
            <h1>Super Taskmaster</h1>
            <NavbarGoogleLogin />
        </div>
    );
};

export default Navbar;
