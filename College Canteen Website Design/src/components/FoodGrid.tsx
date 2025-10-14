import { FoodCard, FoodItem } from "./FoodCard";

interface FoodGridProps {
  items: FoodItem[];
  onAddToCart?: (item: FoodItem) => void;
}

export function FoodGrid({ items, onAddToCart }: FoodGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No items found in this category</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
