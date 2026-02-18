import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileLayout } from "./components/MobileLayout";
import Index from "./pages/Index";
import Picks from "./pages/Picks";
import PickDetail from "./pages/PickDetail";
import Explore from "./pages/Explore";
import Toolkit from "./pages/Toolkit";
import Maps from "./pages/Maps";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "./i18n";

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
            <Route path="/picks" element={<Picks />} />
            <Route path="/picks/:id" element={<PickDetail />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
