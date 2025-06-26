import { assets } from "../assets/assets";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaMoneyBillWave
} from 'react-icons/fa';
import {
  SiGooglepay,
  SiRazorpay,
  SiStripe,
  SiPhonepe,
  SiPaytm,
} from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="bg-white p-2 inline-block rounded">
              <img
                src={assets.logo}
                className="w-40 h-auto"
                alt="Vante & Co Logo"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Vante & Co — curating excellence in every product. We're here to
              elevate your lifestyle with exceptional quality and care.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Facebook">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Pinterest">
                <FaPinterest className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Shop</h3>
            <ul className="space-y-3 text-sm">
              {["New Arrivals", "Best Sellers", "Luxury Collections", "Gift Cards", "Sale"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Customer Service
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/Contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/NotFound" className="text-gray-400 hover:text-white transition-colors duration-300">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/NotFound" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="/NotFound" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/NotFound" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/About" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/NotFound" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Careers
                </a>
              </li>
              <li>
                <a href="/NotFound" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="/NotFound" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Press
                </a>
              </li>
              <li>
                <a href="/NotFound" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Join our mailing list for exclusive offers and early access to new collections.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-900 text-white px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-white text-gray-900 px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              By subscribing you agree to our Privacy Policy
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Vante & Co. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-xs text-gray-500">Secure payments with</span>
            <div className="flex space-x-2">
              {/* Payment Icons  add nedded  */}
              <div className="flex space-x-4 text-gray-500">
                <SiGooglepay size={28} title="Google Pay" />
                <SiPhonepe size={28} title="PhonePe" />
                <SiRazorpay size={28} title="Razorpay" />
                <SiStripe size={28} title="Stripe" />
                <SiPaytm size={28} title="Paytm" />
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <FaMoneyBillWave className="text-green-600" size={20} />
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;