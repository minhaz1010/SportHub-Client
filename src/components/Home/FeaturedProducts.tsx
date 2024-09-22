import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { IProduct } from "@/types";
import ProductCard from "../Shared/ProductCard";
import Description from "../Description/Description";
import Loading from "../Shared/Loading";



const FeaturedProducts: React.FC = () => {
  const queryParams = {
    search: '',
    sort: '',
    category: '',
    brand: '',
    rating: 0,
    minPrice: 0,
    maxPrice: 1000,
    page: 1,
    limit: 6
  };
  const { data, isLoading, isError } = useGetAllProductsQuery(queryParams);
  if (isLoading) return <Loading />;
  if (isError) return <p className="text-5xl text-red-500">Some Error Occured</p>;

  const products: IProduct[] = data?.data?.data;

  return (
    <div className="container  mx-auto p-4 ">
      <Description message="Featured Products" />
      <div className="grid grid-cols-1 mt-20   sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {products
          ?.slice(0, 3)
          .map((product: IProduct) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
