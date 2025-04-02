
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VendorLayoutProps {
  children: React.ReactNode;
}

const VendorLayout = ({ children }: VendorLayoutProps) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Effect for handling responsive sidebar
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navigationItems = [
    {
      name: "Dashboard",
      path: "/vendor/dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Products",
      path: "/vendor/products",
      icon: <Package size={20} />
    },
    {
      name: "Orders",
      path: "/vendor/orders",
      icon: <ShoppingBag size={20} />
    },
    {
      name: "Analytics",
      path: "/vendor/analytics",
      icon: <BarChart3 size={20} />
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile menu toggle button */}
      <div className="bg-white border-b md:hidden p-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          Vendorific
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Sidebar for desktop and mobile */}
      <aside
        className={`bg-white border-r border-gray-200 w-64 flex-shrink-0 ${
          isMobile
            ? isMobileMenuOpen
              ? "block absolute z-10 h-full"
              : "hidden"
            : "block"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Brand/logo */}
          <div className="h-16 flex items-center px-4 border-b border-gray-200 hidden md:flex">
            <Link to="/" className="text-xl font-bold text-primary">
              Vendorific
            </Link>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
            <ul className="px-2 space-y-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-2 py-2 rounded-md flex items-center space-x-3 ${
                      isActive(item.path)
                        ? "bg-vendor/10 text-vendor"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className={`${isActive(item.path) ? "text-vendor" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2" 
              onClick={logout}
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default VendorLayout;
