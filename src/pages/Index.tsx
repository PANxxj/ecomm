
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Truck, CreditCard, ShieldCheck , 
  TrendingUp, 
  Store} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import CategoryCard from "@/components/product/CategoryCard";
import ProductGrid from "@/components/product/ProductGrid";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/mockData";

const FeaturedCategory = ({ title, image, link }: { title: string; image: string; link: string }) => (
  <Link to={link} className="group">
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform group-hover:scale-105" 
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 flex items-center text-sm text-primary">
          Shop Now <ArrowRight size={16} className="ml-1" />
        </p>
      </CardContent>
    </Card>
  </Link>
);

const FeatureBlock = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
      {icon}
    </div>
    <h3 className="mb-2 font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const Index = () => {
  // Mock featured categories
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <PageLayout>
      <div className="w-full">
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="bazaar-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shop & Sell on Bazaar Connect
              </h1>
              <p className="text-lg md:text-xl mb-8 text-slate-300">
                A multi-vendor marketplace where you can find products from various sellers or start selling your own products today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg"
                  style={{background:'rgb(13 148 136 / var(--tw-bg-opacity, 1))'}}
                   className="bg-bazaar-primary hover:bg-bazaar-primary/90">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                  </Button>
                </Link>
                <Link to="/become-vendor">
                  <Button size="lg" 
                  style={{background:'rgb(13 148 136 / var(--tw-bg-opacity, 1))'}}
                  className=" text-white hover:bg-white/10">
                    <Store className="mr-2 h-5 w-5" />
                    Become a Vendor
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="E-commerce"
                className="rounded-lg shadow-2xl max-w-full md:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section
      <section className="py-16 bg-slate-50">
        <div className="bazaar-container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Bazaar Connect?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 bg-bazaar-primary/10 text-bazaar-primary rounded-full mb-4">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Wide Product Range</h3>
                <p className="text-muted-foreground">
                  Browse thousands of products across multiple categories from various vendors.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 bg-bazaar-accent/10 text-bazaar-accent rounded-full mb-4">
                  <Store className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sell Your Products</h3>
                <p className="text-muted-foreground">
                  Open your own store, list products, and start selling to a wide audience.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 bg-bazaar-secondary/10 text-bazaar-primary rounded-full mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analytics & Insights</h3>
                <p className="text-muted-foreground">
                  Track your sales, monitor performance, and grow your business with detailed insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="bazaar-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link to="/products" className="flex items-center text-bazaar-primary hover:underline">
              View All Categories <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="h-48 animate-pulse">
                  <div className="h-full bg-slate-200 rounded-md"></div>
                </Card>
              ))
            ) : (
              categories.slice(0, 6).map(category => (
                <CategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-slate-50">
        <div className="bazaar-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="flex items-center text-bazaar-primary hover:underline">
              View All Products <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        
          
          <ProductGrid limit={8} />
        </div>
      </section>
      
      {/* Become Vendor CTA */}
      {/* <section className="p-16 bg-bazaar-primary text-white">
        <div className="bazaar-container text-center">
          <h2 className="text-3xl font-bold mb-4">Start Selling on Bazaar Connect</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of vendors who are growing their business with our platform. Create your store, list your products, and start selling today.
          </p>
          <Link to="/register">
            <Button size="lg" variant="outline" className="border-white bg-white text-bazaar-primary hover:bg-white/90">
              Register as a Vendor
            </Button>
          </Link>
        </div>
      </section> */}

      
        {/* Hero Section */}
        {/* <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                  Shop with Confidence on Vendorific
                </h1>
                <p className="mb-6 text-lg opacity-90">
                  Discover thousands of products from verified vendors all in one place.
                  Quality products, secure payments, and fast delivery.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/shop">Shop Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10" asChild>
                    <Link to="/register">Become a Vendor</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=600" 
                  alt="Shopping" 
                  className="rounded-lg shadow-2xl" 
                />
              </div>
            </div>
          </div>
        </section> */}

        {/* Featured Categories */}
        {/* <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Shop by Category</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, index) => (
                <FeaturedCategory key={index} {...category} />
              ))}
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Why Shop With Us</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureBlock 
                icon={<ShoppingBag size={24} />}
                title="Wide Selection" 
                description="Thousands of products from verified vendors across multiple categories."
              />
              <FeatureBlock 
                icon={<ShieldCheck size={24} />}
                title="Secure Shopping" 
                description="Your transactions are protected with industry-standard encryption."
              />
              <FeatureBlock 
                icon={<Truck size={24} />}
                title="Fast Delivery" 
                description="Get your orders delivered quickly to your doorstep."
              />
              <FeatureBlock 
                icon={<CreditCard size={24} />}
                title="Easy Payments" 
                description="Multiple payment options for a seamless checkout experience."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Selling?</h2>
            <p className="mb-8 text-lg">Join thousands of vendors already growing their business with us.</p>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/register">Become a Vendor</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
