import React, { useState, useEffect } from "react";
import axios from "axios";
import { backEndURL, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${backEndURL}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        // Sort orders by date (newest first)
        const sortedOrders = response.data.orders.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backEndURL}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Order Placed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-800 p-6 text-white">
        <h1 className="text-2xl font-light tracking-wide flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Order Management
        </h1>
        <p className="text-indigo-200 mt-1">View and manage customer orders</p>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-gray-500">New orders will appear here</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Order Summary */}
                  <div className="lg:col-span-5">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 bg-gray-100 p-3 rounded-lg">
                        <img src={assets.parcel_icon} alt="Order" className="h-8 w-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          {order.items.map((item, index) => (
                            <p key={index}>
                              {item.name} × {item.quantity} {item.size && `(${item.size})`}
                              {index < order.items.length - 1 && ','}
                            </p>
                          ))}
                        </div>
                        <div className="mt-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="lg:col-span-4">
                    <div className="bg-gray-50 p-4 rounded-lg h-full">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Customer</h4>
                      <p className="text-gray-900 font-medium">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.address.street}, {order.address.city}<br />
                        {order.address.state}, {order.address.country}, {order.address.zipCode}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {order.address.phone}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="lg:col-span-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Date</h4>
                        <p className="text-gray-900">
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Items</h4>
                        <p className="text-gray-900">{order.items.length}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Payment</h4>
                        <p className={`font-medium ${
                          order.payment ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {order.payment ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Total</h4>
                        <p className="text-gray-900 font-medium">
                          {currency}{order.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Status Selector */}
                    <div className="mt-4">
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                        value={order.status}
                        onChange={(e) => statusHandler(e, order._id)}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Order Shipped">Order Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;