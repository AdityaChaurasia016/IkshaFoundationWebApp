import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/IkshaFoundationLogo.avif'

const Navbar1 = () => {
  return (
    <nav className=" p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo or Image */}
        <img src={Logo} alt="" className="h-[90px] w-[110px]" />

        {/* Right: Navigation Options */}
        <div className="flex space-x-6 text-red-900 font-semibold">
          <Link to="/" className="hover:text-gray-900">Maps</Link>
          <Link to="/books" className="hover:text-gray-900">Book Management System</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
