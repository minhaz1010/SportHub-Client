import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "@/redux/hook";

function SmallNavBar() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/all-products", label: "All Products" },
    { path: "/manage-products", label: "Manage Products" },
  ];

  return (
    <Sheet>
      <div className="flex justify-between roboto-flex items-center md:hidden p-4">
        <Link to="/" className="text-orange-400 flex items-center">
          <img
            src="https://i.ibb.co.com/XpsJj2h/icon.png"
            alt="sport-icon"
            className="w-16 h-16"
          />
        </Link>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-1">
            <MenuIcon className="w-8 h-8" /> {/* Adjusted size here */}
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent
        side="right"
        className="transition duration-1000 roboto-flex  bg-[#EDEADE]"
      >
        <nav className="flex flex-col items-start p-4 space-y-5 ">
          {navItems.map((item) => (
            <SheetTrigger key={item.path} asChild>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-xl duration-300 transition ease-in-out ${isActive ? "text-blue-500" : "hover:text-orange-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <Button
                    variant={!isActive ? "link" : undefined}
                    className="text-2xl duration-300 transition ease-in-out"
                  >
                    {item.label}
                  </Button>
                )}
              </NavLink>
            </SheetTrigger>
          ))}
          <SheetTrigger asChild>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-xl duration-300 transition ease-in-out ${isActive ? "text-blue-500" : "hover:text-orange-500"
                }`
              }
            >
              {({ isActive }) => (
                <Button
                  variant={!isActive ? "link" : undefined}
                  className="text-2xl duration-300 transition ease-in-out flex items-center"
                >
                  <FaShoppingCart className="mr-2" />

                  <span className="ml-1 bg-black  text-white px-3 py-2 rounded-full ">
                    {totalItems}
                  </span>
                </Button>
              )}
            </NavLink>
          </SheetTrigger>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SmallNavBar;
