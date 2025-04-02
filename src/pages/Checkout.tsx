
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, Truck, Check } from "lucide-react";
import CartApi from '../API/CartApi'

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.username || "",
    lastName: "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <p className="mt-4 text-gray-600">Your cart is empty. Add items to your cart before proceeding to checkout.</p>
            <Button className="mt-6" asChild>
              <Link to="/">Shop Now</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields based on current step
    if (step === 1) {
      // Basic validation for shipping info
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.email.includes('@')) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
        return;
      }
      
      // Proceed to next step
      setStep(2);
      return;
    }
    
    // Validate payment info
    if (step === 2 && paymentMethod === "credit") {
      if (!formData.cardName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
        toast({
          title: "Missing Payment Information",
          description: "Please fill in all payment details",
          variant: "destructive"
        });
        return;
      }
      
      // Validate card number format (simple check)
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive"
        });
        return;
      }
      
      // Validate expiry date format (MM/YY)
      if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        toast({
          title: "Invalid Expiry Date",
          description: "Please enter a valid expiry date (MM/YY)",
          variant: "destructive"
        });
        return;
      }
      
      // Validate CVC
      if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        toast({
          title: "Invalid CVC",
          description: "Please enter a valid CVC code",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Process the order
    if (step === 2) {
      setIsSubmitting(true);
      
      // Simulate API call
      // setTimeout(() => {
      //   // Show success toast
      //   toast({
      //     title: "Order Placed Successfully",
      //     description: "Your order has been placed and is being processed.",
      //   });
      const payload = {
        customer:user?.id,
        total_price:Math.round(total + 5.99 + total * 0.08),
        shipping_address:'',
        shipping_method:'',
        order_items:items.map(item=>{
          return {
            product:item.product.id,
            quantity:item.quantity,
            price:Number(item.product.price)
          }
        })
      }
      try{
        const res = await CartApi.createOrder(payload)
        clearCart();
        navigate(`/orders/track/${res.data.result}`);
      }
      catch(error){
        console.log(error)
      }
        
        // Clear cart
        
        // Simulate order ID
        // const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        
        // Redirect to order tracking page
        
        setIsSubmitting(false);
      // }, 1500);
    }
  };

  // Order summary content
  const OrderSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <Separator />
        
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>$5.99</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${(total * 0.08).toFixed(2)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${(total + 5.99 + total * 0.08).toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 ? (
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Shipping Information
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleInputChange} 
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input 
                            id="state" 
                            name="state" 
                            value={formData.state} 
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code *</Label>
                          <Input 
                            id="zipCode" 
                            name="zipCode" 
                            value={formData.zipCode} 
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input 
                          id="country" 
                          name="country" 
                          value={formData.country} 
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" className="w-full">
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label>Payment Method</Label>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                          <div className="flex items-center space-x-2 border rounded-md p-3">
                            <RadioGroupItem value="credit" id="credit" />
                            <Label htmlFor="credit" className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-2" />
                              Credit Card
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-3">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal">PhonePe</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {paymentMethod === "credit" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card *</Label>
                            <Input 
                              id="cardName" 
                              name="cardName" 
                              value={formData.cardName} 
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input 
                              id="cardNumber" 
                              name="cardNumber" 
                              placeholder="1234 5678 9012 3456" 
                              value={formData.cardNumber} 
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">Expiration Date *</Label>
                              <Input 
                                id="cardExpiry" 
                                name="cardExpiry" 
                                placeholder="MM/YY" 
                                value={formData.cardExpiry} 
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvc">CVC *</Label>
                              <Input 
                                id="cardCvc" 
                                name="cardCvc" 
                                placeholder="123" 
                                value={formData.cardCvc} 
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2 pt-4">
                        <Button 
                          type="button"
                          variant="outline" 
                          className="w-full mb-2"
                          onClick={() => setStep(1)}
                        >
                          Back to Shipping
                        </Button>
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>Processing Order...</>
                          ) : (
                            <>Place Order - ${(total + 5.99 + total * 0.08).toFixed(2)}</>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
