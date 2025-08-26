import { createBrowserRouter } from "react-router-dom";
import Home from './pages/page_1';
import SecondPage from "./pages/page_2";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },

    {
        path: "/page2",
        element: <SecondPage/>
    }
])