import { AlertTriangle, DollarSign, Edit, Package, Trash2, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProductsData, getProductsList } from "../../../store/features/admin/products/thunk";
import { formatPrice } from "../../../utils/util";
import Card from "../../components/card/card";
import Table from "../../components/table/table";
import ProductModal from "./product-modal/product-modal";
import "./products.css";

const columns = [
  { key: "name", label: 'Name' },
  { key: "category", label: 'Category' },
  { key: "price", label: "Price", render: (value) => `$${value.toFixed(2)}` },
  { key: "stock", label: 'Stock' },
  { key: "sales", label: 'Sales' },
];

const Products = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const productsItem = useSelector((state) => state.adminProducts.productData);
  const productList = useSelector((state) => state.adminProducts.productList);

  const [paginatedProducts, setPaginatedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([dispatch(getProductsData()), dispatch(getProductsList())])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (productList) {
      setFilteredProducts(productList);
    }
  }, [productList]);

  useEffect(() => {
    if (filteredProducts) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      setPaginatedProducts(filteredProducts.slice(startIndex, startIndex + itemsPerPage));
    }
  }, [filteredProducts, currentPage]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = productList.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const actions = [
    { icon: <Edit size={18} />, className: 'edit-btn', onClick: (row) => setProductToEdit(row) },
    { icon: <Trash2 size={18} />, className: 'delete-btn', onClick: (row) => console.log("Delete", row.id) },
  ];

  return (
    <div className="admin-products-wrapper">
      {loading ? "Loading...." : (
        <>
          <div className="top-section">
            <Card icon={Package} title="Total Products" color="#6366f1" data={`${formatPrice(productsItem.totalProducts)}`} />
            <Card icon={TrendingUp} title="Top Selling" color="#10b981" data={`${formatPrice(productsItem.topSelling)}`} />
            <Card icon={AlertTriangle} title="Low Stock" color="#f59e0b" data={`${formatPrice(productsItem.lowStock)}`} />
            <Card icon={DollarSign} title="Total Revenue" color="#ef4444" data={`$${formatPrice(productsItem.totalRevenue)}`} />
          </div>
          <div className="add-product-section">
            <button className="add-product-btn" onClick={() => setIsOpen(true)}>Add Product</button>
          </div>
          <Table
            tableTitle="Products"
            searchBarValue={searchTerm}
            searchBarOnChange={handleSearch}
            columns={columns}
            data={paginatedProducts}
            actions={actions}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={filteredProducts.length}
          />
        </>
      )}
      <ProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
      />
    </div>
  );
};

export default Products;