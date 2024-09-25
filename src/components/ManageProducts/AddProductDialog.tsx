import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProduct, TError } from "@/types";
import { useAddAProductMutation } from "@/redux/api/productApi";
import { toast } from "sonner";

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
type NewProduct = Partial<IProduct>;

function AddProductDialog({ isOpen, onOpenChange }: AddProductDialogProps) {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    category: "",
    stock: 0,
    brand: "",
    description: "",
    price: 0,
    rating: 0,
    image: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "stock" || name === "price" || name === "rating"
          ? Number(value)
          : value,
    }));
  };

  const isFormValid = Object.values(newProduct).every(
    (value) => value !== "" && value !== 0,
  );
  const [sendData] = useAddAProductMutation();

  const handleCreate = async () => {
    try {
      const data = await sendData(newProduct).unwrap();
      if (data.data.success) {
        toast.success("Product created successfully", {
          position: "top-center",
          duration: 1000
        });
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error && typeof error === "object") {
        const newError = error as TError;
        if (newError.data && newError.data.message) {
          errorMessage = newError.data.message;
        }
      }
      toast.error(errorMessage, {
        position: "top-center",
        duration: 1000,
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={newProduct.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              value={newProduct.brand}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={newProduct.rating}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="button" onClick={handleCreate} disabled={!isFormValid}>
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductDialog;
