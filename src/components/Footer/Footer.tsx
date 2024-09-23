import { HashLink as Link } from "react-router-hash-link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 roboto-flex h-auto  text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-5xl font-bold mb-4 md:mb-0">SportX</div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <Link to="/" className="hover:text-teal-400 text-xl">
            Home
          </Link>
          <Link to="/about" className="hover:text-teal-400 text-xl">
            About Us
          </Link>
          <Link
            to="/all-products#top-page"
            className="hover:text-teal-400 text-xl"
          >
            Products
          </Link>
          <Link to="/contact" className="hover:text-teal-400 text-xl">
            Contact
          </Link>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="w-6 h-6 text-xl hover:text-teal-400" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-6 h-6 text-xl hover:text-teal-400" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6 text-xl hover:text-teal-400" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-6 h-6 text-xl hover:text-teal-400" />
          </a>
        </div>
      </div>

      <div className="text-center text-lg text-gray-400 mt-4">
        © {new Date().getFullYear()} SportX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
