import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
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
        path:'/register',
        Component: Register
      },
      {
        path: '/about',
        Component: About
      },
      {
        path:'/see-menu',
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
        path:'all-users',
        Component: AllUsers
      },
      {
        path:'all-menu',
        Component: AllMenu
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
