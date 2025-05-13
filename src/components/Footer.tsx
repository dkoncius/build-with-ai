import React from 'react';
import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="ai-container">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-aipurple mr-2" />
              <span className="font-heading font-bold text-xl">Build with AI</span>
            </div>
            <p className="text-gray-400 mt-2">Mokymai, kurie padeda mokytis</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full md:w-auto">
            <div>
              <h3 className="font-bold mb-3">Navigacija</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">Apie kursą</a></li>
                <li><a href="#program" className="text-gray-400 hover:text-white transition-colors">Programa</a></li>
                <li><a href="#instructor" className="text-gray-400 hover:text-white transition-colors">Dėstytojas</a></li>
                <li><a href="#register" className="text-gray-400 hover:text-white transition-colors">Registracija</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Kontaktai</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:as.koncius@gmail.com" 
                    className="text-gray-400 hover:text-white transition-colors break-all"
                  >
                    as.koncius@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+37064300602" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +370 643 00602
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Sekite</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/deividas-koncius/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Build with AI. Visos teisės saugomos.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
