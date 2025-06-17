import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { SharkChat } from "./components/SharkChat";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#090e10" }}>
      <SharkChat />
    </div>
  );
}
