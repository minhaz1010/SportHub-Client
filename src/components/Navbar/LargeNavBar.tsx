import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const LargeNavBar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartCount, setCartCount] = useState(0);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/all-products", label: "All Products" },
    { path: "/manage-products", label: "Manage Products" },
  ];

  return (
    <div className="mr-4 hidden gap-2 font-handjet md:flex justify-between items-center w-full my-3">
      <div className="ml-7">
        <Link to="/" className="">
          <img
            src="https://i.ibb.co.com/XpsJj2h/icon.png"
            alt="Sport-Icon"
            className="size-22"
          />
        </Link>
      </div>
      <nav id="navbar" className="flex gap-2 mr-7 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-xl duration-300 delay-100 transition-shadow ease-in-out ${
                isActive ? "text-blue-500" : "hover:text-blue-500"
              }`
            }
          >
            {({ isActive }) => (
              <Button
                variant={!isActive ? "link" : undefined}
                className="text-3xl duration-300 transition ease-in-out"
              >
                {item.label}
              </Button>
            )}
          </NavLink>
        ))}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `text-xl duration-300 delay-100 transition ease-in-out ${
              isActive ? "text-blue-500" : "hover:text-blue-500"
            }`
          }
        >
          {({ isActive }) => (
            <Button
              variant={!isActive ? "link" : undefined}
              className="text-3xl duration-300 transition ease-in-out flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              <span className="ml-1 bg-black text-white rounded-full px-3 py-2 ">
                {cartCount}
              </span>
            </Button>
          )}
        </NavLink>
      </nav>
    </div>
  );
};

export default LargeNavBar;
