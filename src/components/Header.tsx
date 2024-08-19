import React, { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AppContext } from "../context/GlobalContext";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const Header: React.FC = () => {
  const HeaderContext = useContext(AppContext);

  if (HeaderContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }

  const { isOpen, toggleDrawer, addCartList } = HeaderContext;

  return (
    <header className="bg-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-3 lg:gap-0 justify-between items-center">
        {/* Logo or Title */}
        <div className="text-2xl font-bold text-[#2C3749]">E-Store</div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-[#2C3749] text-white p-4 h-[42px] flex items-center justify-center rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoSearch />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 relative">
            <AiOutlineShoppingCart
              onClick={toggleDrawer}
              size={28}
              className="text-[#2C3749] hover:text-blue-500 cursor-pointer"
            />
            <span className=" font-medium bg-[#E91E63] absolute text-[#fff] text-[10px]  w-[20px] h-[20px] -top-[10px] -right-[10px] flex items-center justify-center rounded-[100px]
          "> {addCartList.length}</span>
          </div>

          <div className="ms-4">
            <FaHeart  className="text-[red] text-[20px] cursor-pointer" title="Your WishList"/>

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
