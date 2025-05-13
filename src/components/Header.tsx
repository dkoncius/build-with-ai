import React, { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "#about", label: "Apie kursą" },
    { href: "#program", label: "Programa" },
    { href: "#instructor", label: "Dėstytojas" },
    { href: "#register", label: "Registruotis", isButton: true }
  ];

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Brain className="h-8 w-8 text-aipurple mr-2" />
          <span className="font-heading font-bold text-xl text-aiblue-dark">Build with AI</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium ${
                item.isButton
                  ? "ai-button-primary"
                  : "text-gray-700 hover:text-aipurple transition-colors"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <Menu className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Atidaryti meniu</span>
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-8 w-8 text-aipurple mr-2" />
                    <span className="font-heading font-bold text-xl text-aiblue-dark">Build with AI</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-700" />
                    <span className="sr-only">Uždaryti meniu</span>
                  </button>
                </div>
              </DrawerHeader>
              <nav className="flex flex-col p-4 space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium ${
                      item.isButton
                        ? "ai-button-primary w-full text-center"
                        : "text-gray-700 hover:text-aipurple transition-colors"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
