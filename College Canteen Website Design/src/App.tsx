import { useState, useEffect } from "react";
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

  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (!response.ok) throw new Error("Failed to fetch menu");

        const data: FoodItem[] = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);
  
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

  const handleAddItem = async (item: Omit<FoodItem, "id">) => {
    const newId = Math.max(...menuItems.map((i) => i.id), 0) + 1;
      try {
        const response = await fetch("http://localhost:5000/api/menu/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: newId, ...item }),
        });

        const data = await response.json();

        if (response.ok) {
          setMenuItems([...menuItems, { ...item, id: newId }]);
        } else {
          alert(`❌ ${data.error || "Invalid credentials"}`);
        }
      } catch (error) {
        alert("⚠️ Network error. Please try again.");
        console.error(error);
      }
  };

  const handleUpdateItem = async (id: number, updates: Partial<FoodItem>) => {
      try {
        const response = await fetch(`http://localhost:5000/api/menu/update/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id, ...updates }),
        });

        const data = await response.json();

        if (response.ok) {
          setMenuItems(
            menuItems.map((item) =>
              item.id === id ? { ...item, ...updates } : item
            )
          );
        } else {
          alert(`❌ ${data.error || "Invalid"}`);
        }
      } catch (error) {
        alert("⚠️ Network error. Please try again.");
        console.error(error);
      }
  };

  const handleDeleteItem = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:5000/api/menu/delete/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();

        if (response.ok) {
          setMenuItems(menuItems.filter((item) => item.id !== id));
        } else {
          alert(`❌ ${data.error || "Invalid"}`);
        }
      } catch (error) {
        alert("⚠️ Network error. Please try again.");
        console.error(error);
      }
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
              Your favorite college canteen serving delicious meals daily.
              Fresh, affordable, and made with love! 🍔🍕🍜
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
            <TabsContent
              key={category.value}
              value={category.value}
              className="mt-6"
            >
              <FoodGrid
                items={menuItems.filter(
                  (item) => item.category === category.value
                )}
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
