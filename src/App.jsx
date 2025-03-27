import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './pages/Categories/Index';
import Layout from './components/Layout';
import CategoryCreate from './pages/Categories/Create';
import CategoryEdit from './pages/Categories/Edit';
import ProductCreate from './pages/Products/Create';
import Product from './pages/Products/Index';
import Dashboard from './pages/Dashboard';
import ProductEdit from './pages/Products/Edit';
import Transaction from './pages/Transactions/Index';
import TransactionCreate from './pages/Transactions/TransactionCreate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Main Page Dashboard Sales */}
        <Route index element={<Dashboard />} />
        {/* Category */}
        <Route path="kategori" element={<Category />} >
          <Route path=":categoryId" element={<CategoryEdit />} />
        </Route>
        <Route path="kategori/tambah" element={<CategoryCreate />} />
        {/* Products */}
        <Route path="barang" element={<Product />} >
          <Route path=":productId" element={<ProductEdit />} />
        </Route>
        <Route path="barang/tambah" element={<ProductCreate />} />
        {/* Products */}
        <Route path="transaksi" element={<Transaction />} />
        <Route path="transaksi/tambah" element={<TransactionCreate />} />
      </Route>
  </Routes>
  );
}

export default App;