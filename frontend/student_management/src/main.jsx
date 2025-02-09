import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.scss";
import { UserProvider } from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <UserProvider>
        <App />
    </UserProvider>

    // </StrictMode>
);
