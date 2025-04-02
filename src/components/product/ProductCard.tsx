
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/services/mockData';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate()
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated){
      navigate('/login')
    }    
    addToCart(
        product,1
    );
  };
  
  return (
    <Card className="product-card overflow-hidden h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="flex-grow flex flex-col">
        <div className="">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          
          {product.discountPrice && (
            <Badge className="absolute top-2 right-2 bg-bazaar-accent">
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
            </Badge>
          )}
          
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-4 flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{product.vendorName}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mt-2 line-clamp-2">{product.name}</h3>
          
          <div className="mt-2 flex items-center">
            {product.discountPrice ? (
              <>
                <span className="font-bold text-lg text-bazaar-primary">${product.discountPrice}</span>
                <span className="ml-2 text-sm text-muted-foreground line-through">${product.price}</span>
              </>
            ) : (
              <span className="font-bold text-lg text-bazaar-primary">${product.price}</span>
            )}
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
