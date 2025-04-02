
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import ProductApi from '../API/ProductApi'

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find product with matching ID
  const [product,setProducts] = useState(null)
  const getOrderList = async () => {
      try {
        const res = await ProductApi.getProduct(id);
        setProducts(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getOrderList();
    }, []);
  
  // Handle if product not found
  if (!product) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
            <p className="mt-2 text-gray-600">Sorry, the product you are looking for could not be found.</p>
            <Button className="mt-4" asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  // Increment quantity
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product?.image} 
              alt={product?.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product? Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
              <p className="text-lg text-gray-600 mt-1">By {product?.vendorName}</p>
              
              {/* Ratings */}
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product?.rating) 
                          ? "text-yellow-400 fill-yellow-400" 
                          : i < product?.rating 
                            ? "text-yellow-400 fill-yellow-400 opacity-50" 
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({8} reviews)</span>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-gray-900">${product?.price}</div>
            
            <p className="text-gray-700">{product?.description}</p>
            
            <div className="flex items-center space-x-2">
              <div className="text-gray-700">Availability:</div>
              {product?.stock > 0 ? (
                <div className="text-green-600">In Stock ({product?.stock} available)</div>
              ) : (
                <div className="text-red-600">Out of Stock</div>
              )}
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-700">Quantity:</div>
              <div className="flex items-center border rounded-md">
                <button 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="px-4 py-1 text-center w-12">{quantity}</div>
                <button 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100" 
                  onClick={incrementQuantity}
                  disabled={quantity >= product?.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleAddToCart}
              disabled={product?.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            {/* Additional Details */}
            <div className="border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-gray-500">Category</dt>
                  <dd className="mt-1 text-gray-900">{product?.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Vendor</dt>
                  <dd className="mt-1 text-gray-900">{product?.vendorName}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
        {/* Product? Tabs (Description, Reviews) */}
        <div className="mt-16">
          <Tabs defaultValue="reviews">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews ({8})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card className="p-6">
                <div className="prose max-w-none">
                  <h3>Product Description</h3>
                  <p>{product?.description}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu semper justo. Duis volutpat, nibh at volutpat commodo, eros quam tincidunt orci, a pretium velit nulla in ipsum. Aliquam venenatis lacus lacus, et efficitur dui cursus non.</p>
                  <h4>Features</h4>
                  <ul>
                    <li>Premium quality materials</li>
                    <li>Designed for durability</li>
                    <li>Modern aesthetic</li>
                    <li>User-friendly design</li>
                  </ul>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    {/* <span className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product?.rating) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : i < product?.rating 
                                ? "text-yellow-400 fill-yellow-400 opacity-50" 
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">{product?.rating.toFixed(1)} out of 5</span>
                    </span> */}
                  </div>
                  
                  <Separator />
                  
                  {/* Review List */}
                  {/* <div className="space-y-6">
                    {product?.reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                        <Separator />
                      </div>
                    ))}
                  </div> */}
                  
                  {/* Add Review Button */}
                  <div className="text-center pt-4">
                    <Button variant="outline">Write a Review</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
