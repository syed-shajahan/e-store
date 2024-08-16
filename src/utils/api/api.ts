import { IpropsHomeData } from "../types/enums";

// src/utils/api/api.ts
export const detailsFectch = async (id: number | string): Promise<IpropsHomeData | null> => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: IpropsHomeData = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null; 
    }
  };
  