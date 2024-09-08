import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/types";
import LazyImage from "./LazyLoadImage";



interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="w-full teko  mx-auto overflow-hidden shadow-xl     hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-0 relative ">
        <LazyImage name={product.name} imageUrl={product.image as string}/>
        <Badge className="absolute top-2 right-2 text-lg bg-teal-700">{product.category}</Badge>
        <Badge className={`text-lg absolute bg-teal-700 top-2 left-2 ${product.stock > 0 ? 'text-white' : 'text-red-600'}`}>
            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
          </Badge>
      </CardHeader>
      <CardContent className="p-4 h-72">
        <CardTitle className="text-3xl font-medium mb-2 h-20">{product.name}</CardTitle>
        <p className="text-gray-600  text-2xl font-semibold mb-2">{product.brand}</p>
        <p className="text-gray-700 text-xl h-20 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-4xl  text-sky-500">${product.price.toFixed(2)}</span>
          <div className="flex items-center  justify-center">
            <Rating 
              style={{ maxWidth: 100 }}
              value={product.rating}
              readOnly
            />
            <span className="ml-2 text-lg text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 ">
        <div className="w-full flex justify-between items-center">
         
          
            <Button className="bg-teal-700 hover:bg-teal-900 text-xl  text-white" >
            View Details
          </Button>
          <Button className="bg-teal-700  hover:bg-teal-900 text-xl flex justify-center items-center text-white" disabled={product.stock === 0}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;