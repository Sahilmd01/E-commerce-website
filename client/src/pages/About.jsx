import Title from "../components/Title";
import AppDownload from "../components/AppDownload";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-purple-800 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://tailwindui.com/img/beams-pricing.png')] bg-[length:800px] bg-top"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-indigo-300">Story</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Crafting exceptional experiences since day one
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <img
              src={assets.about_img}
              alt="About Image"
              className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
            />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-2">
              <span className="text-indigo-600 font-semibold">OUR JOURNEY</span>
              <h2 className="text-3xl font-bold text-gray-900">
                Redefining E-Commerce Excellence
              </h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              Vante & co. was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-800 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                Our mission at Vante & co. is to empower customers with choice,
                convenience, and confidence. We're dedicated to providing a seamless
                shopping experience that exceeds expectations, from browsing and
                ordering to delivery and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-24 text-center">
          <span className="text-indigo-600 font-semibold">WHY CHOOSE US</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            The Vante & co. Difference
          </h2>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                We meticulously select and vet each product to ensure it meets our
                stringent quality standards.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Unmatched Convenience</h3>
              <p className="text-gray-600">
                With our user-friendly interface and hassle-free ordering process,
                shopping has never been easier.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Exceptional Support</h3>
              <p className="text-gray-600">
                Our team of dedicated professionals is here to assist you the way,
                ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <p className="text-4xl font-bold">10K+</p>
              <p className="text-indigo-100 mt-2">Happy Customers</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold">500+</p>
              <p className="text-indigo-100 mt-2">Premium Brands</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold">24/7</p>
              <p className="text-indigo-100 mt-2">Customer Support</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold">99%</p>
              <p className="text-indigo-100 mt-2">Positive Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <AppDownload />
    </div>
  );
};

export default About;