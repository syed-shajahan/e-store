import React, { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MODAL_TITLES } from "../utils/types/enums";
import { IoCloseOutline } from "react-icons/io5";


const Modal = () => {
  const modalContext = useContext(AppContext);

  if (modalContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }

  const { isOpen, addCartList, CartTotalPrice, toggleDrawer ,DeleteCartItem } = modalContext;

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full max-w-[500px] h-full bg-white shadow-md transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="px-4 overflow-y-auto max-h-[100%]">
          <div className="mb-3  flex justify-between items-center sticky z-10 top-0 py-2 bg-[#fff]">
            <h2 className="text-xl font-bold">Your cart Products</h2>
            <IoIosCloseCircleOutline onClick={toggleDrawer} size={'30px'} className="cursor-pointer text-[#ccc] hover:text-[#000]" />
          </div>
          {addCartList.length > 0 ? (
            <>
              <div className="px-4 pb-[60px]">
                <ul className="mt-4 space-y-2">
                  <li>
                    {addCartList?.map((cartData) => {
                      return (
                        <div className="flex relative mb-3 py-3 pe-[20px] border-b border-solid border-[#EEE]">
                          <img
                            src={cartData.image}
                            alt=""
                            className="w-[80px] h-[80px] me-3 rounded-[8px] object-contain"
                          />

                          <div>
                            <p>{cartData.title}</p>
                            <p>{cartData.price}</p>
                          </div>

                          <div className="absolute right-[0px] top-[5px]">
                           <IoCloseOutline onClick={()=> DeleteCartItem(cartData.id)} className=" cursor-pointer text-[#878787] hover:text-[#000]" title="Remove from cart" />
                          </div>
                        </div>
                      );
                    })}
                  </li>
                </ul>

                <p className="!text-[22px] block !w-[100%] p-4 absolute left-[0] bottom-0 bg-[#000]">
                  <p className=" text-[#fff] text-right pe-3">{MODAL_TITLES.TOTAL} $ {CartTotalPrice()}</p>
                </p>
              </div>

            </>
          ) : (

            <div className="my-4">
              <img src="/empty.png" alt="" className="max-w-[300px] m-auto" />
              <p className="text-center">{MODAL_TITLES.PLS_ADD_PRODUCTS}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
