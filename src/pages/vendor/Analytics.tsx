
import VendorLayout from "@/components/layout/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell,
  ResponsiveContainer 
} from "recharts";
import { useEffect, useState } from "react";

// Mock data
const salesDataMonthly = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 3200 },
  { name: "Sep", value: 2800 },
  { name: "Oct", value: 4300 },
  { name: "Nov", value: 5100 },
  { name: "Dec", value: 6200 }
];

const salesDataWeekly = [
  { name: "Mon", value: 800 },
  { name: "Tue", value: 1200 },
  { name: "Wed", value: 1500 },
  { name: "Thu", value: 1300 },
  { name: "Fri", value: 1600 },
  { name: "Sat", value: 2100 },
  { name: "Sun", value: 1400 }
];

const topProducts = [
  { name: "Modern Desk Lamp", value: 65 },
  { name: "Coffee Mug", value: 42 },
  { name: "Leather Wallet", value: 38 },
  { name: "Smart Watch", value: 25 },
  { name: "Wireless Headphones", value: 20 }
];

const categoryDistribution = [
  { name: "Home", value: 45 },
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 15 },
  { name: "Accessories", value: 5 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const salesByDay = {
  monday: [
    { time: "9am", sales: 200 },
    { time: "10am", sales: 350 },
    { time: "11am", sales: 400 },
    { time: "12pm", sales: 550 },
    { time: "1pm", sales: 500 },
    { time: "2pm", sales: 450 },
    { time: "3pm", sales: 550 },
    { time: "4pm", sales: 600 },
    { time: "5pm", sales: 650 }
  ],
  tuesday: [
    { time: "9am", sales: 250 },
    { time: "10am", sales: 400 },
    { time: "11am", sales: 450 },
    { time: "12pm", sales: 600 },
    { time: "1pm", sales: 550 },
    { time: "2pm", sales: 500 },
    { time: "3pm", sales: 600 },
    { time: "4pm", sales: 650 },
    { time: "5pm", sales: 700 }
  ],
  wednesday: [
    { time: "9am", sales: 300 },
    { time: "10am", sales: 450 },
    { time: "11am", sales: 500 },
    { time: "12pm", sales: 650 },
    { time: "1pm", sales: 600 },
    { time: "2pm", sales: 550 },
    { time: "3pm", sales: 650 },
    { time: "4pm", sales: 700 },
    { time: "5pm", sales: 750 }
  ]
};

type TimeframeType = "daily" | "weekly" | "monthly";

const VendorAnalytics = () => {
  const [selectedDay, setSelectedDay] = useState("monday");
  const [timeframe, setTimeframe] = useState<TimeframeType>("monthly");
  const [salesData, setSalesData] = useState(salesDataMonthly);
  
  // Update sales data based on timeframe
  useEffect(() => {
    if (timeframe === "monthly") {
      setSalesData(salesDataMonthly);
    } else if (timeframe === "weekly") {
      setSalesData(salesDataWeekly);
    }
  }, [timeframe]);
  
  return (
    <VendorLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Get insights into your business performance</p>
        </div>
        
        {/* Sales Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <CardTitle>Sales Overview</CardTitle>
              <Select value={timeframe} onValueChange={(value: TimeframeType) => setTimeframe(value)}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle Section - Two Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProducts}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--primary))" name="Units Sold" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} units`, 'Quantity']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Daily Sales Pattern */}
        <Card className="mb-8">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <CardTitle>Daily Sales Pattern</CardTitle>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesByDay[selectedDay as keyof typeof salesByDay]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name="Sales ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Sales Performance Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue">
              <TabsList className="mb-4">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="revenue" className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesDataMonthly}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#0EA5E9" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="orders" className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { name: "Jan", value: 45 },
                      { name: "Feb", value: 38 },
                      { name: "Mar", value: 52 },
                      { name: "Apr", value: 40 },
                      { name: "May", value: 35 },
                      { name: "Jun", value: 42 },
                      { name: "Jul", value: 48 },
                      { name: "Aug", value: 50 },
                      { name: "Sep", value: 55 },
                      { name: "Oct", value: 60 },
                      { name: "Nov", value: 65 },
                      { name: "Dec", value: 70 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Orders']} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#6366F1" name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="customers" className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Jan", value: 12 },
                      { name: "Feb", value: 15 },
                      { name: "Mar", value: 18 },
                      { name: "Apr", value: 14 },
                      { name: "May", value: 16 },
                      { name: "Jun", value: 19 },
                      { name: "Jul", value: 22 },
                      { name: "Aug", value: 24 },
                      { name: "Sep", value: 26 },
                      { name: "Oct", value: 28 },
                      { name: "Nov", value: 32 },
                      { name: "Dec", value: 38 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'New Customers']} />
                    <Legend />
                    <Bar dataKey="value" fill="#10B981" name="New Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorAnalytics;
