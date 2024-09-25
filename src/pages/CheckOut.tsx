/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import { useUpdateAProductMutation } from "@/redux/api/productApi";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cartSlice";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

const CheckOut: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [sendData] = useUpdateAProductMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shippingFee = 19;
  const vatRate = 0.15;
  const vat = subtotal * vatRate;
  const total = subtotal + shippingFee + vat;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key as keyof FormData] = "This field is required";
        isValid = false;
      }
    });

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      cartItems.forEach(async (cartItem) => {
        const newQuantity = {
          _id: cartItem.id,
          stock: (cartItem.stock + 1) - cartItem.quantity,
        };
        try {
          const data = await sendData(newQuantity);
          if (data.data?.data.success) {
            dispatch(clearCart());
            toast.success("Your Order Has Placed Successfully", {
              position: "top-center",
              duration: 1000,
            });
            navigate("/successful");
          }
        } catch (error) {
          toast.error("Something Unexpected Happened", {
            position: "top-center",
            duration: 1000,
          });
        }
      });

    }
  };

  return (
    <div className="container mx-auto p-4 roboto-flex">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Fill in the form below to complete your purchase
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    required
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    required
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  required
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  required
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.address}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Payment Information
                </h3>
                <RadioGroup defaultValue="cash">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash On Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stripe" id="stripe" disabled />
                    <Label htmlFor="stripe" className="text-gray-400">
                      Stripe (Not available)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full mt-6">
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
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
                <span>VAT</span>
                <span>${vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckOut;
