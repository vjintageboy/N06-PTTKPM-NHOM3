import "./header.scss";
import logo from "../../assets/pka-logo.jpg";

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="user-login">Nguyen Cao Chien</div>
            </div>
        </div>
    );
};

export default Header;
