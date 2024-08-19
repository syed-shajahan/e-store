import React, { useContext } from "react";
import { AppContext } from "../../context/GlobalContext";
import { IoMdHeart } from "react-icons/io";
import { IpropsHomeData } from "../../utils/types/interface";
import { HOME_TITLES } from "../../utils/types/enums";

const Home = () => {
  const homeContext = useContext(AppContext);
  if (homeContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }
  const { data, handleAddToCart } = homeContext;

  const handleHeartClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation(); //
  };

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((products) => {
            return (
              <div className="bg-white shadow-md rounded-lg overflow-hidden  p-4">
                <a href={`/details/${products.id}`} className="relative">
                  <img
                    src={products.image}
                    alt="product_images"
                    className="w-full h-80 object-contain"
                  />
                  <div
                    className="absolute right-[10px] top-[10px]"
                    onClick={(e) => handleHeartClick}
                  >
                    <IoMdHeart size={24} color="#ccc" />
                  </div>
                </a>

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
                  className="rounded-[25px] cr-button w-full h-[50px] font-bold transition-all duration-[0.3s] ease-in-out py-[8px] px-[22px] text-[14px] font-Manrope leading-[1.2] bg-[#2c3749] text-[#fff] border-[1px] border-solid border-[#000] flex items-center uppercase justify-center hover:bg-[#000] hover:border-[#000]"
                >
                 {HOME_TITLES.ADD_TO_CART}
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
