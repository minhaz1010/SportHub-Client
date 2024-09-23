import { useState } from 'react';
import { useDeleteAProductMutation, useGetAllProductsWithoutQueryQuery } from "@/redux/api/productApi";
import { IProduct, TError } from '@/types';
import Loading from '@/components/Shared/Loading';
import ProductTable from '@/components/ManageProducts/ProductTable';
import EditProductDialog from '@/components/ManageProducts/EditProductDialog';
import AddProductDialog from '@/components/ManageProducts/AddProductDialog';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

function ManageProducts() {
  const { data, isLoading, isError } = useGetAllProductsWithoutQueryQuery(undefined);
  const [deleteProduct] = useDeleteAProductMutation();
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const products: IProduct[] = data?.data.data;

  if (isLoading || isError) {
    return <Loading />;
  }

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    try {
      const data = await deleteProduct(productId).unwrap();
      if (data.data.success) {
        toast.success("Product deleted successfully", {
          position: "top-center",
          duration: 1000
        });
      }
    } catch (error) {
      const newError = error?.error as TError;
      const errorMessage = newError.data.message;
      toast.error(errorMessage, {
        position: "top-center",
        duration: 1000
      });
    }
  };

  const handleAddProduct = () => {
    setIsAddDialogOpen(true);
  };

  return (
    <div className="container roboto-flex mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">Manage Products</h1>
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
      <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      <EditProductDialog
        product={editingProduct}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
      <AddProductDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}

export default ManageProducts;