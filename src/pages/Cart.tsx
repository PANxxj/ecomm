
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Minus, Plus } from "lucide-react";

const Cart = () => {
  // const items= [
  //       {
  //         id: 'item5',
  //         productId: 'prod3',
  //         name: 'Wireless Earbuds',
  //         image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80',
  //         quantity: 1,
  //         price: 129.99,
  //         vendorId: 'v2',
  //         vendorName: 'AudioMasters'
  //       },
  //       {
  //         id: 'item6',
  //         productId: 'prod9',
  //         name: 'Bestselling Novel',
  //         image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
  //         quantity: 2,
  //         price: 19.99,
  //         vendorId: 'v7',
  //         vendorName: 'Book Haven'
  //       }
  //     ]
  const {  removeFromCart, updateQuantity, total,items } = useCart();
  console.log(items)
  // Group items by vendor
  const itemsByVendor = items.reduce((acc, item) => {
    console.log(item)
    if (!acc[item.product.vendorId]) {
      acc[item.product.vendorId] = {
        vendorName: item.product.vendorName,
        items: []
      };
    }
    acc[item.product.vendorId].items.push(item);
    return acc;
  }, {} as Record<string, { vendorName: string; items: typeof items }>);
  
  // If cart is empty
  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
            <p className="mt-4 text-gray-600">Your cart is currently empty</p>
            <Button className="mt-6" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  console.log(itemsByVendor)
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.values(itemsByVendor).map((vendorGroup, index) => (
                  <div key={index} className="mb-8 last:mb-0">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Sold by: {vendorGroup.vendorName}
                    </div>
                    
                    {vendorGroup.items.map((item) => (
                      <div key={item.product.id} className="flex flex-col sm:flex-row py-6 border-b last:border-b-0">
                        {/* Product Image */}

                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        {/* Product Details */}
                        <div className="ml-0 sm:ml-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between">
                              <Link to={`/product/${item.product.id}`} className="font-medium text-gray-900 hover:text-primary">
                                {item.product.name}
                              </Link>
                              <p className="ml-4 text-gray-900 font-medium">
                                ${(item.product.price * item.quantity)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-grtoFay-500">${item.product.price} each</p>
                          </div>
                          
                          {/* Quantity and Remove */}
                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Control */}
                            <div className="flex items-center border rounded-md">
                              <button 
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100" 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <div className="px-3 py-1 text-center w-10">{item.quantity}</div>
                              <button 
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100" 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            {/* Remove Button */}
                            <button 
                              className="text-red-600 hover:text-red-800 flex items-center"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center mb-4">
                    <div className="relative flex items-center">
                      <Input 
                        placeholder="Enter coupon code" 
                        className="pr-20" 
                      />
                      <Button 
                        className="absolute right-0 rounded-l-none" 
                        size="sm"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cart;
