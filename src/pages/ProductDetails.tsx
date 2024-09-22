import Loading from '@/components/Shared/Loading';
import { useGetSingleProductBySlugQuery } from '@/redux/api/productApi';
import { useParams } from 'react-router-dom';
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { IProduct } from '@/types';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/Shared/LazyLoadImage';

const ProductDetails = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSingleProductBySlugQuery(slug as string);
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <p className='text-5xl text-red-500'>Some Error Occured</p>
  }
  const product: IProduct = data?.data.data;

  return (
    <div className="container lg:h-[calc(90vh-120px)]  mx-auto my-10 px-4 roboto-flex " >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center ">
          <LazyImage imageUrl={product.image} name={product.name} key={product.image} />

        </div>

        <div className="space-y-4">
          <h1 className="md:text-4xl text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700"><span className='text-black  font-medium'>Category:</span> {product.category}</p>
          <p className="text-xl text-gray-500"><span className='text-black font-medium'>Brand:</span> {product.brand}</p>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <Rating style={{ maxWidth: 100 }} value={product.rating} readOnly />
            <span className="ml-2 text-black">({product.rating})</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-semibold text-blue-600">
            $ {product.price.toFixed(2)}
          </p>

          {/* Stock availability */}
          <p className={`text-2xl ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {/* Description */}
          <p className="text-gray-700 text-lg">{product.description}</p>

          {/* Add to Cart Button */}
          <Button
            disabled={product.stock === 0}
            className="mt-4 w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
