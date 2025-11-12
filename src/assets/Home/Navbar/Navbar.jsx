import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import SmartDine from '../../Component/SmartDine';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user)
  const links = <>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/see-menu'>See Menu</NavLink>
    <NavLink to='/about'>About</NavLink>
    <NavLink to='/admin-dashboard'>Admin Dashboard</NavLink>
    <NavLink>User Dashboard</NavLink>
  </>


  const handleLogout = async () => {
    try {
      await logOut(); 
      Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <div className="navbar bg-sky-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-gray-300 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-1 font-bold">
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost relative right-5 md:right-0 text-xl"><SmartDine></SmartDine></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-5 text-xl">
            {links}
          </ul>
        </div>

        <div className="navbar-end">

          {user && (
            <div className="flex">
              <p className="hidden md:hidden lg:block my-auto text-xl font-semibold mr-5">
                {user.displayName}
              </p>
              <NavLink>
                <img
                  className="rounded-full w-8 h-8 md:mr-3 mr-1 border-b-gray-950 border-1"
                  src={user.photoURL}
                  alt={user.displayName}
                />
              </NavLink>
            </div>
          )}

          {
            user ? <Link> <a onClick={handleLogout} className=" btn btn-sm lg:btn-lg bg-black text-white">Logout</a></Link> : <Link to='/login'> <a className=" btn btn-sm lg:btn-lg bg-black text-white">Login</a></Link>
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;