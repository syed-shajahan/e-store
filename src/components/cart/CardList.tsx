import React, { useContext } from 'react'
import { MODAL_TITLES } from '../../utils/types/enums';
import { IoCloseOutline } from "react-icons/io5";
import { AppContext } from '../../context/GlobalContext';



const CardList = () => {

    const cartListContext = useContext(AppContext);
    if (cartListContext === null) {
        throw new Error("useContext must be used within a AppProvider");
    }

    const { CartTotalPrice , DeleteCartItem , addCartList } = cartListContext;

  return (
    <div className="px-4 pb-[60px]">
    <ul className="mt-4 space-y-2">
      <li>
        {addCartList?.map((cartData:any) => {
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
  )
}

export default CardList