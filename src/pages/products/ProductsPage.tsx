
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { SearchIcon, SlidersHorizontal } from 'lucide-react';
import { getCategories, Category } from '@/services/mockData';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/components/layout/PageLayout';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  
  // Filter states
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Apply filters
  const applyFilters = () => {
    const params: Record<string, string> = {};
    
    if (selectedCategory) params.category = selectedCategory;
    if (searchTerm) params.search = searchTerm;
    
    setSearchParams(params);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setPriceRange([0, 2000]);
    setInStockOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };
  
  // Render filters for desktop view
  const renderDesktopFilters = () => (
    <div className="w-64 pr-8">
      <h2 className="text-xl font-bold mb-6">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium">Search</Label>
          <div className="mt-2 flex">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
        </div>
        
        <Accordion type="single" collapsible defaultValue="categories">
          <AccordionItem value="categories">
            <AccordionTrigger className="text-base font-medium">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                <div className="flex items-center">
                  <Checkbox 
                    id="all-categories"
                    checked={selectedCategory === ''}
                    onCheckedChange={() => setSelectedCategory('')}
                  />
                  <label htmlFor="all-categories" className="ml-2 text-sm cursor-pointer">
                    All Categories
                  </label>
                </div>
                
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={category.id}
                      checked={selectedCategory === category.name}
                      onCheckedChange={() => setSelectedCategory(category.name)}
                    />
                    <label htmlFor={category.id} className="ml-2 text-sm cursor-pointer">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="price">
            <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="mt-4">
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="availability">
            <AccordionTrigger className="text-base font-medium">Availability</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center mt-2">
                <Checkbox 
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={() => setInStockOnly(!inStockOnly)}
                />
                <label htmlFor="in-stock" className="ml-2 text-sm cursor-pointer">
                  In Stock Only
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="space-y-3">
          <Label className="text-base font-medium">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3 pt-2">
          <Button className="w-full" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
  
  // Render mobile filters (in a sheet)
  const renderMobileFilters = () => (
    <div className="mb-6">
      <div className="flex gap-2">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">Categories</Label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-medium">Price Range</Label>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-medium">Availability</Label>
                <div className="flex items-center">
                  <Checkbox 
                    id="mobile-in-stock"
                    checked={inStockOnly}
                    onCheckedChange={() => setInStockOnly(!inStockOnly)}
                  />
                  <label htmlFor="mobile-in-stock" className="ml-2 cursor-pointer">
                    In Stock Only
                  </label>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-medium">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <SheetFooter className="pt-4">
              <Button 
                className="w-full" 
                onClick={() => {
                  applyFilters();
                  document.body.click(); // Close the sheet
                }}
              >
                Apply Filters
              </Button>
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={() => {
                  resetFilters();
                  document.body.click(); // Close the sheet
                }}
              >
                Reset Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        <Button onClick={() => applyFilters()}>
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
  
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">All Products</h1>
          {selectedCategory && (
            <p className="text-muted-foreground mt-2">
              Showing results for "{selectedCategory}"
            </p>
          )}
          {searchTerm && (
            <p className="text-muted-foreground mt-2">
              Search results for "{searchTerm}"
            </p>
          )}
        </div>
        
        {isMobile ? (
          <>
            {renderMobileFilters()}
            <ProductGrid 
              category={selectedCategory}
              searchTerm={searchTerm}
            />
          </>
        ) : (
          <div className="flex">
            {renderDesktopFilters()}
            <div className="flex-grow w-2">
              <ProductGrid 
                category={selectedCategory}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
