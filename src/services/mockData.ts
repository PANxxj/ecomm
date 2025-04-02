
// Mock data for our e-commerce platform

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    image: string;
    category: string;
    vendorId: string;
    vendorName: string;
    rating: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
  }
  
  export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    vendorId: string;
    vendorName: string;
  }
  
  // Mock Categories
  export const categories: Category[] = [
    {
      id: 'cat1',
      name: 'Electronics',
      slug: 'electronics',
      description: 'Latest gadgets and electronic devices',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1201&q=80'
    },
    {
      id: 'cat2',
      name: 'Fashion',
      slug: 'fashion',
      description: 'Trendy clothing and accessories',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
    },
    {
      id: 'cat3',
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Everything for your home and garden',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
    },
    {
      id: 'cat4',
      name: 'Beauty & Health',
      slug: 'beauty-health',
      description: 'Beauty products and health care items',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1208&q=80'
    },
    {
      id: 'cat5',
      name: 'Sports & Outdoors',
      slug: 'sports-outdoors',
      description: 'Equipment for sports and outdoor activities',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'cat6',
      name: 'Books & Media',
      slug: 'books-media',
      description: 'Books, movies, music and more',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  ];
  
  // Mock Products
  export const products: Product[] = [
    {
      id: 'prod1',
      name: 'Smartphone X',
      description: 'Latest flagship smartphone with high-end features and camera',
      price: 899.99,
      discountPrice: 799.99,
      images: [
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80',
        'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
      ],
      category: 'Electronics',
      vendorId: 'v1',
      vendorName: 'TechGadgets Inc.',
      rating: 4.7,
      stock: 25,
      createdAt: '2023-01-15T08:00:00Z',
      updatedAt: '2023-01-15T08:00:00Z'
    },
    {
      id: 'prod2',
      name: 'Laptop Pro',
      description: 'Powerful laptop for professionals with high-performance specs',
      price: 1299.99,
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80'
      ],
      category: 'Electronics',
      vendorId: 'v1',
      vendorName: 'TechGadgets Inc.',
      rating: 4.5,
      stock: 10,
      createdAt: '2023-01-18T09:30:00Z',
      updatedAt: '2023-01-18T09:30:00Z'
    },
    {
      id: 'prod3',
      name: 'Wireless Earbuds',
      description: 'Premium wireless earbuds with noise cancellation',
      price: 149.99,
      discountPrice: 129.99,
      images: [
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80',
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
      ],
      category: 'Electronics',
      vendorId: 'v2',
      vendorName: 'AudioMasters',
      rating: 4.3,
      stock: 50,
      createdAt: '2023-01-20T10:15:00Z',
      updatedAt: '2023-01-20T10:15:00Z'
    },
    {
      id: 'prod4',
      name: 'Designer Dress',
      description: 'Elegant designer dress for special occasions',
      price: 199.99,
      images: [
        'https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
        'https://images.unsplash.com/photo-1623609163903-1d3b962d2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80'
      ],
      category: 'Fashion',
      vendorId: 'v3',
      vendorName: 'Fashion Couture',
      rating: 4.8,
      stock: 15,
      createdAt: '2023-02-01T11:45:00Z',
      updatedAt: '2023-02-01T11:45:00Z'
    },
    {
      id: 'prod5',
      name: 'Smart Watch',
      description: 'Feature-packed smartwatch with health tracking',
      price: 249.99,
      discountPrice: 199.99,
      images: [
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80'
      ],
      category: 'Electronics',
      vendorId: 'v1',
      vendorName: 'TechGadgets Inc.',
      rating: 4.6,
      stock: 30,
      createdAt: '2023-02-05T14:20:00Z',
      updatedAt: '2023-02-05T14:20:00Z'
    },
    {
      id: 'prod6',
      name: 'Premium Coffee Maker',
      description: 'Professional-grade coffee maker for home use',
      price: 179.99,
      images: [
        'https://images.unsplash.com/photo-1606741965429-02919c1f9f14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
        'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80'
      ],
      category: 'Home & Garden',
      vendorId: 'v4',
      vendorName: 'Home Essentials',
      rating: 4.4,
      stock: 20,
      createdAt: '2023-02-10T16:00:00Z',
      updatedAt: '2023-02-10T16:00:00Z'
    },
    {
      id: 'prod7',
      name: 'Skincare Set',
      description: 'Complete skincare regimen with natural ingredients',
      price: 89.99,
      discountPrice: 69.99,
      images: [
        'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
      ],
      category: 'Beauty & Health',
      vendorId: 'v5',
      vendorName: 'Natural Beauty',
      rating: 4.9,
      stock: 35,
      createdAt: '2023-02-15T09:10:00Z',
      updatedAt: '2023-02-15T09:10:00Z'
    },
    {
      id: 'prod8',
      name: 'Yoga Mat',
      description: 'Professional non-slip yoga mat for all yoga styles',
      price: 49.99,
      images: [
        'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
      ],
      category: 'Sports & Outdoors',
      vendorId: 'v6',
      vendorName: 'FitLife',
      rating: 4.2,
      stock: 40,
      createdAt: '2023-02-20T10:30:00Z',
      updatedAt: '2023-02-20T10:30:00Z'
    },
    {
      id: 'prod9',
      name: 'Bestselling Novel',
      description: 'Award-winning fiction novel by acclaimed author',
      price: 24.99,
      discountPrice: 19.99,
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1198&q=80'
      ],
      category: 'Books & Media',
      vendorId: 'v7',
      vendorName: 'Book Haven',
      rating: 4.7,
      stock: 60,
      createdAt: '2023-02-25T13:45:00Z',
      updatedAt: '2023-02-25T13:45:00Z'
    },
    {
      id: 'prod10',
      name: 'Men\'s Leather Wallet',
      description: 'Handcrafted genuine leather wallet with multiple compartments',
      price: 59.99,
      images: [
        'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1641431953118-cb1280080de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80'
      ],
      category: 'Fashion',
      vendorId: 'v3',
      vendorName: 'Fashion Couture',
      rating: 4.5,
      stock: 45,
      createdAt: '2023-03-01T15:20:00Z',
      updatedAt: '2023-03-01T15:20:00Z'
    },
    {
      id: 'prod11',
      name: 'Wireless Keyboard and Mouse',
      description: 'Ergonomic wireless keyboard and mouse combo for productivity',
      price: 79.99,
      discountPrice: 69.99,
      images: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80'
      ],
      category: 'Electronics',
      vendorId: 'v1',
      vendorName: 'TechGadgets Inc.',
      rating: 4.3,
      stock: 25,
      createdAt: '2023-03-05T09:00:00Z',
      updatedAt: '2023-03-05T09:00:00Z'
    },
    {
      id: 'prod12',
      name: 'Indoor Plant Set',
      description: 'Collection of 3 low-maintenance indoor plants with decorative pots',
      price: 69.99,
      images: [
        'https://images.unsplash.com/photo-1545165375-7c5f3a5cf057?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=474&q=80',
        'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=449&q=80'
      ],
      category: 'Home & Garden',
      vendorId: 'v4',
      vendorName: 'Home Essentials',
      rating: 4.6,
      stock: 30,
      createdAt: '2023-03-10T11:30:00Z',
      updatedAt: '2023-03-10T11:30:00Z'
    }
  ];
  
  // Mock Orders for vendor
  export const vendorOrders: Order[] = [
    {
      id: 'ord1',
      customerId: 'c1',
      customerName: 'John Smith',
      items: [
        {
          id: 'item1',
          productId: 'prod1',
          productName: 'Smartphone X',
          productImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80',
          quantity: 1,
          price: 799.99,
          vendorId: 'v1',
          vendorName: 'TechGadgets Inc.'
        }
      ],
      totalAmount: 799.99,
      status: 'delivered',
      shippingAddress: {
        address: '123 Main St',
        city: 'Boston',
        state: 'MA',
        zipCode: '02108',
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      createdAt: '2023-04-05T14:30:00Z',
      updatedAt: '2023-04-07T10:15:00Z'
    },
    {
      id: 'ord2',
      customerId: 'c2',
      customerName: 'Emily Johnson',
      items: [
        {
          id: 'item2',
          productId: 'prod2',
          productName: 'Laptop Pro',
          productImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
          quantity: 1,
          price: 1299.99,
          vendorId: 'v1',
          vendorName: 'TechGadgets Inc.'
        }
      ],
      totalAmount: 1299.99,
      status: 'shipped',
      shippingAddress: {
        address: '456 Park Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10022',
        country: 'USA'
      },
      paymentMethod: 'PayPal',
      createdAt: '2023-04-10T09:45:00Z',
      updatedAt: '2023-04-11T16:20:00Z'
    },
    {
      id: 'ord3',
      customerId: 'c3',
      customerName: 'Michael Davis',
      items: [
        {
          id: 'item3',
          productId: 'prod5',
          productName: 'Smart Watch',
          productImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80',
          quantity: 2,
          price: 199.99,
          vendorId: 'v1',
          vendorName: 'TechGadgets Inc.'
        },
        {
          id: 'item4',
          productId: 'prod11',
          productName: 'Wireless Keyboard and Mouse',
          productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80',
          quantity: 1,
          price: 69.99,
          vendorId: 'v1',
          vendorName: 'TechGadgets Inc.'
        }
      ],
      totalAmount: 469.97,
      status: 'pending',
      shippingAddress: {
        address: '789 Oak St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      createdAt: '2023-04-15T13:10:00Z',
      updatedAt: '2023-04-15T13:10:00Z'
    }
  ];
  
  // Mock Orders for customer
  export const customerOrders: Order[] = [
    {
      id: 'ord4',
      customerId: 'c456',
      customerName: 'Customer User',
      items: [
        {
          id: 'item5',
          productId: 'prod3',
          productName: 'Wireless Earbuds',
          productImage: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80',
          quantity: 1,
          price: 129.99,
          vendorId: 'v2',
          vendorName: 'AudioMasters'
        },
        {
          id: 'item6',
          productId: 'prod9',
          productName: 'Bestselling Novel',
          productImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
          quantity: 2,
          price: 19.99,
          vendorId: 'v7',
          vendorName: 'Book Haven'
        }
      ],
      totalAmount: 169.97,
      status: 'delivered',
      shippingAddress: {
        address: '101 Pine St',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      createdAt: '2023-03-20T11:25:00Z',
      updatedAt: '2023-03-23T14:40:00Z'
    },
    {
      id: 'ord5',
      customerId: 'c456',
      customerName: 'Customer User',
      items: [
        {
          id: 'item7',
          productId: 'prod7',
          productName: 'Skincare Set',
          productImage: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
          quantity: 1,
          price: 69.99,
          vendorId: 'v5',
          vendorName: 'Natural Beauty'
        }
      ],
      totalAmount: 69.99,
      status: 'processing',
      shippingAddress: {
        address: '101 Pine St',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA'
      },
      paymentMethod: 'PayPal',
      createdAt: '2023-04-18T10:05:00Z',
      updatedAt: '2023-04-19T09:30:00Z'
    }
  ];
  
  // Functions to simulate API calls
  
  // Get all products with optional filtering
  export const getProducts = (filters?: {
    category?: string;
    vendorId?: string;
    priceMin?: number;
    priceMax?: number;
    inStock?: boolean;
    search?: string;
  }) => {
    let filteredProducts = [...products];
    
    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }
      
      if (filters.vendorId) {
        filteredProducts = filteredProducts.filter(product => 
          product.vendorId === filters.vendorId
        );
      }
      
      if (filters.priceMin !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          (product.discountPrice || product.price) >= filters.priceMin!
        );
      }
      
      if (filters.priceMax !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          (product.discountPrice || product.price) <= filters.priceMax!
        );
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          filters.inStock ? product.stock > 0 : true
        );
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm)
        );
      }
    }
    
    return new Promise<Product[]>(resolve => {
      setTimeout(() => resolve(filteredProducts), 500);
    });
  };
  
  // Get product by ID
  export const getProductById = (productId: string) => {
    const product = products.find(prod => prod.id === productId);
    
    return new Promise<Product | undefined>(resolve => {
      setTimeout(() => resolve(product), 300);
    });
  };
  
  // Get all categories
  export const getCategories = () => {
    return new Promise<Category[]>(resolve => {
      setTimeout(() => resolve(categories), 300);
    });
  };
  
  // Get category by ID
  export const getCategoryById = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    
    return new Promise<Category | undefined>(resolve => {
      setTimeout(() => resolve(category), 200);
    });
  };
  
  // Get orders for vendor
  export const getVendorOrders = (vendorId: string) => {
    // This would filter by vendorId in a real app
    // For demo, we're returning all vendor orders
    
    return new Promise<Order[]>(resolve => {
      setTimeout(() => resolve(vendorOrders), 600);
    });
  };
  
  // Get orders for customer
  export const getCustomerOrders = (customerId: string) => {
    // This would filter by customerId in a real app
    // For demo, we're returning all customer orders
    
    return new Promise<Order[]>(resolve => {
      setTimeout(() => resolve(customerOrders), 600);
    });
  };
  
  // Update order status (for vendors)
  export const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const orderIndex = vendorOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      vendorOrders[orderIndex].status = status;
      vendorOrders[orderIndex].updatedAt = new Date().toISOString();
    }
    
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(orderIndex !== -1), 400);
    });
  };
  
  // Create a new product (for vendors)
  export const createProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod${products.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    
    return new Promise<Product>(resolve => {
      setTimeout(() => resolve(newProduct), 800);
    });
  };
  
  // Update a product (for vendors)
  export const updateProduct = (productId: string, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const productIndex = products.findIndex(product => product.id === productId);
    
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
    }
    
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(productIndex !== -1), 600);
    });
  };
  
  // Delete a product (for vendors)
  export const deleteProduct = (productId: string) => {
    const initialLength = products.length;
    const filteredProducts = products.filter(product => product.id !== productId);
    products.length = 0;
    products.push(...filteredProducts);
    
    return new Promise<boolean>(resolve => {
      setTimeout(() => resolve(initialLength > products.length), 500);
    });
  };
  
  // Create an order (for checkout process)
  export const createOrder = (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...order,
      id: `ord${vendorOrders.length + customerOrders.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    customerOrders.push(newOrder);
    
    return new Promise<Order>(resolve => {
      setTimeout(() => resolve(newOrder), 1000);
    });
  };
  