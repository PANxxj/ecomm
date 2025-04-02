
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product, getProducts } from '@/services/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import ProductApi from '../../API/ProductApi'

interface ProductGridProps {
  category?: string;
  vendorId?: string;
  searchTerm?: string;
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  category, 
  vendorId,
  searchTerm,
  limit
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // const data = await getProducts({
        //   category,
        //   vendorId,
        //   searchd: searchTerm
        // });
        const data = await ProductApi.allProducts()
        
        // Apply limit if specified
        const limitedData = limit ? data.data.result.slice(0, limit) : data.data.result;
        setProducts(limitedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, vendorId, searchTerm, limit]);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: limit || 8 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
