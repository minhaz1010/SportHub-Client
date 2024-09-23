import React, { useState, useEffect } from "react";
import { useUpdateAProductMutation } from "@/redux/api/productApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProduct, TError } from "@/types";
import { toast } from "sonner";

interface EditProductFormProps {
  product: IProduct | null;
  onClose: () => void;
}

function EditProductForm({ product, onClose }: EditProductFormProps) {
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [sendData] = useUpdateAProductMutation();

  useEffect(() => {
    setEditingProduct(product);
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingProduct) {
      try {
        const neweditingProduct: IProduct = {
          ...editingProduct,
          rating: Number(editingProduct.rating),
          stock: Number(editingProduct.stock),
          price: Number(editingProduct.price),
        }
        const data = await sendData(neweditingProduct);
        console.log(data.data)
        if (data.data?.success) {
          toast.success("Product Edited Successfully", { position: "top-center" });
        }
      } catch (error) {
        const newError = error?.error as TError;
        const message = newError.data.message;
        toast.error(message, { position: "top-center" })
      }
      onClose();
    }
  };

  if (!editingProduct) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={editingProduct.name || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          value={editingProduct.category || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          value={editingProduct.stock || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          name="brand"
          value={editingProduct.brand || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={editingProduct.price || ""}
          onChange={handleInputChange}
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
          value={editingProduct.rating || ""}
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}

export default EditProductForm;
