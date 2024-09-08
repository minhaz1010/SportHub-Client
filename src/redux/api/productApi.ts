/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TData, TError, TResponse } from "@/types";
import { baseApi } from "./baseApi";


const transformErrorResponse = (response: TError): TResponse => ({
  error: {
    data: {
      success: response.data.success,
      message: response.data.message,
      errorMessages: response.data.errorMessages
    },
    status: response.status
  }
});

const transformSuccessResponse = <T>(response: TData<T>) => ({
  data: {
    success: response.success,
    statusCode: response.statusCode,
    message: response.message,
    data:response.data
  }
});





export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => {
        return {
          url: "/products",
          method: "GET"
        };
      },
      transformResponse: (response: TData<any>) => transformSuccessResponse(response),
    })
  })
});

export const { useGetAllProductsQuery } = productApi;
