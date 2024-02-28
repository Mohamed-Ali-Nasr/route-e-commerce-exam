import logo from "@/assets/freshcart-logo.svg";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import NavItems from "./NavItems";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { logout, selectAuth } from "@/store/auth/authSlice";
import {
  selectCart,
  setCountWishlist,
  setNumOfItems,
  setWishList,
} from "@/store/cart/cartSlice";
import { FaRegHeart } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);

  const { token, name, email } = useAppSelector(selectAuth);
  const { numOfItems, countWishlist } = useAppSelector(selectCart);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNumOfItems(0));
    dispatch(setCountWishlist(0));
    dispatch(setWishList([]));
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsView(false);
      setIsOpen(false);
    });

    return () => {
      document.removeEventListener("click", () => {
        setIsView(false);
        setIsOpen(false);
      });
    };
  });

  return (
    <nav
      className="bg-[#eee] select-none shadow-md fixed z-30 w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-w-7xl md:px-6 lg:px-8 px-2 mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div
            className="md:hidden absolute inset-y-0 left-0 flex items-center gap-2"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="inline-flex items-center justify-center p-1.5 rounded-md text-teal-500 border-teal-500 border cursor-pointer ml-1">
              <FaBars className="w-6 h-6" />
            </div>
            <div className="flex items-center flex-shrink-0">
              <Link to="/">
                <img className="w-auto h-8" src={logo} alt="fresh-cart" />
              </Link>
            </div>
          </div>

          <div className="flex-1 hidden md:flex items-center justify-center md:items-stretch md:justify-start mr-[90px] md:mr-0">
            <div className="flex items-center flex-shrink-0">
              <Link to="/">
                <img className="w-auto h-8" src={logo} alt="fresh-cart" />
              </Link>
            </div>

            <div className="md:block md:ml-6 hidden">
              <div className="flex space-x-2">
                {" "}
                <NavItems setIsOpen={setIsOpen} />
              </div>
            </div>
          </div>

          <div className="md:static md:inset-auto md:ml-6 md:pr-0 absolute inset-y-0 right-0 flex items-center pr-2">
            {token ? (
              <>
                <Link to="/wishlist" className="relative">
                  <FaRegHeart
                    size={33}
                    className="sm:mr-4 mr-2 text-teal-500"
                  />

                  <span className="rounded-lg px-[5px] py-[3px] text-[9px] -left-1 top-0 absolute bg-red-600 text-white">
                    {countWishlist > 0 ? countWishlist : 0}
                  </span>
                </Link>

                <Link to="/cart" className="relative">
                  <AiOutlineShoppingCart
                    size={35}
                    className="sm:mr-4 mr-2 text-teal-500"
                  />

                  <span className="rounded-lg px-[5px] py-[3px] text-[9px] left-0 top-0 absolute bg-red-600 text-white">
                    {numOfItems > 0 ? numOfItems : 0}
                  </span>
                </Link>

                <div
                  className="sm:mr-3 relative p-1 mr-1 text-center bg-teal-500 rounded-full cursor-pointer"
                  onClick={() => setIsView((prev) => !prev)}
                >
                  <span className="px-2 text-xl text-white">
                    {name?.split("").slice(0, 1).join(" ").toUpperCase()}
                  </span>
                </div>

                {isView && (
                  <div className="w-44 top-16 right-2 absolute z-10 bg-white divide-y divide-teal-500 rounded-lg shadow">
                    <div className="p-4 text-sm text-gray-900">
                      <div className="font-medium text-teal-500">{name}</div>
                      <div className="font-medium truncate">{email}</div>
                    </div>

                    <div
                      onClick={handleLogout}
                      className="hover:bg-gray-100 hover:text-teal-500 p-4 text-sm text-gray-700 cursor-pointer"
                    >
                      Sign out
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                className="sm:py-2 sm:px-4 bg-transparent border-2 border-teal-500 rounded-lg text-gray-500 sm:text-base hover:bg-teal-500 hover:text-white text-sm pb-[5px] pt-1 px-2"
                to={"/signin"}
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* mobile Navbar */}
      <div className={`md:hidden ${!isOpen && "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavItems setIsOpen={setIsOpen} isMobile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
