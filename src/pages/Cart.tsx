import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} from "@/redux/features/cartSlice";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      toast.success("Cart updated successfully", {
        position: "top-center",
        duration: 1000,
      });
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    toast.success("Product removed from cart successfully", {
      position: "top-center",
      duration: 1000,
    });
    dispatch(removeItemFromCart(id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shippingFee = 19;
  const vatRate = 0.15;
  const vat = subtotal * vatRate;
  const total = subtotal + shippingFee + vat;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto my-10 roboto-flex h-[calc(100vh-120px)] px-4 text-center flex justify-center items-center flex-col">
        <h2 className="text-5xl font-bold mb-4">Your cart is empty 😰</h2>
        <Link to="/" className="text-blue-600 text-2xl hover:underline">
          Continue Shopping ❤️‍🔥
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto h-[calc(100vh-120px)] roboto-flex my-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img
                src={item.image}
                alt={item.name}
                className="size-32 object-cover mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="p-1"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="p-1"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (15%)</span>
                <span>${vat.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6 bg-blue-600 text-white">
              <Link to="/checkout"> Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Link to="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
        <Button
          onClick={() => dispatch(clearCart())}
          variant="outline"
          className="text-red-500"
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
