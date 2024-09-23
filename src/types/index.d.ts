export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  stock: number;
  brand: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export type TError = {
  data: {
    success: boolean;
    message: string;
    errorMessages?: [
      {
        path: string;
        message: string;
      },
    ];
  };
  status: number;
};

export type TData<T> = {
  success: boolean;
  totalItem: number;
  statusCode: number;
  message: string;
  data?: T | T[];
};

export type TResponse = {
  error?: TError;
  data?: TData;
};
