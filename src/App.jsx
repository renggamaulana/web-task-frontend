import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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
        <Route path="categories" element={<Category />} />
        <Route path="categories/create" element={<CategoryCreate />} />
        <Route path="categories/edit/:id" element={<CategoryEdit />} />
        {/* Products */}
        <Route path="products" element={<Product />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="products/edit:/" element={<ProductEdit />} />
        {/* Products */}
        <Route path="transactions" element={<Transaction />} />
        <Route path="transactions/create" element={<TransactionCreate />} />
      </Route>
  </Routes>
  );
}

export default App;