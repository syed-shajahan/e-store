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

        <div className="flex items-center justify-between order-[0] lg:order-10">
          <div className="me-4">
            <FaHeart className="text-[red] text-[20px] cursor-pointer" title="Your WishList" />

          </div>
          <div className="flex items-center space-x-4 relative">
            <AiOutlineShoppingCart
              onClick={toggleDrawer}
              size={28}
              className="text-[#2C3749] hover:text-blue-500 cursor-pointer"
            />
            <span className=" font-medium bg-[#E91E63] absolute text-[#fff] text-[10px]  w-[20px] h-[20px] -top-[10px] -right-[10px] flex items-center justify-center rounded-[100px]
          "> {addCartList.length}</span>
          </div>


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
