import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLatestProducts([...products].reverse().slice(0, 10));
    }
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <section className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl font-light tracking-widest text-gray-500">
          LOADING PRODUCTS...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <Title text1="LATEST" text2="COLLECTIONS" />
          </div>
          <p className="max-w-2xl mx-auto text-sm font-light tracking-wide text-gray-500 leading-relaxed">
            Discover our exclusive curation of premium pieces that redefine modern elegance.
            Each item is meticulously selected to embody timeless sophistication.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {latestProducts.map((item) => (
            <ProductsItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

        {/* View More */}
        <div className="mt-16 text-center">
          <a
            href="/collection"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="border border-black bg-transparent hover:bg-black hover:text-white transition-all duration-300 px-8 py-3 text-sm tracking-widest font-light">
              VIEW FULL COLLECTION
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
