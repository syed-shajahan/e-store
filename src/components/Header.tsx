import React, { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AppContext } from "../context/GlobalContext";

const Header: React.FC = () => {
  const HeaderContext = useContext(AppContext);

  if (HeaderContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }

  const { isOpen, toggleDrawer, addCartList } = HeaderContext;

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-3 lg:gap-0 justify-between items-center">
        {/* Logo or Title */}
        <div className="text-2xl font-bold text-blue-600">E-Store</div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Search
          </button>
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
