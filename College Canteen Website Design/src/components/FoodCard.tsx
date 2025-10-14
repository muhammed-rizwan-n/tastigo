import { Star, Flame, Leaf } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isSpicy: boolean;
  isChefSpecial: boolean;
}

interface FoodCardProps {
  item: FoodItem;
  onAddToCart?: (item: FoodItem) => void;
}

export function FoodCard({ item, onAddToCart }: FoodCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Badges overlay */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {item.isVeg ? (
            <Badge className="h-6 gap-1 border-2 border-green-600 bg-white text-green-700 hover:bg-green-50">
              <Leaf className="h-3 w-3 fill-green-600" />
              Veg
            </Badge>
          ) : (
            <Badge className="h-6 gap-1 border-2 border-red-600 bg-white text-red-700 hover:bg-red-50">
              <div className="h-3 w-3 rounded-full border-2 border-red-600" />
              Non-Veg
            </Badge>
          )}
          {item.isSpicy && (
            <Badge className="h-6 gap-1 border-2 border-orange-600 bg-white text-orange-700 hover:bg-orange-50">
              <Flame className="h-3 w-3 fill-orange-600" />
              Spicy
            </Badge>
          )}
        </div>

        {item.isChefSpecial && (
          <div className="absolute right-2 top-2">
            <Badge className="h-6 gap-1 border-2 border-yellow-500 bg-white text-yellow-700 hover:bg-yellow-50">
              <Star className="h-3 w-3 fill-yellow-500" />
              Special
            </Badge>
          </div>
        )}

        {/* Price tag */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-end justify-between">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              ₹{item.price}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1">{item.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{item.category}</span>
        </div>
      </div>
    </Card>
  );
}
