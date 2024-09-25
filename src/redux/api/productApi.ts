/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct, TData, TError, TResponse } from "@/types";
import { baseApi } from "./baseApi";

const transformErrorResponse = (response: TError): TResponse => ({
  error: {
    data: {
      success: response.data.success,
      message: response.data.message,
      errorMessages: response.data.errorMessages,
    },
    status: response.status,
  },
});

const transformSuccessResponse = <T>(response: TData<T>) => ({
  data: {
    success: response.success,
    totalItem: response.totalItem,
    statusCode: response.statusCode,
    message: response.message,
    data: response.data,
  },
});

export interface IQueryParams {
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query: IQueryParams) => {
        const params = new URLSearchParams();
        if (query?.search) {
          params.append("search", query.search);
        }
        if (query.limit) {
          params.append("limit", query.limit.toString());
        }
        if (query.page) {
          params.append("page", query.page.toString());
        }
        if (query?.category) {
          params.append("category", query.category);
        }
        if (query?.rating) {
          params.append("rating", query.rating.toString());
        }
        if (query.sort) {
          params.append("sort", query.sort);
        }
        if (query.minPrice) {
          params.append("minPrice", query.minPrice.toString());
        }
        if (query.maxPrice) {
          params.append("maxPrice", query.maxPrice.toString());
        }
        if (query.brand) {
          params.append("brand", query.brand);
        }
        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: ["products"],
      transformResponse: (response: TData<any>) =>
        transformSuccessResponse(response),
    }),
    getSingleProductBySlug: builder.query({
      query: (slug: string) => {
        return {
          url: `/products/${slug}`,
          method: "GET",
        };
      },
      providesTags: ["products"],

      transformResponse: (response: TData<any>) =>
        transformSuccessResponse(response),
    }),
    getAllProductsWithoutQuery: builder.query({
      query: () => {
        return {
          url: "/products",
          method: "GET",
        };
      },
      providesTags: ["products"],

      transformResponse: (response: TData<any>) =>
        transformSuccessResponse(response),
    }),
    updateAProduct: builder.mutation({
      query: (payload: Partial<IProduct>) => {
        return {
          url: `/products/${payload._id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["products"],
      transformResponse: (response: TData<any>) =>
        transformSuccessResponse(response),
      transformErrorResponse: (response: TError) =>
        transformErrorResponse(response),
    }),
    addAProduct: builder.mutation({
      query: (payload: Partial<IProduct>) => {
        return {
          url: "/products/create-product",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["products"],
      transformResponse: (response: TData<any>) =>
        transformSuccessResponse(response),
      transformErrorResponse: (response: TError) =>
        transformErrorResponse(response),
    }),
    deleteAProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
      transformResponse: (response: TData<any>) =>
        transformSuccessResponse(response),
      transformErrorResponse: (response: TError) =>
        transformErrorResponse(response),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductBySlugQuery,
  useGetAllProductsWithoutQueryQuery,
  useUpdateAProductMutation,
  useAddAProductMutation,
  useDeleteAProductMutation,
} = productApi;
