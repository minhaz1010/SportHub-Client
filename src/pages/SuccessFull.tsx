import React from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HashLink as Link } from "react-router-hash-link";

const SuccessFull: React.FC = () => {
  return (
    <div className="min-h-screen roboto-flex flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 px-8 pb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
            <ShoppingBag className="mr-2 h-5 w-5" />
            <Link to={"/all-products#top-page"}> Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessFull;
