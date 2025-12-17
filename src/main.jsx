import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './assets/Root/Root.jsx';
import Home from './assets/Home/Home/Home.jsx';
import AuthProvider from './assets/Contexts/AuthProvider.jsx';
import Login from './assets/Pages/Register/Login.jsx';
import Register from './assets/Pages/Register/Register.jsx';
import About from './assets/Component/About.jsx';
import AdminDashboard from './assets/AdminDashboard/AdminDashboard.jsx';
import AddMenu from './assets/AdminDashboard/AddMenu.jsx';
import SeeMenu from './assets/Component/SeeMenu.jsx';
import AllUsers from './assets/Component/AllUsers.jsx';
import AllMenu from './assets/AdminDashboard/AllMenu.jsx';
import UserDashboard from './assets/UserDashboard/UserDashboard.jsx';
import Profile from './assets/UserDashboard/Profile.jsx';
import CartProvider from './assets/Contexts/CartContext.jsx';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AllOderMenu from './assets/AdminDashboard/AllOderMenu.jsx';
import MyOderMenu from './assets/UserDashboard/MyOderMenu.jsx';


const stripePromise = loadStripe("pk_test_51SDMVdGwiQeG7S29kVPT7kInhIWqPmd289GQ7nPhlOHxIXHx1aMfmu60ecGOTkSZmBMU54h52vuXCPoM7aLxT3FY00jqQ4ppcC");
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/see-menu',
        Component: SeeMenu
      }
    ]
  },
  {
    path: '/admin-dashboard',
    Component: AdminDashboard,
    children: [
      {
        index: true,
        Component: AddMenu
      },
      {
        path: 'all-users',
        Component: AllUsers
      },
      {
        path: 'all-menu',
        Component: AllMenu
      },
      {
        path: 'all-oder-menus',
        Component: AllOderMenu
      }
    ]
  },
  {
    path: '/user-dashboard',
    Component: UserDashboard,
    children: [
      {
        index: true,
        Component: Profile
      },
      {
        path: 'my-orders',
        Component: MyOderMenu
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
