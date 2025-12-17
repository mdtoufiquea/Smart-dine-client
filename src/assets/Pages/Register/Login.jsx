import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { signIn, signInWithGoogle, setUser } = useContext(AuthContext); // setUser include
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userData = {
        name: user.displayName || "",
        phone: user.phoneNumber || "",
        photoURL: user.photoURL || "",
        email: user.email,
        uid: user.uid,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("https://smart-dine-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      // 🔹 Set current user in context if inserted or already exists
      setUser({
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        phone: user.phoneNumber || "",
        role: "user",
      });

      if (data.insertedId || data.success) {
        Swal.fire({
          icon: "success",
          title: "Logged in!",
          text: `Welcome ${user.displayName}`,
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Already logged in",
          text: "Your data is already in the database",
        });
      }
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message
      });
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const user = await signIn(email, password);

      // 🔹 Set current user in context
      setUser({
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        phone: user.phoneNumber || "",
        role: "user", 
      });

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: "Login Successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/'); // redirect
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
      });
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-200 w-full max-w-sm shadow-2xl mx-auto p-1 md:my-20">
      <h1 className="text-3xl font-bold text-center">Login now</h1>
      <div className="card-body">
        <form onSubmit={handleLogin} className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Enter Your Email" name='email' required />

          <label className="label">Password</label>
          <label className="input validator relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              name="password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="flex-1 pr-8"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </label>

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4 w-full">Login</button>
        </form>

        <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Login with Google
        </button>

        <h1 className='text-center mt-3'>
          You have no account? Please <span className='text-blue-500 font-bold underline '>
            <Link to='/register'>Register</Link>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Login;
