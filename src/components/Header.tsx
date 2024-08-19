import React, { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AppContext } from "../context/GlobalContext";
import { FaHeart } from "react-icons/fa";
import { HOME_TITLES } from "../utils/types/enums";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const HeaderContext = useContext(AppContext);

  if (HeaderContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }

  const { isOpen, toggleDrawer, addCartList } = HeaderContext;

  return (
    <header className="bg-white lg:py-4 lg:px-4 px-7 py-4  sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-3 lg:gap-0 justify-between items-center">
        {/* Logo or Title */}

        <Link to="/">
          <div className="text-2xl font-bold text-[#2C3749]">{HOME_TITLES.E_STORE}</div>
        </Link>

        {/* Search Bar */}
        <div className=" w-full max-w-[600px] m-auto order-[10] lg:order-0">
          <SearchBar />
        </div>

        {/* Cart Icon */}
        <div className="flex items-center space-x-4">
          <AiOutlineShoppingCart
            onClick={toggleDrawer}
            size={28}
            className="text-gray-700 hover:text-blue-500 cursor-pointer"
          />
          <span className="text-gray-700 font-medium">Cart {addCartList.length}</span>
        </div>

      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </header>
  );
};

export default Header;
