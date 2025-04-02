
import { useEffect, useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import CartApi from "../../API/CartApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Search, Eye } from "lucide-react";



const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterOrders(activeTab, value);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterOrders(value, searchTerm);
  };
  
  // Filter orders based on tab and search term
  const filterOrders = (tab: string, search: string) => {
    let filtered = orders;
    
    // Filter by tab
    if (tab !== "all") {
      const status = tab.charAt(0).toUpperCase() + tab.slice(1);
      filtered = filtered.filter(order => order.status === status);
    }
    
    // Filter by search term
    if (search) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
  };
  
  // Handle opening order details
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setOrderStatus(order.status);
    setIsOrderDialogOpen(true);
  };
  
  // Handle updating order status
  const handleUpdateStatus = () => {
    if (selectedOrder && orderStatus) {
      // Update orders array
      const updatedOrders = orders.map(order => 
        order.id === selectedOrder.id ? { ...order, status: orderStatus } : order
      );
      setOrders(updatedOrders);
      
      // Update filtered orders
      filterOrders(activeTab, searchTerm);
      
      toast({
        title: "Order status updated",
        description: `Order ${selectedOrder.id} status changed to ${orderStatus}`,
      });
      
      setIsOrderDialogOpen(false);
    }
  };

    const getOrderList = async () => {
      try {
        const res = await CartApi.getAll();
        console.log(res.data.result)
        setOrders(res.data.result);
        setFilteredOrders(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getOrderList();
    }, []);
  

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage and process customer orders</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6 sm:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search orders..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="m-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">Order ID</th>
                        <th className="py-3 px-4 text-left font-medium">Customer</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Total</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-right font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                          <tr key={order.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{order.order_id}</td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium">{order.customer}</div>
                                <div className="text-sm text-gray-500">{order.email}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{order.date}</td>
                            <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "Delivered" ? "bg-green-100 text-green-800" :
                                order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-gray-500">
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View and manage details for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                  <div className="mt-2 border rounded-md p-4">
                    <p className="font-medium">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
                  <div className="mt-2 border rounded-md p-4">
                    <p className="text-sm">{selectedOrder.shippingAddress}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Information</h3>
                  <div className="mt-2 border rounded-md p-4">
                    <p className="text-sm">
                      <span className="font-medium">Method:</span> {selectedOrder.paymentMethod}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Total:</span> ${selectedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Status</h3>
                  <div className="mt-2">
                    <Select value={orderStatus} onValueChange={setOrderStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
                <div className="border rounded-md">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left font-medium">Item</th>
                        <th className="py-2 px-4 text-right font-medium">Qty</th>
                        <th className="py-2 px-4 text-right font-medium">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map(item => (
                        <tr key={item.id} className="border-b last:border-b-0">
                          <td className="py-3 px-4">{item.name}</td>
                          <td className="py-3 px-4 text-right">{item.quantity}</td>
                          <td className="py-3 px-4 text-right">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={2} className="py-3 px-4 text-right font-medium">Total:</td>
                        <td className="py-3 px-4 text-right font-medium">${selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

export default VendorOrders;
