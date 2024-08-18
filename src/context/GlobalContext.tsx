import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { IpropsHomeData } from "../utils/types/enums";

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

  useEffect(() => {
    const homeFectch = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setData(data);
      } catch (error) {}
    };
    homeFectch();
  }, []);

  // modal popup

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleAddToCart = (product: IpropsHomeData) => {
    console.log("its here ", product);
    setaddCartList((prev) => [...prev, product]);
  };

  const CartTotalPrice = () => {
    return addCartList.reduce((acc, cartTotal) => acc + cartTotal.price, 0).toFixed(2);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GlobalContext;
