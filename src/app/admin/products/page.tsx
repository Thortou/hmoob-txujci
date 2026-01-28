"use client";

import { useState } from "react";

// Mock product data with images
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    stock: 45,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500"
    ]
  },
  {
    id: 2,
    name: "Product 2",
    price: 49.99,
    stock: 23,
    category: "Clothing",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500"
    ]
  },
  {
    id: 3,
    name: "Product 3",
    price: 19.99,
    stock: 67,
    category: "Books",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500"
    ]
  },
  {
    id: 4,
    name: "Product 4",
    price: 99.99,
    stock: 12,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500"
    ]
  },
  {
    id: 5,
    name: "Product 5",
    price: 39.99,
    stock: 0,
    category: "Clothing",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
    ]
  },
  {
    id: 6,
    name: "Product 6",
    price: 14.99,
    stock: 34,
    category: "Books",
    images: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"
    ]
  },
  {
    id: 7,
    name: "Product 7",
    price: 79.99,
    stock: 8,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
    ]
  },
  {
    id: 8,
    name: "Product 8",
    price: 24.99,
    stock: 56,
    category: "Clothing",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500"
    ]
  },
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stockToAdd, setStockToAdd] = useState("");
  const [productsList, setProductsList] = useState(products);

  const handleProductClick = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setStockToAdd("");
  };

  const handleClosePanel = () => {
    setSelectedProduct(null);
  };

  const handleNextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  const handleAddStock = () => {
    if (selectedProduct && stockToAdd) {
      const stockAmount = parseInt(stockToAdd);
      if (!isNaN(stockAmount) && stockAmount > 0) {
        setProductsList((prev) =>
          prev.map((p) =>
            p.id === selectedProduct.id
              ? { ...p, stock: p.stock + stockAmount }
              : p
          )
        );
        setSelectedProduct((prev) =>
          prev ? { ...prev, stock: prev.stock + stockAmount } : null
        );
        setStockToAdd("");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Products
        </h2>
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
          + Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Total Products</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {productsList.length}
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">In Stock</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {productsList.filter((p) => p.stock > 0).length}
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Out of Stock</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {productsList.filter((p) => p.stock === 0).length}
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Low Stock</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {productsList.filter((p) => p.stock > 0 && p.stock < 20).length}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
          />
          <select className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-zinc-700 dark:text-white">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsList.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <div className="h-48 bg-gray-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900 px-2 py-1 rounded">
                  {product.category}
                </span>
                {product.stock === 0 ? (
                  <span className="text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded">
                    Out of Stock
                  </span>
                ) : product.stock < 20 ? (
                  <span className="text-xs font-medium text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded">
                    Low Stock
                  </span>
                ) : (
                  <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                    In Stock
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Stock: {product.stock} units
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-sky-600 dark:text-sky-400">
                  ${product.price}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                  className="px-3 py-1 text-sm bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Panel */}
      {selectedProduct && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={handleClosePanel}
          ></div>

          {/* Panel */}
          <div className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={handleClosePanel}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Image Slideshow */}
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  {selectedProduct.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                      >
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                      >
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {selectedProduct.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProduct.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-white w-6"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </span>
                    <span className="px-3 py-1 text-sm font-medium text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900 rounded">
                      {selectedProduct.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Price
                    </span>
                    <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                      ${selectedProduct.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Current Stock
                    </span>
                    <span className="text-xl font-semibold text-gray-800 dark:text-white">
                      {selectedProduct.stock} units
                    </span>
                  </div>
                </div>

                {/* Add Stock Section */}
                <div className="border-t border-gray-200 dark:border-zinc-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Add Stock
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="1"
                      value={stockToAdd}
                      onChange={(e) => setStockToAdd(e.target.value)}
                      placeholder="Enter quantity"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
                    />
                    <button
                      onClick={handleAddStock}
                      disabled={!stockToAdd || parseInt(stockToAdd) <= 0}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      Add Stock
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-zinc-700">
                <button
                  onClick={handleClosePanel}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
