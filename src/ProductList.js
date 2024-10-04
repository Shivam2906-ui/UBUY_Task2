import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100 font-serif">
      {" "}
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        Product List
      </h1>
      <input
        type="text"
        placeholder="Search products..."
        className="mb-6 p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-white hover:bg-sky-100"
          >
            <div className="p-2">
              {" "}
              <img
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-48 object-contain"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg text-black truncate">
                {product.title}
              </h2>
              <p className="text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <p className="font-bold text-lg mt-2 text-yellow-500">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
