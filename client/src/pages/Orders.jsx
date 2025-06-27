import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets"; //use untill no backend connection after that no use
import { toast } from "react-toastify";
import axios from "axios";
import { FiRefreshCw, FiTruck, FiPackage, FiCheckCircle, FiXCircle } from "react-icons/fi";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      setIsLoading(true);
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = new Date(order.date);
            allOrdersItem.push(item);
          });
        });
        
        // Sort by date (newest first)
        allOrdersItem.sort((a, b) => b.date - a.date);
        
        setOrderData(allOrdersItem);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Cancelled":
        return <FiXCircle className="text-red-500" />;
      case "Delivered":
        return <FiCheckCircle className="text-green-600" />;
      case "Packing":
      case "Order Shipped":
        return <FiTruck className="text-blue-500" />;
      default:
        return <FiPackage className="text-gray-500" />;
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-2xl mb-6">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing {orderData.length} orders
          </p>
          <button
            onClick={loadOrderData}
            disabled={isLoading}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
          >
            <FiRefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {orderData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't placed any orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderData.map((item, index) => (
              <div
                key={index}
                className="py-4 border rounded-lg px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <img 
                    src={item.image[0]} 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" 
                    alt={item.name} 
                  />
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-medium">{item.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                      <p>
                        {currency}
                        {item.price.toFixed(2)}
                      </p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 space-y-1">
                      <p>
                        Ordered on:{" "}
                        <span className="font-medium">
                          {item.date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </p>
                      <p>
                        Payment:{" "}
                        <span className="font-medium">{item.paymentMethod}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="sm:w-1/3 flex flex-col sm:items-end gap-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <p className={`text-sm sm:text-base ${
                      item.status === "Cancelled" ? "text-red-500" :
                      item.status === "Delivered" ? "text-green-600" :
                      item.status === "Packing" || item.status === "Order Shipped" ? "text-blue-500" :
                      "text-gray-700"
                    }`}>
                      {item.status}
                    </p>
                  </div>
                  <button
                    className="border border-gray-300 px-3 py-1.5 text-xs sm:text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      // Implement track order functionality
                      toast.info("Tracking information will be available soon");
                    }}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
