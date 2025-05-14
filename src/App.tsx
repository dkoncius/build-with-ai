import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Partners from "./pages/Partners";
import RegistrationForm from "./pages/RegistrationForm";
import Dashboard from "./pages/Dashboard";
import Refund from "./pages/Refund";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider 
    attribute="class" 
    defaultTheme="system" 
    enableSystem
    storageKey="build-with-ai-theme"
    disableTransitionOnChange
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/partneriai" element={<Partners />} />
            <Route path="/registracija" element={<RegistrationForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pinigu-grazinimas" element={<Refund />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
