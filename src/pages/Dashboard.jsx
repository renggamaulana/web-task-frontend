import React from 'react';
import { 
  CubeIcon, 
  DocumentIcon 
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { HiMiniRectangleGroup } from 'react-icons/hi2';
import MainContainer from '../components/MainContainer';

function Dashboard() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <MainContainer>
            <div className="grid grid-cols-3 gap-4">
                {/* Card Kategori */}
                <Link to="kategori">
                    <div className="p-6 rounded-lg bg-black/30 hover:bg-white/10 transition">
                    <div className="flex justify-between items-center">
                        <div>
                        <h2 className="text-xl font-semibold">Kategori</h2>
                        <p className="text-3xl font-bold">15</p>
                        </div>
                        <HiMiniRectangleGroup className="h-12 w-12 text-amber-500"/>
                    </div>
                    </div>
                </Link>

                {/* Card Produk */}
                <Link to="barang">
                    <div className="p-6 rounded-lg bg-black/30 hover:bg-white/10 transition">
                    <div className="flex justify-between items-center">
                        <div>
                        <h2 className="text-xl font-semibold">Produk</h2>
                        <p className="text-3xl font-bold">50</p>
                        </div>
                        <CubeIcon className="h-12 w-12 text-green-500" />
                    </div>
                    </div>
                </Link>

                {/* Card Transaksi */}
                <Link to="transaksi">
                    <div className="p-6 rounded-lg bg-black/30 hover:bg-white/10 transition">
                    <div className="flex justify-between items-center">
                        <div>
                        <h2 className="text-xl font-semibold">Transaksi</h2>
                        <p className="text-3xl font-bold">100</p>
                        </div>
                        <DocumentIcon className="h-12 w-12 text-purple-500" />
                    </div>
                    </div>
                </Link>
            </div>
        </MainContainer>
    </div>
  );
}

export default Dashboard;