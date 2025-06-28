import { assets } from "../assets/assets";
import { FiRefreshCw, FiShield, FiHeadphones, FiTruck, FiGift } from "react-icons/fi";

const OurPolicy = () => {
  const policies = [
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "EASY EXCHANGE",
      description: "Hassle-free exchanges within 14 days for unworn, unwashed items with original tags.",
      extra: "Exchange in-store or via courier at your convenience."
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "7 DAY RETURNS",
      description: "Full refunds on unworn items returned within 7 days of delivery.",
      extra: "Free return shipping for all orders above ₹2000."
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "24/7 SUPPORT",
      description: "Dedicated customer care available round the clock via chat, email, or phone.",
      extra: "Average response time: under 15 minutes."
    },
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "FAST SHIPPING",
      description: "Free standard shipping on all orders. Express delivery available.",
      extra: "Same-day dispatch for orders before 2PM."
    },
    {
      icon: <FiGift className="w-8 h-8" />,
      title: "GIFT SERVICES",
      description: "Free gift wrapping and personalized message with every order.",
      extra: "Discreet packaging available upon request."
    },
    {
      icon: <img src={assets.quality_icon} alt="Quality" className="w-8 h-8" />,
      title: "QUALITY PROMISE",
      description: "100% authentic products with strict quality control checks.",
      extra: "1-year craftsmanship warranty on all items."
    }
  ];

  return (
    <div className="bg-white py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-0">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-light tracking-wider mb-4">OUR COMMITMENT TO YOU</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            We stand behind every product we sell with policies designed for your complete satisfaction and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 text-center border border-gray-100 rounded-lg hover:shadow-sm transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gray-50 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                  {policy.icon}
                </div>
              </div>
              <h3 className="text-sm font-medium tracking-widest uppercase mb-3">{policy.title}</h3>
              <p className="text-gray-600 mb-3 text-sm sm:text-base leading-relaxed">
                {policy.description}
              </p>
              <p className="text-xs text-gray-400 mt-3">
                {policy.extra}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-gray-100 pt-16">
          <h3 className="text-sm font-medium tracking-widest uppercase mb-4">NEED HELP?</h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base mb-6">
            Our customer care team is ready to assist with any questions about our policies or your order.
          </p>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
          >
            Contact Support
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
