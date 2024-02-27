import { headerLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const NavItems = ({ isMobile }: { isMobile?: boolean }) => {
  const { pathname } = useLocation();

  return (
    <>
      {headerLinks.map(({ label, route }) => {
        const isActive = pathname === route;
        return (
          <li
            key={route}
            className={`flex items-center ${
              isMobile ? "justify-start ml-2" : "justify-center"
            }`}
          >
            <Link
              to={route}
              className={`text-gray-500 px-3 py-1.5 rounded-md font-semibold transition-all duration-300 ${
                isActive && "bg-teal-500 text-white"
              } ${isMobile && "m-1 text-base"}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavItems;
