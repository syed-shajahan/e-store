import React, { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";
import { IoMdHeart } from "react-icons/io";
import { HOME_TITLES } from "../../utils/types/enums";
import { Link } from "react-router-dom";

const Home = () => {
  const homeContext = useContext(AppContext);
  if (homeContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }
  const { handleAddToCart, searchfilterData, addCartList, handleHeartClick , wishList } =
    homeContext;

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchfilterData?.map((products: any) => {
            return (
              <div className="bg-white shadow-md rounded-lg overflow-hidden relative mb-4 p-4">
                <Link
                  to={`/details/${products.id}`}
                  className="relative mb-3 block overflow-hidden w-full z-10 pt-[100%]"
                >
                  <img
                    src={products.image}
                    alt="product_images"
                    className="w-full h-[100%] absolute block top-0 left-0 object-contain"
                  />
                </Link>
                <div
                  className="absolute right-[10px] top-[10px] z-[10] cursor-grab"
                  onClick={() => handleHeartClick(products)}
                >
                  <IoMdHeart size={24}  className={` ${ wishList.findIndex((fav)=> fav.id === products.id) !== -1 ? "text-[#e91e63]" : "text-[#ccc]"   } `} />
                </div>
                <div className="mb-5">
                  <h2 className="text-lg font-semibold truncate">
                    {products.title}
                  </h2>

                  <div className="flex justify-between items-center mb-3 px-3">
                    <p className="text-gray-600 ">{products.category}</p>
                    <b className="text-[22px] text-[#b5895e] ">
                      $ {products.price}
                    </b>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(products)}
                  className={`rounded-[25px] cr-button w-full h-[50px] font-bold transition-all duration-[0.3s] ease-in-out py-[8px] px-[22px] text-[14px] font-Manrope leading-[1.2] border-[1px] border-solid flex items-center uppercase justify-center ${
                    addCartList &&
                    addCartList.length > 0 &&
                    addCartList.findIndex(
                      (product) => product.id === products.id
                    ) !== -1
                      ? "bg-transparent text-[#000] border-[#000]"
                      : "bg-[#2c3749] text-[#fff] border-[#000]  hover:border-[#000]"
                  }`}
                >
                  {addCartList &&
                  addCartList.length > 0 &&
                  addCartList.findIndex(
                    (product) => product.id === products.id
                  ) !== -1
                    ? HOME_TITLES.REMOVE_FROM_CART
                    : HOME_TITLES.ADD_TO_CART}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
