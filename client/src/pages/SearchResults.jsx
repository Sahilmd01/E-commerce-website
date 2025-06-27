// pages/SearchResults.jsx
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SearchResults = () => {
  const { searchQuery, searchResults } = useContext(ShopContext);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Search Results for: <span className="text-primary">"{searchQuery}"</span>
        </h1>
        <p className="text-gray-600">
          {searchResults.length} {searchResults.length === 1 ? "item" : "items"} found
        </p>
      </div>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any products matching your search. Try different keywords.
            </p>
            <Link
              to="/collection"
              className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="relative overflow-hidden h-64 bg-white">
                <Swiper spaceBetween={0} slidesPerView={1}>
                  {product.image?.map((imgUrl, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={imgUrl}
                        alt={`${product.name} - ${index + 1}`}
                        loading="lazy"
                        className="w-full h-64 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {product.discount && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
