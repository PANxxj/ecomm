
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '@/services/mockData';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <Card className="overflow-hidden transition-transform hover:scale-105 duration-200">
        <div className="relative">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <CardContent className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-bold mb-1">{category.name}</h3>
            <p className="text-sm text-white/80 line-clamp-2">{category.description}</p>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
