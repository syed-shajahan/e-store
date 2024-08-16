import React, { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { IpropsHomeData } from '../utils/enums';


interface AppContextProps {
  data:IpropsHomeData[];
  setData: React.Dispatch<React.SetStateAction<IpropsHomeData[]>>
}

export const AppContext = createContext<AppContextProps | null>(null);

interface GlobalContextProps {
  children: ReactNode;
}

const GlobalContext:FC<GlobalContextProps>  = ({children}) => {
  const [data, setData] = useState<IpropsHomeData[]>([]);



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
    <AppContext.Provider value={{data , setData}}>
      {children}
    </AppContext.Provider>
  )
}

export default GlobalContext