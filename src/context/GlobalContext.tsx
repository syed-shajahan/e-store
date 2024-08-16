import React, { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { IpropsHomeData } from '../utils/types/enums';


interface AppContextProps {
  data: IpropsHomeData[];
  setData: React.Dispatch<React.SetStateAction<IpropsHomeData[]>>;
  detailData: IpropsHomeData | null;
  setDetailData: React.Dispatch<React.SetStateAction<IpropsHomeData | null>>;
  loading:boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextProps | null>(null);

interface GlobalContextProps {
  children: ReactNode;
}

const GlobalContext:FC<GlobalContextProps>  = ({children}) => {
  const [data, setData] = useState<IpropsHomeData[]>([]);
  const [detailData, setDetailData] = useState<IpropsHomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const homeFectch = async()=>{
      try {
        const response = await fetch ('https://fakestoreapi.com/products');
        const data = await response.json();
        setData(data)
      } catch (error) {
        
      }
    }
    homeFectch();
  }, [])
  

 

  return (
    <AppContext.Provider value={{data , setData, detailData , setDetailData , loading , setLoading}}>
      {children}
    </AppContext.Provider>
  )
}

export default GlobalContext