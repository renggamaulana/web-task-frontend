import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { HiCube } from 'react-icons/hi';
import { IoDocument } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { HiMiniRectangleGroup } from 'react-icons/hi2';

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === "/") {
          return location.pathname === "/" ? "bg-gray-900 font-semibold" : "";
        }
        return location.pathname.includes(path) ? "bg-gray-900 font-semibold" : "";
      };
  return (
    <div className="w-64 text-white bg-white/5 rounded-lg p-4 m-5">
      <div className="mb-8">
        <Link to="/" className="text-2xl font-bold text-center">Penjualan Barang</Link>
      </div>
      
      <nav>
        <ul>
          <li className="mb-2">
            <Link 
              to="/" 
              className={`flex items-center p-2 hover:bg-gray-800 hover:font-semibold transition duration-300 rounded-xl gap-3 ${isActive("/")}`}
            >
              <IoMdHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/kategori" 
              className={`flex items-center p-2 hover:bg-gray-800 hover:font-semibold transition duration-300 rounded-xl gap-3 ${isActive("/kategori")}`}
            >
            <HiMiniRectangleGroup />
              <span>Kategori</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/barang" 
              className={`flex items-center p-2 hover:bg-gray-800 hover:font-semibold transition duration-300 rounded-xl gap-3 ${isActive("/barang")}`}
            >
              <HiCube />
              <span>Barang</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/transaksi" 
              className={`flex items-center p-2 hover:bg-gray-800 hover:font-semibold transition duration-300 rounded-xl gap-3 ${isActive("/transaksi")}`}
            >
              <IoDocument />
              <span>Transaksi</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;