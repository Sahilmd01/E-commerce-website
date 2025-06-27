import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { FiShoppingBag } from "react-icons/fi";

const CartTotal = ({ onCheckout }) => {
  const { currency, delivery_fee, getCartAmount, getCartCount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  const isEmpty = getCartCount() === 0;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <FiShoppingBag className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Please add some items to your cart</p>
          <Link 
            to="/collection" 
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">
                {currency}
                {subtotal.toFixed(2)}
              </p>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <p className="text-gray-600">Shipping Fee</p>
              <p className="font-medium">
                {currency}
                {delivery_fee.toFixed(2)}
              </p>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <p className="text-lg font-semibold text-gray-800">Total</p>
              <p className="text-lg font-bold text-indigo-600">
                {currency}
                {total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTotal;