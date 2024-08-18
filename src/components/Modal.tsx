import React, { useContext, useState } from "react";
import { AppContext } from "../context/GlobalContext";

const Modal = () => {
  const modalContext = useContext(AppContext);

  if (modalContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }

  const { isOpen, addCartList, CartTotalPrice } = modalContext;

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full max-w-[500px] h-full bg-white shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          {addCartList.length > 0 ? (
            <>
              <h2 className="text-xl font-bold">Your Add to cart Products</h2>
              <ul className="mt-4 space-y-2">
                <li>
                  {addCartList?.map((cartData) => {
                    return (
                      <div className="flex mb-3">
                        <img
                          src={cartData.image}
                          alt=""
                          className="w-[80px] h-[80px] me-3 rounded-[8px] object-contain"
                        />

                        <div>
                          <p>{cartData.title}</p>
                          <p>{cartData.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </li>
              </ul>

              <p className="!text-[48px]">
                <span className="text-[14px]">Total: {CartTotalPrice()}</span>
              </p>
            </>
          ) : (
            <p className="text-center">you cart is empty add More Products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
