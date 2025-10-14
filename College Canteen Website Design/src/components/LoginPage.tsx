import { useState } from "react";
import { Utensils, Lock, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner@2.0.3";

interface LoginPageProps {
  onLogin: () => void;
  onBackToHome: () => void;
}

export function LoginPage({ onLogin, onBackToHome }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in production, this would call a real API
    setTimeout(() => {
      if (username === "admin" && password === "tastigo123") {
        toast.success("Login successful! Welcome back, Admin.");
        onLogin();
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
            <Utensils className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            TASTIGO Admin
          </h1>
          <p className="text-sm text-muted-foreground">College Canteen Management</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={onBackToHome}
              >
                Back to Homepage
              </Button>
            </form>

            {/* Demo credentials hint */}
            <div className="mt-4 rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">
                <strong>Demo Credentials:</strong>
                <br />
                Username: <code className="rounded bg-background px-1 py-0.5">admin</code>
                <br />
                Password: <code className="rounded bg-background px-1 py-0.5">tastigo123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
