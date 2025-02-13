import { Footer } from "antd/es/layout/layout";
const FooterComponent = () => {
    return (
        <Footer
            style={{
                textAlign: "center",
                background: " #003366",
            }}
        >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    );
};

export default FooterComponent;
