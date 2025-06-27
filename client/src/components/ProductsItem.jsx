import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductsItem = ({ id, image, name, price }) => {
  const images = Array.isArray(image) ? image : [image];

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      to={`/product/${id}`}
      onClick={handleClick}
      className="group border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
    >
      {/* Image Carousel */}
      <div className="relative overflow-hidden h-64 bg-white">
        <Swiper spaceBetween={0} slidesPerView={1}>
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`${name} - ${idx + 1}`}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-base mb-1 text-gray-900 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <span className="text-sm text-gray-700 font-medium">${price}</span>
      </div>
    </Link>
  );
};

export default ProductsItem;
