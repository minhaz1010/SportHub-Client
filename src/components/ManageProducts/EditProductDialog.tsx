import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IProduct } from '@/types';
import EditProductForm from "./EditProductForm";

interface EditProductDialogProps {
  product: IProduct | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function EditProductDialog({ product, isOpen, onOpenChange }: EditProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-description='Edit Product' className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <EditProductForm product={product} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default EditProductDialog;
