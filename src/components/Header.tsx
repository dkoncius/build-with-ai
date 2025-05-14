import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrainIcon from './BrainIcon';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ThemeToggle from './ThemeToggle';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const menuItems = [
    { href: "#about", label: "Apie kursą" },
    { href: "#program", label: "Programa" },
    { href: "#instructor", label: "Dėstytojas" },
    { href: "#register", label: "Registruotis", isButton: true }
  ];

  // Function to navigate to home and scroll to top
  const goToHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background border-b border-border sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {isHomePage ? (
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <div className="flex items-center">
                <BrainIcon className="h-8 w-8 text-primary mr-2" />
                <span className="font-heading font-bold text-xl text-foreground">Build with AI</span>
              </div>
            </Link>
          ) : (
            <div 
              className="flex items-center cursor-pointer" 
              onClick={goToHome}
            >
              <BrainIcon className="h-8 w-8 text-primary mr-2" />
              <span className="font-heading font-bold text-xl text-foreground">Build with AI</span>
            </div>
          )}
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            isHomePage ? (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${
                  item.isButton
                    ? "ai-button-primary"
                    : "text-foreground hover:text-primary transition-colors"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <div
                key={item.href}
                onClick={goToHome}
                className={`text-sm font-medium cursor-pointer ${
                  item.isButton
                    ? "ai-button-primary"
                    : "text-foreground hover:text-primary transition-colors"
                }`}
              >
                {item.label}
              </div>
            )
          ))}
          <ThemeToggle />
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <button className="p-2 hover:bg-muted rounded-md transition-colors">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Atidaryti meniu</span>
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isHomePage ? (
                      <Link to="/" onClick={() => {
                        setIsOpen(false);
                        window.scrollTo(0, 0);
                      }}>
                        <div className="flex items-center">
                          <BrainIcon className="h-8 w-8 text-primary mr-2" />
                          <span className="font-heading font-bold text-xl text-foreground">Build with AI</span>
                        </div>
                      </Link>
                    ) : (
                      <div 
                        className="flex items-center cursor-pointer" 
                        onClick={() => {
                          setIsOpen(false);
                          goToHome();
                        }}
                      >
                        <BrainIcon className="h-8 w-8 text-primary mr-2" />
                        <span className="font-heading font-bold text-xl text-foreground">Build with AI</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    <X className="h-6 w-6 text-foreground" />
                    <span className="sr-only">Uždaryti meniu</span>
                  </button>
                </div>
              </DrawerHeader>
              <nav className="flex flex-col p-4 space-y-4">
                {menuItems.map((item) => (
                  isHomePage ? (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-medium ${
                        item.isButton
                          ? "ai-button-primary w-full text-center"
                          : "text-foreground hover:text-primary transition-colors"
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <div
                      key={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        goToHome();
                      }}
                      className={`text-base font-medium cursor-pointer ${
                        item.isButton
                          ? "ai-button-primary w-full text-center"
                          : "text-foreground hover:text-primary transition-colors"
                      }`}
                    >
                      {item.label}
                    </div>
                  )
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
