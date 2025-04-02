
import { useEffect, useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus, Search, MoreVertical, Pencil, Trash2, AlertCircle } from "lucide-react";
import ProductApi from '../../API/ProductApi'



const categories = ["All", "Home", "Electronics", "Clothing", "Accessories"];

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    status: "Active"
  });

  // Handle filter changes
  const handleFilterChange = (category: string, tab: string, search: string) => {
    let filtered = [...products];
    
    // Filter by tab (all, active, draft)
    if (tab !== "all") {
      const status = tab === "active" ? "Active" : "Draft";
      filtered = filtered.filter(product => product.status === status);
    }
    
    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by search
    if (search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) || 
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  // Set active tab and update filters
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    handleFilterChange(activeCategory, value, searchTerm);
  };

  // Set active category and update filters
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    handleFilterChange(value, activeTab, searchTerm);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleFilterChange(activeCategory, activeTab, value);
  };

  // Handle form input changes for new/edit product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [name]: value
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [name]: value
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };

  // Add or update product
  const handleSaveProduct = async () => {
    const productData = selectedProduct ? selectedProduct : newProduct;
    
    // Basic validation
    if (!productData.name || !productData.price || !productData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(Number(productData.price)) || Number(productData.price) <= 0) {
      toast({
        title: "Error",
        description: "Price must be a positive number",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(Number(productData.stock)) || Number(productData.stock) < 0) {
      toast({
        title: "Error",
        description: "Stock must be a positive number or zero",
        variant: "destructive",
      });
      return;
    }
    
    // Create new product or update existing one
    if (selectedProduct) {
      // // Update existing product
      // setProducts(products.map(p => p.id === selectedProduct.id ? {
      //   ...selectedProduct,
      //   price: Number(selectedProduct.price),
      //   stock: Number(selectedProduct.stock)
      // } : p));

      try{

        const res = await ProductApi.updateProduct({
          id:selectedProduct.id,
          title:selectedProduct.name,
          stock_quantity:Number(selectedProduct.stock),
          photo1:selectedProduct.image,
          description:selectedProduct.description,
          price:Number(selectedProduct.price).toFixed(2),
          category:selectedProduct.category,
        })
        getProducts()
      }catch(errors)
      {
        console.log(errors)
      }
      
      toast({
        title: "Product updated",
        description: `${selectedProduct.name} has been updated successfully.`
      });
    } else {
      // Create new product
      // const newId = (products.length + 1).toString();
      // const finalProduct = {
      //   ...newProduct,
      //   id: newId,
      //   price: Number(newProduct.price),
      //   stock: Number(newProduct.stock),
      //   image: newProduct.image || "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=300&h=300",
      // };
      // setProducts([...products, finalProduct]);
      try{

        const res = await ProductApi.createProduct({
          title:newProduct.name,
          stock_quantity:Number(newProduct.stock),
          photo1:newProduct.image,
          description:newProduct.description,
          price:Number(newProduct.price).toFixed(2),
          category:newProduct.category,
        })
        getProducts()
      }catch(errors)
      {
        console.log(errors)
      }
      
      toast({
        title: "Product added",
        description: `${newProduct.name} has been added successfully.`
      });
      
      // Reset new product form
      setNewProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        status: "Active"
      });
    }
    
    // Close dialog and refresh filters
    setIsAddDialogOpen(false);
    setSelectedProduct(null);
    handleFilterChange(activeCategory, activeTab, searchTerm);
  };

  // Delete product
  const handleDeleteProduct = async() => {
    if (selectedProduct) {
      try{
        const res = await ProductApi.deleteProduct(selectedProduct.id)

      }catch(error){
        console.log('error',error)
      }
      getProducts()
      toast({
        title: "Product deleted",
        description: `${selectedProduct.name} has been deleted.`
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };
  const getProducts = async()=>{
    try{

      const res = await ProductApi.allProducts('','')
      setProducts(res.data.result)
      setFilteredProducts(res.data.result)
    }catch(error){
      console.log(error)
    }

  }
  useEffect(()=>{
    getProducts()
  },[])

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Button 
            className="w-full md:w-auto"
            onClick={() => {
              setSelectedProduct(null);
              setIsAddDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Product Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Select 
                value={activeCategory} 
                onValueChange={(value) => handleCategoryChange(value)}
              >
                <SelectTrigger className="md:w-1/4">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="m-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">Product</th>
                        <th className="py-3 px-4 text-left font-medium">Category</th>
                        <th className="py-3 px-4 text-left font-medium">Price</th>
                        <th className="py-3 px-4 text-left font-medium">Stock</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                          <tr key={product.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-gray-500 truncate max-w-[200px]">{product.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{product.category}</td>
                            <td className="py-3 px-4">${product.price}</td>
                            <td className="py-3 px-4">
                              <span className={`${product.stock < 10 ? "text-red-500" : "text-gray-900"}`}>
                                {product.stock}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}>
                                {product.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => {
                                      setSelectedProduct(product);
                                      setIsAddDialogOpen(true);
                                    }}
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => {
                                      setSelectedProduct(product);
                                      setIsDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-gray-500">
                            No products found
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

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {selectedProduct 
                ? "Update the product information below" 
                : "Fill in the details to add a new product to your inventory"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Product name"
                  value={selectedProduct ? selectedProduct.name : newProduct.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product"
                  rows={4}
                  value={selectedProduct ? selectedProduct.description : newProduct.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={selectedProduct ? selectedProduct.image : newProduct.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={selectedProduct ? selectedProduct.category : newProduct.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={selectedProduct ? selectedProduct.price : newProduct.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="0"
                  value={selectedProduct ? selectedProduct.stock : newProduct.stock}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={selectedProduct ? selectedProduct.status : newProduct.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              setSelectedProduct(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              {selectedProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-medium text-red-800">
                {selectedProduct?.name}
              </p>
              <p className="text-sm text-red-600">
                This will permanently remove the product from your inventory.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsDeleteDialogOpen(false);
              setSelectedProduct(null);
            }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

export default VendorProducts;
