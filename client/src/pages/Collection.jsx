import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductsItem from "../components/ProductsItem";
import { FiFilter, FiChevronDown, FiX } from "react-icons/fi";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default for mobile

  const categories = ["Men", "Women", "Kids"];
  const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        setItemsPerPage(8);
      } else if (window.innerWidth < 768) { // Tablet
        setItemsPerPage(9);
      } else if (window.innerWidth < 1024) { // Small desktop
        setItemsPerPage(12);
      } else { // Large desktop
        setItemsPerPage(16);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relevent");
  };

  const sortProducts = (items) => {
    switch (sortType) {
      case "low-high":
        return [...items].sort((a, b) => a.price - b.price);
      case "high-low":
        return [...items].sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  };

  const applyFilter = useMemo(() => {
    let result = [...products];

    if (showSearch && search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      result = result.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      result = result.filter((item) => subCategory.includes(item.subCategory));
    }

    result = sortProducts(result);
    setFilterProducts(result);
    setCurrentPage(1);
  }, [category, subCategory, search, showSearch, sortType, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);
  const currentItems = useMemo(() => {
    return filterProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filterProducts, currentPage, itemsPerPage]);

  const FilterSection = () => (
    <>
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-sm font-medium">CATEGORIES</h3>
        <div className="space-y-3 mt-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center space-x-3">
              <input
                type="checkbox"
                value={cat}
                checked={category.includes(cat)}
                onChange={toggleCategory}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-sm font-medium">TYPE</h3>
        <div className="space-y-3 mt-3">
          {subCategories.map((sub) => (
            <label key={sub} className="flex items-center space-x-3">
              <input
                type="checkbox"
                value={sub}
                checked={subCategory.includes(sub)}
                onChange={toggleSubCategory}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{sub}</span>
            </label>
          ))}
        </div>
      </div>

      {(category.length > 0 || subCategory.length > 0) && (
        <button
          onClick={clearFilters}
          className="text-sm text-indigo-600 hover:text-indigo-500 mt-4"
        >
          Clear all filters
        </button>
      )}
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-0">
      {/* Mobile filter dialog */}
      <div className={`fixed inset-0 z-40 lg:hidden ${mobileFiltersOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
        <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto">
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="text-lg font-medium">Filters</h2>
            <button 
              onClick={() => setMobileFiltersOpen(false)} 
              className="p-2"
              aria-label="Close filters"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">{FilterSection()}</div>
        </div>
      </div>

      <div className="pt-6 sm:pt-10 pb-8 sm:pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
            <button
              type="button"
              className="lg:hidden flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 px-2 py-1 sm:px-0"
              onClick={() => setMobileFiltersOpen(true)}
              aria-label="Open filters"
            >
              <FiFilter className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-xs sm:text-sm">Filters</span>
            </button>

            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-2 pr-8 py-1 sm:pl-3 sm:pr-10 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                aria-label="Sort by"
              >
                <option value="relevent">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 sm:pr-2">
                <FiChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 sm:gap-x-8">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block space-y-6">{FilterSection()}</div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            {currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 gap-y-4 sm:gap-y-8">
                  {currentItems.map((item) => (
                    <ProductsItem
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 sm:mt-12">
                    <nav className="flex items-center space-x-1 sm:space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-medium ${
                            num === currentPage
                              ? "bg-indigo-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          aria-label={`Go to page ${num}`}
                        >
                          {num}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                  Try adjusting your search or filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-3 sm:mt-4 px-3 py-1 sm:px-4 sm:py-2 bg-indigo-600 text-white text-xs sm:text-sm rounded-md hover:bg-indigo-700"
                  aria-label="Clear all filters"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;