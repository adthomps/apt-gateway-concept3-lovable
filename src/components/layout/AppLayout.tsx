import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MainSidebar } from "./MainSidebar";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { SidebarProvider } from "@/components/ui/sidebar";

export function AppLayout() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <MainSidebar />
        
        <div className="flex-1 flex flex-col w-full">
          <TopNav onToggleAI={() => setIsAIOpen(!isAIOpen)} />
          
          <main className="flex-1 container mx-auto px-4 py-6">
            <Outlet />
          </main>
          
          <Footer />
        </div>

        <AIAssistant 
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
        />
      </div>
    </SidebarProvider>
  );
}
