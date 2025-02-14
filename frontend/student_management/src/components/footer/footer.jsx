import { Footer } from "antd/es/layout/layout";
const FooterComponent = () => {
    return (
        <Footer
            style={{
                textAlign: "center",
                background: "rgba(0,32,109,0.85)",
            }}
        >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    );
};

export default FooterComponent;
