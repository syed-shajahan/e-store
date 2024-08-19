import React, { useContext } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";

import EmptyCart from "./cart/EmptyCart";
import CardList from "./cart/CardList";
import { MODAL_TITLES } from "../utils/types/enums";
import { AppContext } from '../context/GlobalContext';
const Aside = () => {

    const asideContext = useContext(AppContext);

  if (asideContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }

  const { addCartList, toggleDrawer  } = asideContext;
  return (
    <div className="px-4 overflow-y-auto max-h-[100%]">
    <div className="mb-3  flex justify-between items-center sticky z-10 top-0 py-2 bg-[#fff]">
      <h2 className="text-xl font-bold">{MODAL_TITLES.YOUR_CART_PRODUCTS}</h2>
      <IoIosCloseCircleOutline onClick={toggleDrawer} size={'30px'} className="cursor-pointer text-[#ccc] hover:text-[#000]" />
    </div>
    {addCartList.length > 0 ? (
      <>
        <CardList />
      </>
    ) : (
      <EmptyCart />
    )}
  </div>
  )
}

export default Aside