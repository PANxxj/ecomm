
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, User, Menu, X,Search, } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();

  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm top-0 sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">
                E-Comm
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/products" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Products
              </Link>
              <Link to="/shop" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Categories
              </Link>
            </div>
          </div>
          
          {/* Search bar (hidden on very small devices) */}
          <div className="hidden sm:flex items-center flex-1 mx-4 relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 max-w-md w-full"
            />
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="p-1 rounded-full text-gray-500 hover:text-gray-700 relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* Profile Dropdown */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full p-1 text-gray-500 hover:text-gray-700">
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span className="capitalize">{user?.user_type}</span> Profile
                  </DropdownMenuItem>
                  {user?.user_type === "Vendor" && (
                    <>
                      <DropdownMenuItem>
                        <Link to="/vendor/dashboard" className="w-full">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/vendor/products" className="w-full">Products</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/vendor/orders" className="w-full">Orders</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.user_type === "Customer" && (
                    <DropdownMenuItem>
                      <Link to="/orders/history" className="w-full">Order History</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>

          
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
     
      {isMobile && (
        <div className=" px-4 mb-2 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 w-full"
            />
          </div>
        </div>
      )}
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              Home
            </Link>
            <Link to="/shop" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              Shop
            </Link>
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <div className="pl-3 pr-4 py-2 border-b border-gray-200">
                  <div className="text-base font-medium text-gray-800 capitalize">{user?.username}</div>
                  <div className="text-sm font-medium text-gray-500 capitalize">{user?.user_type}</div>
                </div>
                {user?.user_type === "Vendor" && (
                  <>
                    <Link to="/vendor/dashboard" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                      Dashboard
                    </Link>
                    <Link to="/vendor/products" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                      Products
                    </Link>
                    <Link to="/vendor/orders" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                      Orders
                    </Link>
                  </>
                )}
                {user?.user_type === "Customer" && (
                  <Link to="/orders/history" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    Order History
                  </Link>
                )}
                <Link to="/cart" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  Cart ({itemCount})
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
                <Button className="w-full" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
    </nav>
  );
};

export default Navbar;
