import React from "react";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { IProduct } from "@/types";
import ProductCard from "../Shared/ProductCard";
import Description from "../Description/Description";

const  FeaturedProducts: React.FC = ()=> {
  const {data,isLoading,isError} = useGetAllProductsQuery(undefined); 
  if(isLoading) return <div>Loading.....</div>
  if(isError) return <div>Loading.....</div>
  
  const products:IProduct[] = data?.data?.data ;

  return (
    <div className="container mx-auto p-4 ">
      <Description message="Featured Products" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {products?.slice(0,3).map((product:IProduct)=><ProductCard product={product} key={product._id} />)}
      </div>
    </div>
  );
}

export default FeaturedProducts;