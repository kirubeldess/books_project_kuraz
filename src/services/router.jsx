import { createBrowserRouter } from "react-router-dom";
import BookDetail from "../pages/BookDetail";
import Signup from "../pages/Signup";
import Signin from "../pages/Login";
import Categories from "../pages/Category";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import { PrivateRoute } from "./PrivateRoute";
import HomePage from "../pages/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: '/login',
        element: <Signin />
    },
    {
        path: '/register',
        element: <Signup />
    },
    {
        path: '/categories',
        element: <Categories />
    },
    {
        path: '/search',
        element: <Search />
    },

    // Dynamic Routes
    {
        path: '/book/:id',
        element: <BookDetail />
    },
    {
        path: '/details/:id',
        element: <BookDetail />
    },

    // Category-specific routes (optional)
    {
        path: '/categories/:category',
        element: <Search /> // Reuse search component with category filter
    },

    // Protected Routes
    {
        path: '/favorites',
        element: <PrivateRoute><Favorites /></PrivateRoute>
    },

    // Catch-all route for 404
    {
        path: '*',
        element: <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="text-orange-500 hover:text-orange-600">Go back home</a>
            </div>
        </div>
    }
]);