import React, { useContext, useState } from "react";
import { AppContext } from "../context/GlobalContext";

const Modal = () => {
  const modalContext = useContext(AppContext);

  if (modalContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }

  const { isOpen } = modalContext;

  return (
    <div>
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Drawer Menu</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-500">
                Favorites
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-500">
                Cart
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-500">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
