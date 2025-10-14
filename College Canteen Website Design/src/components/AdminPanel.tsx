import { useState } from "react";
import { Plus, Edit2, Trash2, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { FoodItem } from "./FoodCard";
import { toast } from "sonner@2.0.3";

interface AdminPanelProps {
  menuItems: FoodItem[];
  onAddItem: (item: Omit<FoodItem, "id">) => void;
  onUpdateItem: (id: number, item: Partial<FoodItem>) => void;
  onDeleteItem: (id: number) => void;
}

export function AdminPanel({ menuItems, onAddItem, onUpdateItem, onDeleteItem }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "Main Course",
    isVeg: true,
    isSpicy: false,
    isChefSpecial: false,
  });

  const categories = [
    "Main Course",
    "Rice & Biryani",
    "Wraps & Rolls",
    "Pizza",
    "Burgers",
    "Noodles",
    "Snacks",
    "Salads",
    "Desserts",
    "Breads",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const itemData = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      category: formData.category,
      isVeg: formData.isVeg,
      isSpicy: formData.isSpicy,
      isChefSpecial: formData.isChefSpecial,
    };

    if (editingItem) {
      onUpdateItem(editingItem.id, itemData);
      toast.success("Menu item updated successfully!");
    } else {
      onAddItem(itemData);
      toast.success("Menu item added successfully!");
    }

    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      category: "Main Course",
      isVeg: true,
      isSpicy: false,
      isChefSpecial: false,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: FoodItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      image: item.image,
      category: item.category,
      isVeg: item.isVeg,
      isSpicy: item.isSpicy,
      isChefSpecial: item.isChefSpecial,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDeleteItem(id);
      toast.success("Menu item deleted successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-orange-600" />
          <h2>Admin Panel</h2>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Plus className="h-4 w-4" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Chicken Biryani"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., 120"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">Leave empty for default food image</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isVeg">Vegetarian</Label>
                  <Switch
                    id="isVeg"
                    checked={formData.isVeg}
                    onCheckedChange={(checked) => setFormData({ ...formData, isVeg: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isSpicy">Spicy</Label>
                  <Switch
                    id="isSpicy"
                    checked={formData.isSpicy}
                    onCheckedChange={(checked) => setFormData({ ...formData, isSpicy: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isChefSpecial">Chef's Special</Label>
                  <Switch
                    id="isChefSpecial"
                    checked={formData.isChefSpecial}
                    onCheckedChange={(checked) => setFormData({ ...formData, isChefSpecial: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setIsOpen(false); resetForm(); }}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menu Items Management */}
      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">
                    <span className={item.isVeg ? "text-green-600" : "text-red-600"}>
                      {item.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
