import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);
    setBestSellers(bestProducts);
  }, [products]);

  // Pagination logic
  const totalPages = Math.ceil(bestSellers.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const currentProducts = bestSellers.slice(startIdx, startIdx + productsPerPage);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-500 font-light tracking-wide">
          Exquisite selections adored by our most discerning clientele. Each piece embodies unparalleled craftsmanship.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {currentProducts.map((item) => (
          <ProductsItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm border ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              } transition-all duration-200 rounded`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
