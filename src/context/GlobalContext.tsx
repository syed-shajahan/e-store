import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-toastify/dist/ReactToastify.css";
import { IpropsHomeData } from "../utils/types/interface";

interface AppContextProps {
  data: IpropsHomeData[];
  setData: React.Dispatch<React.SetStateAction<IpropsHomeData[]>>;
  detailData: IpropsHomeData | null;
  setDetailData: React.Dispatch<React.SetStateAction<IpropsHomeData | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
  handleAddToCart: (products: IpropsHomeData) => void;
  addCartList: IpropsHomeData[];
  setaddCartList: React.Dispatch<React.SetStateAction<IpropsHomeData[]>>;
  CartTotalPrice: any;
  DeleteCartItem: (id: number) => void;
  searchfilterData: any;
  searchSetFilterData: React.Dispatch<any>;
  wishList: IpropsHomeData[];
  setWishList: React.Dispatch<React.SetStateAction<IpropsHomeData[]>>;
  handleHeartClick: (products: IpropsHomeData) => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

interface GlobalContextProps {
  children: ReactNode;
}

const GlobalContext: FC<GlobalContextProps> = ({ children }) => {
  const [data, setData] = useState<IpropsHomeData[]>([]);
  const [detailData, setDetailData] = useState<IpropsHomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [addCartList, setaddCartList] = useState<IpropsHomeData[]>([]);

  const [searchfilterData, searchSetFilterData] = useState<any>([]);

  const [wishList, setWishList] = useState<IpropsHomeData[]>([]);

  useEffect(() => {
    const homeFectch = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setData(data);
        searchSetFilterData(data);
      } catch (error) {}
    };
    homeFectch();
  }, []);

  // modal popup

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleAddToCart = (product: IpropsHomeData) => {
    const copyCartList = [...addCartList];
    const productIndex = copyCartList.findIndex(
      (products) => products.id === product.id
    );

    if (productIndex !== -1) {
      setaddCartList((prev) =>
        prev.filter((filterdata) => filterdata.id !== product.id)
      );
      toast.error("Removed From cart 😞");
    } else {
      setaddCartList((prev) => [...prev, product]);
      toast.success("Added to cart 😊");
    }
  };

  const CartTotalPrice = () => {
    return addCartList
      .reduce((acc, cartTotal) => acc + cartTotal.price, 0)
      .toFixed(2);
  };

  const DeleteCartItem = (id: number) => {
    const updatedCardList = addCartList.filter(
      (listData) => listData.id !== id
    );
    setaddCartList(updatedCardList);
    toast.error("Removed From cart 😞");
  };

  const handleHeartClick = (products: IpropsHomeData) => {
    const copyWishList = [...wishList];

    const CheckWishListIndex = copyWishList.findIndex(
      (data) => data.id === products.id
    );

    if (CheckWishListIndex !== -1) {
      setWishList((prev) => prev.filter((datas) => datas.id !== products.id));
    }
    else{
      setWishList((prev) => [...prev, products]);
      toast.success("Added to WishList ❤️‍🔥");
    }



    console.log("testing", wishList);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        detailData,
        setDetailData,
        loading,
        setLoading,
        isOpen,
        setIsOpen,
        toggleDrawer,
        handleAddToCart,
        addCartList,
        setaddCartList,
        CartTotalPrice,
        DeleteCartItem,
        searchfilterData,
        searchSetFilterData,
        wishList,
        setWishList,
        handleHeartClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GlobalContext;
