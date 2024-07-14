import { ReactElement } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthRender from "../common/renderProps/AuthRender";
import RootLayout from "../layout/RootLayout";
import AboutCarRentalPerson from "../pages/AboutCarRentalPerson";
import HomePage from "../pages/Homepage";
import RentalPage from "../pages/RentalPage";
import RentalDetailPage from "../pages/RentalDetailPage";

interface RouteObject {
    path: string;
    element: ReactElement;
    children?: RouteObject[];
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRender render={() => <RootLayout />} />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/aboutus",
                element: <AboutCarRentalPerson />
            },
            {
                path: "/rental",
                element: <RentalPage />
            },
            {
                path: "/rental/detail",
                element: <RentalDetailPage />
            }
        ]
    }
] as RouteObject[]); 

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;