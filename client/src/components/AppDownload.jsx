const AppDownload = () => {
  return (
    <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 py-16 px-4 rounded-xl border border-gray-200">
      <div className="max-w-4xl mx-auto">
        <p className="text-3xl font-bold text-gray-900 mb-3">
          Elevate Your Shopping Experience
        </p>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get our app for exclusive mobile-only deals, AR product previews, and faster checkout.
        </p>

        <div className="mt-12 mb-10 flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Phone mockup with features */}
          <div className="relative w-72">
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-3xl blur-md opacity-30"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-1 border border-gray-100">
              <div className="h-12 bg-gray-100 rounded-t-2xl flex items-center justify-center">
                <div className="h-1 w-16 bg-gray-300 rounded-full"></div>
              </div>
              <div className="p-4 space-y-4">
                {[
                  {
                    title: "Instant Checkout",
                    desc: "One-tap purchases",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    iconPath:
                      "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                  },
                  {
                    title: "Exclusive Deals",
                    desc: "App-only discounts",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    iconPath:
                      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  },
                  {
                    title: "AR Preview",
                    desc: "See products in your space",
                    iconBg: "bg-green-100",
                    iconColor: "text-green-600",
                    iconPath:
                      "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`h-10 w-10 ${item.iconBg} rounded-lg flex items-center justify-center`}>
                      <svg
                        className={`w-5 h-5 ${item.iconColor}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.iconPath} />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Store badges & QR */}
          <div className="space-y-6 text-center">
            <div className="flex items-center gap-4">
              <a href="#" className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <img
                  src="/appstore.png"
                  alt="App Store"
                  className="w-36 h-auto object-contain block"
                />
              </a>
              <a href="#" className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <img
                  src="/playstore.png"
                  alt="Google Play"
                  className="w-36 h-auto object-contain block"
                />
              </a>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <img
                  src="/qrcode.png"
                  alt="Download QR Code"
                  className="w-20 h-20"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Scan to download</p>
                <p className="text-xs text-gray-500">Point your camera at the QR code</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Join 1M+ happy shoppers using our app
        </p>
      </div>
    </div>
  );
};

export default AppDownload;
