import React from 'react';
import { Link } from 'react-router-dom';

import { BiSolidCategory } from "react-icons/bi";
import { HiCube } from 'react-icons/hi';
import { IoDocument } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { FaLayerGroup, FaObjectUngroup } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-4">
      <div className="mb-8">
        <Link to="/" className="text-2xl font-bold text-center">Product Sales</Link>
      </div>
      
      <nav>
        <ul>
          <li className="mb-2">
            <Link 
              to="/" 
              className="flex items-center p-2 hover:bg-gray-100 rounded"
            >
              <IoMdHome />
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/categories" 
              className="flex items-center p-2 hover:bg-gray-100 rounded"
            >
            <FaObjectUngroup />
              Kategori
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/products" 
              className="flex items-center p-2 hover:bg-gray-100 rounded"
            >
              <HiCube />
              Produk
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/transactions" 
              className="flex items-center p-2 hover:bg-gray-100 rounded"
            >
              <IoDocument />
              Transaksi
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;