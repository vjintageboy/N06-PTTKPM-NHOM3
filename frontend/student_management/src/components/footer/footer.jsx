import { Footer } from "antd/es/layout/layout";
const FooterComponent = () => {
    return (
        <Footer
            style={{
                textAlign: "center",
            }}
        >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    );
};

export default FooterComponent;
