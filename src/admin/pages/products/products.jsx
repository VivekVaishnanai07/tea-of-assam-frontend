import { AlertTriangle, DollarSign, Edit, Package, Trash2, TrendingUp } from "lucide-react";
import React, { useState } from 'react';
import Table from "../../components/table/table";
import "./products.css";

const Product_Data = [
  { id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
  { id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 900 },
  { id: 3, name: "Smart Watch", category: "Electronics", price: 399.99, stock: 56, sales: 650 },
  { id: 4, name: "Yoga Mat", category: "Fitness", price: 299.99, stock: 220, sales: 950 },
  { id: 5, name: "Coffee Maker", category: "Home Usage", price: 49.99, stock: 190, sales: 720 },
  { id: 6, name: "Running Shoes", category: "Footwear", price: 89.99, stock: 120, sales: 430 },
  { id: 7, name: "Gaming Headset", category: "Electronics", price: 69.99, stock: 65, sales: 780 },
  { id: 8, name: "Cookware Set", category: "Kitchen", price: 109.99, stock: 45, sales: 580 },
  { id: 9, name: "Bluetooth Speaker", category: "Electronics", price: 29.99, stock: 200, sales: 1150 },
  { id: 10, name: "Vacuum Cleaner", category: "Home Appliances", price: 149.99, stock: 30, sales: 390 },
  { id: 11, name: "Portable Charger", category: "Electronics", price: 19.99, stock: 300, sales: 1400 },
  { id: 12, name: "Hand Mixer", category: "Kitchen", price: 79.99, stock: 50, sales: 275 },
  { id: 13, name: "Electric Toothbrush", category: "Personal Care", price: 89.99, stock: 80, sales: 640 },
  { id: 14, name: "Laptop Stand", category: "Office Supplies", price: 45.99, stock: 120, sales: 350 },
  { id: 15, name: "Desk Lamp", category: "Home Decor", price: 39.99, stock: 110, sales: 300 },
];

const columns = [
  { key: "name", label: 'Name' },
  { key: "category", label: 'Category' },
  { key: "price", label: "Price", render: (value) => `$${value.toFixed(2)}` },
  { key: "stock", label: 'Stock' },
  { key: "sales", label: 'Sales' },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(Product_Data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const SearchHandler = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = Product_Data.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const getCurrentPageProducts = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  };

  const actions = [
    { icon: <Edit size={18} />, className: 'edit-btn', onClick: () => handleEdit() },
    { icon: <Trash2 size={18} />, className: 'delete-btn', onClick: (row) => handleDelete(row.id) },
  ];

  return (
    <div className="admin-products-wrapper">
      <div className="top-section">
        <div className="card-item">
          <div className="card-header">
            <Package size={22} style={{ color: "#6366f1", marginRight: "0.5rem" }} />
            Total Products</div>
          <div className="card-content">4,321</div>
        </div>
        <div className="card-item">
          <div className="card-header">
            <TrendingUp size={22} style={{ color: "#10b981", marginRight: "0.5rem" }} />
            Top Selling</div>
          <div className="card-content">69</div>
        </div>
        <div className="card-item">
          <div className="card-header">
            <AlertTriangle size={22} style={{ color: "#f59e0b", marginRight: "0.5rem" }} />
            Low Stock</div>
          <div className="card-content">32</div>
        </div>
        <div className="card-item">
          <div className="card-header">
            <DollarSign size={22} style={{ color: "#ef4444", marginRight: "0.5rem" }} />
            Total Revenue</div>
          <div className="card-content">$654,310</div>
        </div>
      </div>
      <Table tableTitle="Products" searchBarValue={searchTerm} searchBarOnChange={SearchHandler} columns={columns} data={getCurrentPageProducts()} actions={actions} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredProducts.length} />
    </div>
  )
}

export default Products;