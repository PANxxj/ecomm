
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Truck, Package, ShoppingBag } from "lucide-react";
import CartApi from '../API/CartApi'
// Mock order data
const mockOrder = {
  id: "ORD-123456",
  date: "2023-10-25",
  status: "Shipped",
  shippingAddress: "123 Main Street, Anytown, CA 12345",
  items: [
    {
      id: "1",
      name: "Modern Desk Lamp",
      price: 49.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: "5",
      name: "Coffee Mug",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ],
  subtotal: 75.97,
  shipping: 5.99,
  tax: 6.08,
  total: 88.04,
  tracking: {
    number: "TRK9876543210",
    carrier: "Vendor Express",
    steps: [
      {
        id: 1,
        status: "Order Placed",
        description: "Your order has been received and is being processed.",
        date: "2023-10-25",
        time: "09:23 AM",
        completed: true
      },
      {
        id: 2,
        status: "Processing",
        description: "Your order is being prepared for shipping.",
        date: "2023-10-25",
        time: "02:45 PM",
        completed: true
      },
      {
        id: 3,
        status: "Shipped",
        description: "Your order has been shipped and is on its way to you.",
        date: "2023-10-26",
        time: "11:30 AM",
        completed: true
      },
      {
        id: 4,
        status: "Out for Delivery",
        description: "Your package is out for delivery and will arrive today.",
        date: "2023-10-27",
        time: "08:15 AM",
        completed: false
      },
      {
        id: 5,
        status: "Delivered",
        description: "Your package has been delivered.",
        date: "Pending",
        time: "Pending",
        completed: false
      }
    ],
    estimatedDelivery: "October 27, 2023"
  }
};

// Step icon mapping
const StepIcon = ({ status, completed }: { status: string; completed: boolean }) => {
  const className = `h-6 w-6 ${completed ? "text-green-500" : "text-gray-400"}`;
  
  switch (status) {
    case "Order Placed":
      return <ShoppingBag className={className} />;
    case "Processing":
      return <Package className={className} />;
    case "Shipped":
      return <Truck className={className} />;
    case "Out for Delivery":
      return <Truck className={className} />;
    case "Delivered":
      return <Check className={className} />;
    default:
      return <Package className={className} />;
  }
};

const OrderTrack = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get order details
    const fetchOrder = async () => {
      // In a real app, you would fetch the order based on the ID
      // For now, use the mock data and replace the ID with the one from params
      // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      // setOrder({
      //   ...mockOrder,
      //   id: id || mockOrder.id
      // });await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      // setOrder({
      //   ...mockOrder,
      //   id: id || mockOrder.id
      // });
      try{

        const res = await CartApi.orderDetail(id)
        setOrder(res.data.result)
      }catch(error)
      {
        console.log(error)
      }

      setIsLoading(false);
    };
    
    fetchOrder();
  }, [id]);
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Loading Order Details...</h1>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (!order) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find the order you're looking for.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order Tracking</h1>
          <p className="text-gray-600">Track your order #{order.id}</p>
        </div>
        
        {/* Order Status Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                <div>
                  <h3 className="font-medium">Current Status: <span className="text-primary">{order.status}</span></h3>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date: {order.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Tracking Number:</span> {order.tracking.number}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Carrier:</span> {order.tracking.carrier}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Estimated Delivery:</span> {order.tracking.estimatedDelivery}
                </p>
              </div>
            </div>
            
            {/* Tracking Timeline */}
            <div className="relative">
              {order.tracking.steps.map((step: any, index: number) => (
                <div key={step.id} className="flex mb-8 last:mb-0">
                  {/* Step Icon */}
                  <div className="flex-shrink-0 w-10">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-100" : "bg-gray-100"
                    }`}>
                      <StepIcon status={step.status} completed={step.completed} />
                    </div>
                    
                    {/* Vertical Line */}
                    {index < order.tracking.steps.length - 1 && (
                      <div className="h-full mx-auto w-px bg-gray-200 relative top-0" 
                        style={{ height: "40px", marginTop: "8px" }} />
                    )}
                  </div>
                  
                  {/* Step Details */}
                  <div className="ml-4 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h4 className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                        {step.status}
                      </h4>
                      <div className="text-sm text-gray-500">
                        {step.date !== "Pending" ? `${step.date}, ${step.time}` : "Pending"}
                      </div>
                    </div>
                    <p className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-500"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Information */}
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p className="text-gray-600">{order.shippingAddress}</p>
              </div>
              
              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-2">Order Total</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 font-medium border-t">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-4">Items in this Order</h3>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-primary">
                          {item.name}
                        </Link>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                        <p className="text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/orders/history">View All Orders</Link>
              </Button>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OrderTrack;
