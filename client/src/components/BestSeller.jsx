import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);

  // Get latest bestsellers first
  const bestSellers = [...products]
    .filter((item) => item.bestseller)
    .reverse(); // most recently added first

  const productsPerPage = 5;
  const totalPages = Math.ceil(bestSellers.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const currentProducts = bestSellers.slice(start, start + productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-0">
      <div className="text-center mb-12">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-500 font-light tracking-wide">
          Exquisite selections adored by our most discerning clientele. Each piece embodies unparalleled craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {currentProducts.map(({ _id, image, name, price }) => (
          <ProductsItem
            key={_id}
            id={_id}
            image={image}
            name={name}
            price={price}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm border rounded transition-all duration-200 ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
