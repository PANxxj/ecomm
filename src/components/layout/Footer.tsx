
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Ecomm</h3>
            <p className="mb-4 text-gray-600">
              Your trusted multi-vendor marketplace for quality products from verified sellers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary">Shop</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-primary">Register</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary">Cart</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-primary">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-primary">Returns & Refunds</Link>
              </li>
            </ul>
          </div>
          
          {/* Vendor Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Vendors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vendor/register" className="text-gray-600 hover:text-primary">Become a Vendor</Link>
              </li>
              <li>
                <Link to="/vendor/login" className="text-gray-600 hover:text-primary">Vendor Login</Link>
              </li>
              <li>
                <Link to="/vendor/terms" className="text-gray-600 hover:text-primary">Vendor Terms</Link>
              </li>
              <li>
                <Link to="/vendor/help" className="text-gray-600 hover:text-primary">Vendor Support</Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600">
            &copy; {currentYear} Ecomm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
