import { Footer } from "antd/es/layout/layout";
const FooterComponent = () => {
    return (
        <Footer
            style={{
                textAlign: "center",
                background: "rgba(0,32,109,0.85)",
            }}
        >
            Team Nhom 3 - PTTKPM - {new Date().getFullYear()} || Created by CX company
        </Footer>
    );
};

export default FooterComponent;
