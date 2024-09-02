
  export interface IpropsHomeData {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    qty?:number
  }

interface Rating {
    rate: number;
    count: number;
  }
  