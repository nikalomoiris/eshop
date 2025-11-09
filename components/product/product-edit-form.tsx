'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Product } from '@/lib/types/product';
import { productApi } from '@/lib/api/products';

interface ProductEditFormProps {
  readonly product: Product;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onProductUpdated: (product: Product) => void;
}

export function ProductEditForm({ product, isOpen, onClose, onProductUpdated }: ProductEditFormProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    category: product.category || '',
    sku: product.sku || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when product changes
  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category || '',
      sku: product.sku || '',
    });
    setError(null);
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const updatedProduct = await productApi.updateProduct(product.id.toString(), {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        sku: formData.sku,
      });

      onProductUpdated(updatedProduct);
      onClose();
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error('Error updating product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Product">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Product Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Price
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <div>
          <label htmlFor="sku" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            SKU
          </label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Enter SKU"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
