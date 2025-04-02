import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CartApi from "../API/CartApi";
// Mock order history data


const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterOrders(value, statusFilter);
  };

  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    filterOrders(searchTerm, value);
  };

  // Filter orders based on search term and status
  const filterOrders = (search: string, status: string) => {
    let filtered = orders;

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    setFilteredOrders(filtered);
  };

  const getOrderList = async () => {
    try {
      const res = await CartApi.orderList();
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

  if (!user) {
    // If user is not logged in
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Order History
            </h1>
            <p className="text-gray-600 mb-8">
              Please sign in to view your order history.
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">View and track your past orders</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative md:w-1/2">
                <Input
                  placeholder="Search by order ID or product name..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="md:w-1/4">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">
                        Order ID
                      </th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left font-medium">Items</th>
                      <th className="py-3 px-4 text-left font-medium">Total</th>
                      <th className="py-3 px-4 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-muted/50">
                        <td className="py-4 px-4 font-medium">{order.order_id}</td>
                        <td className="py-4 px-4">{order.date}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col">
                            {order.items.map((item, index) => (
                              <span key={index} className="text-sm">
                                {item.quantity}x {item.product.name}
                                {index < order.items.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">${order.total.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/orders/track/${order.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No orders found matching your criteria.
                </p>
                <Button asChild>
                  <Link to="/">Browse Products</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OrderHistory;
