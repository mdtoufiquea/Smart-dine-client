import React, { useContext } from 'react';
import Navbar from '../Home/Navbar/Navbar';
import { Link, Outlet } from 'react-router';
import Footer from '../Home/Footer/Footer';
import { AuthContext } from '../Contexts/AuthContext';
import Register from '../Pages/Register/Register';
import { LogIn } from 'lucide-react';
import Login from '../Pages/Register/Login';

const Root = () => {
    const { user, loading } = useContext(AuthContext);


    if (loading) {
        <span className="loading loading-spinner loading-xl r"></span>
    }
    return (
        <div>
            <Navbar></Navbar>

            {
                user? <Outlet></Outlet> : <div> <div><Login></Login> </div> <h1 className='text-3xl font-bold text-center relative md:-top-20'>or</h1>
                   <div className='relative md:-top-39'> <Register></Register></div>
                </div>
            }
           
            <Footer></Footer>
        </div>
    );
};

export default Root;