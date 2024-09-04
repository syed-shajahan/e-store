import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/GlobalContext";
import { detailsFectch } from "../../utils/api/api";
import { HOME_TITLES } from "../../utils/types/enums";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import SimilarProduct from "../../components/SimilarProduct";
import ReactImageMagnify from 'react-image-magnify';

const Details: React.FC = () => {

  const detailContext = useContext(AppContext);
  if (detailContext === null) {
    throw new Error("useContext must be used within a AppProvider");
  }
  const {
    detailData,
    setDetailData,
    loading,
    setLoading,
    addCartList,
    handleAddToCart,
    qty,
    handleInCreaseQuantity,
    handleDecreaseQuantity,
    handleHeartClick
  } = detailContext;

  const { id } = useParams<{ id: string }>();



  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await detailsFectch(Number(id));
      setDetailData(data);
      setLoading(false);
    };

    fetchDetails();
  }, [id, setDetailData, setLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <>
      <div className="p-6">
        {detailData ? (
          <div className="bg-white grid grid-cols-12  overflow-hidden max-w-[1200px]   mx-auto">

            <div className="col-span-12 lg:col-span-6">
              {/* <div
                  className="relative mb-3 block overflow-hidden w-full z-10 pt-[100%]"
                >
                  <img
                    src={detailData.image}
                    alt={detailData.title}
                    className="w-full h-[100%] absolute block top-0 left-0 object-contain" 
                  />
                </div> */}
              <div >


                <ReactImageMagnify   {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    width: 1200,
                    height: 1800,
                    src: detailData.image
                  },
                  largeImage: {
                    src: detailData.image,
                    width: 1200,
                    height: 1800,

                  }
                }} />
              </div>




            </div>


            <div className="col-span-12 lg:col-span-6">
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">{detailData.title}</h1>
                <b className="text-[#868585] mb-4 block">{detailData.category}</b>

                <p className="text-[40px] font-bold mb-6 select-none">${detailData.price * (addCartList.find((cart) => cart.id === detailData.id)?.qty || 1)}</p>

                <div className="flex items-center gap-3 mb-3">
                  <FaCircleMinus size={30} className="cursor-pointer hover:scale-[0.90px]" onClick={() => handleDecreaseQuantity(detailData.id)} />
                  <span className="text-[30px] text-[#000] select-none">{addCartList.find((cart) => cart.id === detailData.id)?.qty || detailData.qty || 1}</span>
                  <FaPlusCircle size={30} className="cursor-pointer  hover:scale-[0.90px]" onClick={() => handleInCreaseQuantity(detailData.id)} />
                </div>

                <button
                  onClick={() => handleAddToCart(detailData)}
                  className={`mb-4 rounded-[25px] cr-button w-full h-[50px] font-bold transition-all duration-[0.3s] ease-in-out py-[8px] px-[22px] text-[14px] font-Manrope leading-[1.2] border-[1px] border-solid flex items-center uppercase justify-center ${addCartList &&
                    addCartList.length > 0 &&
                    addCartList.findIndex(
                      (product) => product.id === detailData.id
                    ) !== -1
                    ? "bg-transparent text-[#000] border-[#000]"
                    : "bg-[#2c3749] text-[#fff] border-[#000]"
                    }`}
                >
                  {addCartList &&
                    addCartList.length > 0 &&
                    addCartList.findIndex(
                      (product) => product.id === detailData.id
                    ) !== -1
                    ? "Remove from cart"
                    : HOME_TITLES.ADD_TO_CART}
                </button>

                <button onClick={() => handleHeartClick(detailData)} className="w-full rounded-[25px] py-2 px-4 h-[50px] border-[1px] border-[solid] border-[#e91e63]
            text-[#e91e63] font-semibold   transition duration-200">
                  {
                    addCartList && addCartList.length > 0 && addCartList.findIndex((product) => product.id === detailData.id) !== -1 ? "Remove From Favourites" : "Add to Favourites"
                  }
                </button>
                <p className="text-gray-700 text-opacity-[70%] mt-4">{detailData.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>No details available</div>
        )}
        <SimilarProduct />
      </div>

    </>
  );
};

export default Details;
