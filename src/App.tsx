import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileLayout } from "./components/MobileLayout";
import Index from "./pages/Index";
import Itineraries from "./pages/Itineraries";
import Picks from "./pages/Picks";
import Explore from "./pages/Explore";
import Toolkit from "./pages/Toolkit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MobileLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/picks" element={<Picks />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/toolkit" element={<Toolkit />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
