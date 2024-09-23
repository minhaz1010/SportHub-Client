import { useParams } from "react-router-dom";
import { useGetSingleProductBySlugQuery } from "@/redux/api/productApi";
import { addItemToCart, TCartItem } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Loading from "@/components/Shared/Loading";
import LazyImage from "@/components/Shared/LazyLoadImage";
import { IProduct } from "@/types";
import { toast } from "sonner";

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetSingleProductBySlugQuery(
    slug as string,
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-5xl text-red-500">Some Error Occurred</p>;
  }

  const product: IProduct = data?.data.data;

  const handleAddToCart = () => {
    const cartItem: TCartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      stock: product.stock,
      image: product.image,
    };
    toast.success("Product Added Successfully", {
      position: "top-center",
      duration: 1000,
    });
    dispatch(addItemToCart(cartItem));
  };

  return (
    <div className="container lg:h-[calc(90vh-120px)] mx-auto my-10 px-4 roboto-flex">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <LazyImage
            imageUrl={product.image}
            name={product.name}
            key={product.image}
          />
        </div>

        <div className="space-y-4">
          <h1 className="md:text-4xl text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700">
            <span className="text-black font-medium">Category:</span>{" "}
            {product.category}
          </p>
          <p className="text-xl text-gray-500">
            <span className="text-black font-medium">Brand:</span>{" "}
            {product.brand}
          </p>

          <div className="flex items-center space-x-1">
            <Rating style={{ maxWidth: 100 }} value={product.rating} readOnly />
            <span className="ml-2 text-black">({product.rating})</span>
          </div>

          <p className="text-2xl font-semibold text-blue-600">
            $ {product.price.toFixed(2)}
          </p>

          <p
            className={`text-2xl ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          <p className="text-gray-700 text-lg">{product.description}</p>

          <Button
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className="mt-4 w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            <ShoppingCart className="me-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
