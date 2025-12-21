import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";


const Profile = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }


    return (
        <div className=" rounded-2xl shadow-2xl md:h-150 lg:h-200 lg:w-200 mx-auto"  style={{
       background: "linear-gradient(to right, #fef3c7, #fbcfe8, #bbf7d0, #bfdbfe, #e9d5ff, #fecaca, #fef08a, #e0e7ff)"
     }}>
            {user.photoURL ? (
                <img
                    className="mx-auto w-35 h-35 md:w-60 md:h-60  rounded-full object-cover shadow-md relative top-5 md:top-10"
                    src={user.photoURL}
                    alt={user.displayName}
                />
            ) : (
                <img className="mx-auto w-35 h-35 md:w-60 md:h-60  rounded-full object-cover shadow-md relative top-5 md:top-10" src="https://i.ibb.co.com/Z6J3ZZWB/blank-profile-picture-973460-640.webp" alt={user.displayName} />
            )}
            <h1 className="md:text-xl font-bold text-center pt-10 md:pt-18">
                Name: {user.displayName || "N/A"}
            </h1>
            <h1 className="md:text-xl font-bold text-center py-1">
                Email: {user.email || "N/A"}
            </h1>
            <h1 className="md:text-xl font-bold text-center py-1">
                Number: {user.phoneNumber || "N/A"}
            </h1>
            <h1 className="md:text-xl font-bold text-center py-1">
                Role: {user.role || "N/A"}
            </h1>
        </div>

    );
};

export default Profile;
