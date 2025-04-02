
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import UserApi from '../API/UserApi'

// Define types for our context
type User = {
  id: string;
  username: string;
  email: string;
  user_type: "Vendor" | "Customer" | "admin";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

type RegisterData = {
  full_name: string;
  email: string;
  password: string;
  user_type: "Vendor" | "Customer";
};

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await UserApi.signIn({email,password});
      
      // Save to state and local storage
      setUser(response.data.result.user);
      setToken(response.data.result.token);
      localStorage.setItem("user", JSON.stringify(response.data.result.user));
      localStorage.setItem("token", response.data.result.access_token);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.data.result.user.full_name}!`,
      });
      
      // Redirect based on user_type
      if (response.data.result.user.user_type === "Vendor") {
        navigate("/Vendor/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log('error',error)
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      console.log('data',userData)
      const response = await UserApi.signUp(userData);
      console.log(response.data.result)
      // Save to state and local storage
      setUser(response.data.result.user);
      setToken(response.data.result.token);
      localStorage.setItem("user", JSON.stringify(response.data.result.user));
      localStorage.setItem("token", response.data.result.access_token);
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${response.data.result.user.full_name}!`,
      });
      
      // Redirect based on user_type
      if (response.data.result.user.user_type === "Vendor") {
        navigate("/Vendor/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log('error',error)
      toast({
        title: "Registration failed",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
