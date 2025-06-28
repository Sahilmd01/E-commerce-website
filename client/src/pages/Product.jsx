import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [sizeError, setSizeError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const productImageRef = useRef(null);
  const cartIconRef = useRef(null);

  useEffect(() => {
    const item = products.find(p => p._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) return setSizeError(true);
    setSizeError(false);
    addToCart(productData._id, size);
    animateAddToCart();
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const animateAddToCart = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const img = productImageRef.current, icon = cartIconRef.current;
    if (!img || !icon) return setIsAnimating(false);

    const from = img.getBoundingClientRect(), to = icon.getBoundingClientRect();
    const flyingImg = Object.assign(document.createElement('img'), {
      src: image,
      style: {
        position: 'fixed', width: '50px', height: '50px', borderRadius: '4px',
        objectFit: 'cover', zIndex: '9999', pointerEvents: 'none',
        left: `${from.left + from.width / 2 - 25}px`,
        top: `${from.top}px`, transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    });
    document.body.appendChild(flyingImg);
    requestAnimationFrame(() => {
      flyingImg.style.left = `${to.left + to.width / 2 - 25}px`;
      flyingImg.style.top = `${to.top}px`;
      flyingImg.style.width = '20px';
      flyingImg.style.height = '20px';
      flyingImg.style.opacity = '0.7';
    });
    setTimeout(() => {
      flyingImg.remove();
      setIsAnimating(false);
    }, 500);
  };

  if (!productData) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-orange-500 rounded-full" />
    </div>
  );

  const { name, category, price, image: images, description, sizes, subCategory } = productData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Added to cart message */}
      {showAddedMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center animate-bounce">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-bold">🛍️! Added to cart</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 flex flex-col-reverse gap-6 lg:flex-row">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:w-24 scrollbar-hide">
            {images.map((img, i) => (
              <div key={i} onClick={() => setImage(img)} className={`w-20 h-20 lg:w-full lg:h-24 border-2 rounded-md overflow-hidden cursor-pointer transition-all ${image === img ? "border-orange-500" : "border-transparent"}`}>
                <img src={img} alt={name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden">
            <img ref={productImageRef} src={image} alt={name} className="w-full max-h-[600px] object-contain aspect-square" />
          </div>
        </div>

        <div className="flex-1 lg:max-w-md xl:max-w-lg">
          <div className="sticky top-24">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              <span className="text-xs font-medium px-2.5 py-0.5 bg-orange-100 text-orange-800 rounded">{category}</span>
            </div>
            <div className="flex items-center mt-3">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c..." /></svg>
              </div>
              <span className="ml-2 text-sm text-gray-500">(122 reviews)</span>
            </div>
            <p className="mt-6 text-3xl font-bold text-gray-900">{currency}{price.toLocaleString()}</p>
            <p className="mt-4 text-gray-600">{description}</p>

            <div className="mt-8">
              <div className="flex justify-between text-sm font-medium">
                <span>Select Size</span>
                {sizeError && <span className="text-red-500">Please select a size</span>}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s, i) => (
                  <button key={i} onClick={() => { setSize(s); setSizeError(false); }} className={`px-4 py-2 rounded-md border text-sm font-medium ${s === size ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAddToCart} className="mt-8 w-full py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-md flex items-center justify-center transition">
              <svg ref={cartIconRef} className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="..." /></svg>
              ADD TO CART
            </button>

            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4 text-sm text-gray-500">
              {["100% Original Products", "Cash On Delivery available", "Easy 7-day returns & exchanges"].map((text, i) => (
                <div key={i} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                  <p className="ml-3">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <nav className="border-b border-gray-200 -mb-px flex">
          {["description", "reviews"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === tab ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
              {tab === "reviews" ? "Reviews (122)" : "Description"}
            </button>
          ))}
        </nav>
        <div className="py-8">
          {activeTab === "description" ? (
            <div className="prose prose-sm text-gray-500">
              <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet...</p>
              <p className="mt-4">E-commerce websites typically display products or services along with detailed descriptions, images, prices...</p>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No reviews yet</h3>
              <p className="mt-1 text-sm">Be the first to review this product</p>
              <a
                href="/NotFound"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-orange-500"
              >
                Write a review
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
        <RelatedProducts category={category} subCategory={subCategory} />
      </div>
    </div>
  );
};

export default Product;