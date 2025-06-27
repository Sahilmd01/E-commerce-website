import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="bg-white py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Easy Exchange Policy */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <img
                src={assets.exchange_icon}
                alt="Exchange Icon"
                className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <h3 className="text-sm font-light tracking-widest uppercase mb-3">EASY EXCHANGE</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xs mx-auto">
              Our seamless exchange process ensures your complete satisfaction with every purchase.
            </p>
          </div>

          {/* Return Policy */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <img
                src={assets.quality_icon}
                alt="Quality Icon"
                className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <h3 className="text-sm font-light tracking-widest uppercase mb-3">7 DAY RETURNS</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xs mx-auto">
              Experience risk-free shopping with our complimentary week-long return window.
            </p>
          </div>

          {/* Customer Support */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <img
                src={assets.support_img}
                alt="Support Icon"
                className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <h3 className="text-sm font-light tracking-widest uppercase mb-3">DEDICATED SUPPORT</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xs mx-auto">
              Our concierge team is available around the clock to assist with your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
