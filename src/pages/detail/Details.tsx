import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/GlobalContext";
import { detailsFectch } from "../../utils/api/api";
import { HOME_TITLES } from "../../utils/types/enums";

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
    handleAddDetailProduct,
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
    <div className="p-6">
      {detailData ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-[1200px] lg:flex block mx-auto">
          <img
            src={detailData.image}
            alt={detailData.title}
            loading="lazy"
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{detailData.title}</h1>
            <p className="text-gray-600 mb-4">{detailData.category}</p>
            <p className="text-gray-700 mb-4">{detailData.description}</p>
            <p className="text-2xl font-bold mb-6">${detailData.price}</p>

            <button
              onClick={() => handleAddDetailProduct(detailData)}
              className={`mb-4 rounded-[25px] cr-button w-full h-[50px] font-bold transition-all duration-[0.3s] ease-in-out py-[8px] px-[22px] text-[14px] font-Manrope leading-[1.2] border-[1px] border-solid flex items-center uppercase justify-center ${
                addCartList &&
                addCartList.length > 0 &&
                addCartList.findIndex(
                  (product) => product.id === detailData.id
                ) !== -1
                  ? "bg-transparent text-[#000] border-[#000] hover:bg-[#000] hover:text-[#fff]"
                  : "bg-[#2c3749] text-[#fff] border-[#000] hover:bg-[#000] hover:border-[#000]"
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

            <button className="w-full rounded-[25px] py-2 px-4 h-[50px] bg-blue-500 text-white font-semibold  hover:bg-blue-600 transition duration-200">
              Add to Favourites
            </button>
          </div>
        </div>
      ) : (
        <div>No details available</div>
      )}
    </div>
  );
};

export default Details;
