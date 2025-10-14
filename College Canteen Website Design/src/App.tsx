import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FoodGrid } from "./components/FoodGrid";
import { AdminPanel } from "./components/AdminPanel";
import { LoginPage } from "./components/LoginPage";
import { FoodItem } from "./components/FoodCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { LogOut } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

type ViewState = "user" | "login" | "admin";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("user");
  
  const [menuItems, setMenuItems] = useState<FoodItem[]>([
    {
      id: 1,
      name: "Hyderabadi Biryani",
      price: 150,
      image: "https://images.unsplash.com/photo-1752673508949-f4aeeaef75f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzYwNDQ1OTQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Rice & Biryani",
      isVeg: false,
      isSpicy: true,
      isChefSpecial: true,
    },
    {
      id: 2,
      name: "Chicken Shawarma",
      price: 120,
      image: "https://images.unsplash.com/photo-1621628017636-d1c2009fc27c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGF3YXJtYSUyMHdyYXB8ZW58MXx8fHwxNzYwMzc0NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Wraps & Rolls",
      isVeg: false,
      isSpicy: false,
      isChefSpecial: false,
    },
    {
      id: 3,
      name: "Margherita Pizza",
      price: 180,
      image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc2MDM5NzY3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Pizza",
      isVeg: true,
      isSpicy: false,
      isChefSpecial: false,
    },
    {
      id: 4,
      name: "Classic Burger",
      price: 100,
      image: "https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2MDM4MzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Burgers",
      isVeg: false,
      isSpicy: false,
      isChefSpecial: false,
    },
    {
      id: 5,
      name: "Spring Rolls",
      price: 80,
      image: "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xsc3xlbnwxfHx8fDE3NjA0NTU2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Wraps & Rolls",
      isVeg: true,
      isSpicy: false,
      isChefSpecial: false,
    },
    {
      id: 6,
      name: "Hakka Noodles",
      price: 90,
      image: "https://images.unsplash.com/photo-1536540166989-ad5334cee5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub29kbGVzJTIwYXNpYW58ZW58MXx8fHwxNzYwMzc3NDAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Noodles",
      isVeg: true,
      isSpicy: true,
      isChefSpecial: false,
    },
    {
      id: 7,
      name: "Steamed Momos",
      price: 70,
      image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb21vcyUyMGR1bXBsaW5nc3xlbnwxfHx8fDE3NjA0NTUzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Snacks",
      isVeg: true,
      isSpicy: false,
      isChefSpecial: true,
    },
    {
      id: 8,
      name: "Caesar Salad",
      price: 110,
      image: "https://images.unsplash.com/photo-1677653805080-59c57727c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkfGVufDF8fHx8MTc2MDM0OTY2MXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Salads",
      isVeg: true,
      isSpicy: false,
      isChefSpecial: false,
    },
    {
      id: 9,
      name: "Chocolate Ice Cream",
      price: 60,
      image: "https://images.unsplash.com/photo-1663904458920-f153c162fa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYwNDA2NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Desserts",
      isVeg: true,
      isSpicy: false,
      isChefSpecial: false,
    },
    {
      id: 10,
      name: "Aloo Paratha",
      price: 50,
      image: "https://images.unsplash.com/photo-1759302307381-bdccf7b35e5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJhdGhhJTIwZmxhdGJyZWFkfGVufDF8fHx8MTc2MDQ1NTYzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Breads",
      isVeg: true,
      isSpicy: false,
      isChefSpecial: false,
    },
    {
      id: 11,
      name: "Penne Pasta",
      price: 130,
      image: "https://images.unsplash.com/photo-1747852628136-e612ace24a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW58ZW58MXx8fHwxNzYwNDU1NjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Main Course",
      isVeg: true,
      isSpicy: false,
      isChefSpecial: false,
    },
    {
      id: 12,
      name: "Crispy Samosa",
      price: 30,
      image: "https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBzbmFja3xlbnwxfHx8fDE3NjAzNjM2MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Snacks",
      isVeg: true,
      isSpicy: true,
      isChefSpecial: false,
    },
  ]);

  const categories = [
    { label: "All", value: "all" },
    { label: "Rice & Biryani", value: "Rice & Biryani" },
    { label: "Pizza", value: "Pizza" },
    { label: "Burgers", value: "Burgers" },
    { label: "Wraps & Rolls", value: "Wraps & Rolls" },
    { label: "Noodles", value: "Noodles" },
    { label: "Snacks", value: "Snacks" },
    { label: "Salads", value: "Salads" },
    { label: "Desserts", value: "Desserts" },
    { label: "Breads", value: "Breads" },
    { label: "Main Course", value: "Main Course" },
  ];

  const handleAddItem = (item: Omit<FoodItem, "id">) => {
    const newId = Math.max(...menuItems.map(i => i.id), 0) + 1;
    setMenuItems([...menuItems, { ...item, id: newId }]);
  };

  const handleUpdateItem = (id: number, updates: Partial<FoodItem>) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (item: FoodItem) => {
    toast.success(`${item.name} added to cart!`);
  };

  const handleLogin = () => {
    setCurrentView("admin");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setCurrentView("user");
  };

  // Login Page View
  if (currentView === "login") {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onBackToHome={() => setCurrentView("user")}
        />
        <Toaster position="bottom-right" />
      </>
    );
  }

  // Admin Dashboard View
  if (currentView === "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          {/* Admin Header */}
          <div className="mb-6 flex items-center justify-between rounded-lg bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white shadow-lg">
            <div>
              <h2>Admin Dashboard</h2>
              <p className="text-sm text-white/90">Manage your canteen menu</p>
            </div>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <AdminPanel
            menuItems={menuItems}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        </main>

        <Toaster position="bottom-right" />
      </div>
    );
  }

  // User Homepage View (Default)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-8 text-white shadow-lg">
          <div className="mx-auto max-w-3xl text-center">
            <h2>Welcome to TASTIGO!</h2>
            <p className="mt-2 text-white/90">
              Your favorite college canteen serving delicious meals daily. Fresh, affordable, and made with love! 🍔🍕🍜
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur">
                <p className="text-sm text-white/80">Today's Special</p>
                <p>Hyderabadi Biryani</p>
              </div>
              <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur">
                <p className="text-sm text-white/80">Timings</p>
                <p>8:00 AM - 8:00 PM</p>
              </div>
              <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur">
                <p className="text-sm text-white/80">Total Items</p>
                <p>{menuItems.length} Dishes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2>Our Menu</h2>
          </div>
          
          <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="rounded-full border-2 border-gray-200 bg-white px-4 py-2 data-[state=active]:border-orange-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <FoodGrid items={menuItems} onAddToCart={handleAddToCart} />
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category.value} value={category.value} className="mt-6">
              <FoodGrid
                items={menuItems.filter(item => item.category === category.value)}
                onAddToCart={handleAddToCart}
              />
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer onAdminClick={() => setCurrentView("login")} />

      <Toaster position="bottom-right" />
    </div>
  );
}
