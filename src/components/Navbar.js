// components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger & close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold hover:text-blue-400">
          Creative Upaay Dashboard
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/reports" className="hover:text-blue-400">
            Reports
          </Link>
          <Link to="/analytics" className="hover:text-blue-400">
            Analytics
          </Link>
          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 pb-4 bg-gray-800 rounded-lg shadow-md">
          <Link to="/" className="hover:text-blue-400" onClick={toggleMenu}>
            Home
          </Link>
          <Link
            to="/reports"
            className="hover:text-blue-400"
            onClick={toggleMenu}
          >
            Reports
          </Link>
          <Link
            to="/analytics"
            className="hover:text-blue-400"
            onClick={toggleMenu}
          >
            Analytics
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-400"
            onClick={toggleMenu}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
