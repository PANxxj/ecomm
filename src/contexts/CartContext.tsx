
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import CartApi from '../API/CartApi'

// Define types
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  vendorId: string;
  vendorName: string;
  quantity: number;
  product:any;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

// Create context
const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState([]);

  const getCartItem = async()=>{

    try{
      const res = await CartApi.cartView()
      console.log(res)
      setItems(res.data.result.cart_items)

    }catch(error){
      console.log(error)
    }
  }
  
  useEffect(() => {
    getCartItem()
    // }
  }, []);
  
  
  // Add item to cart
  const addToCart = async(product: any, quantity: number) => {
    try{
      const res = await CartApi.addToCart({product_id:product.id,quantity:quantity})
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart`,
      });

    }catch(error){
      console.log(error)
    }
    getCartItem()
    
  };
  
  // Remove item from cart
  const removeFromCart = async(productId: string) => {
    try{
      const res = await CartApi.removeItem({id:productId})
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart",
      });

    }catch(error){
      console.log(error)
    }
    getCartItem()
   
  };
  
  // Update quantity
  const updateQuantity = async(productId: string, quantity: number) => {

    try{
      const res = await CartApi.addToCart({product_id:productId,quantity:quantity})

    }catch(error){
      console.log(error)
    }
    getCartItem()
  };
  
  // Clear cart
  const clearCart =async () => {
    try{
      const res = await CartApi.clearCart()

    }catch(error){
      console.log(error)
    }
    getCartItem()
    
  };
  
  // Calculate total
  const total = items.reduce((sum, item) => sum + Number(item.product.price) * Number(item.quantity), 0);
  
  // Calculate item count
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


