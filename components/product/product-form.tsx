'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Alert } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { categoryApi } from '@/lib/api/categories';
import { Category } from '@/lib/types/category';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  imageFile: File | null;
}

interface ProductFormProps {
  readonly onSubmit?: (data: ProductFormData) => Promise<void>;
  readonly initialData?: Partial<ProductFormData>;
  readonly isEdit?: boolean;
}

export function ProductForm({ onSubmit, initialData, isEdit = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    category: initialData?.category || '',
    imageFile: null,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await categoryApi.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
        setSuccess(true);
        if (!isEdit) {
          // Reset form on successful creation
          setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            imageFile: null,
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success">
          Product {isEdit ? 'updated' : 'created'} successfully!
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">
          Product Name <span className="text-red-600">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">
          Price <span className="text-red-600">*</span>
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
          disabled={isSubmitting}
        />
        <p className="text-xs text-slate-500">
          SKU will be automatically generated based on the product name
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={isSubmitting || loadingCategories}
        >
          <option value="">
            {loadingCategories ? 'Loading categories...' : 'Select a category (optional)'}
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageFile">Product Image</Label>
        <Input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isSubmitting}
        />
        {formData.imageFile && (
          <p className="text-xs text-slate-600">
            Selected: {formData.imageFile.name}
          </p>
        )}
        <p className="text-xs text-slate-500">
          Upload a product image (optional)
        </p>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              {isEdit ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>{isEdit ? 'Update Product' : 'Create Product'}</>
          )}
        </Button>
        <Button type="button" variant="outline" disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
