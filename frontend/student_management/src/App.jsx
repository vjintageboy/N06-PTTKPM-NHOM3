import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import StudentPage from "./pages/students/studentPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import DepartmentPage from "./pages/departments/departmentPage";
import ProfilePage from "./pages/profile/profilePage";
import GradePage from "./pages/grades/gradePage";
import DashboardPage from "./pages/dashboard/dashboardPage";
import SubjectPage from "./pages/subjects/subjectPage";
import SideBar from "./components/sidebar/sidebar";

const Layout = () => {
    return (
        <div className="layout-app">
            <Header />
            <SideBar>
                <Outlet />
            </SideBar>
            <Footer />
        </div>
    );
};

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <DashboardPage /> },
                {
                    path: "/students",
                    element: <StudentPage />,
                },
                {
                    path: "/departments",
                    element: <DepartmentPage />,
                },
                {
                    path: "profile",
                    element: <ProfilePage />,
                },
                {
                    path: "grades",
                    element: <GradePage />,
                },
                {
                    path: "subjects",
                    element: <SubjectPage />,
                },
            ],
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;