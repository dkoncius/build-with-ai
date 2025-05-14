import React from 'react';
import { Brain } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Function to navigate to home and scroll to top
  const goToHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-background text-foreground py-8 sm:py-12 border-t border-border">
      <div className="ai-container">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            {isHomePage ? (
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <div className="flex items-center">
                  <Brain className="h-8 w-8 ai-icon text-primary mr-2" />
                  <span className="font-heading font-bold text-xl">Build with AI</span>
                </div>
              </Link>
            ) : (
              <div 
                className="flex items-center cursor-pointer"
                onClick={goToHome}
              >
                <Brain className="h-8 w-8 ai-icon text-primary mr-2" />
                <span className="font-heading font-bold text-xl">Build with AI</span>
              </div>
            )}
            <p className="ai-card-desc mt-2">Mokymai, kurie padeda mokytis</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full md:w-auto">
            <div>
              <h3 className="font-bold mb-3">Navigacija</h3>
              <ul className="space-y-2">
                {isHomePage ? (
                  <>
                    <li><a href="#about" className="ai-card-desc hover:text-primary transition-colors">Apie kursą</a></li>
                    <li><a href="#program" className="ai-card-desc hover:text-primary transition-colors">Programa</a></li>
                    <li><a href="#instructor" className="ai-card-desc hover:text-primary transition-colors">Dėstytojas</a></li>
                    <li><a href="#register" className="ai-card-desc hover:text-primary transition-colors">Registracija</a></li>
                  </>
                ) : (
                  <>
                    <li><div onClick={goToHome} className="ai-card-desc hover:text-primary transition-colors cursor-pointer">Apie kursą</div></li>
                    <li><div onClick={goToHome} className="ai-card-desc hover:text-primary transition-colors cursor-pointer">Programa</div></li>
                    <li><div onClick={goToHome} className="ai-card-desc hover:text-primary transition-colors cursor-pointer">Dėstytojas</div></li>
                    <li><div onClick={goToHome} className="ai-card-desc hover:text-primary transition-colors cursor-pointer">Registracija</div></li>
                  </>
                )}
                <li><Link to="/pinigu-grazinimas" className="ai-card-desc hover:text-primary transition-colors">Pinigų gražinimas</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Kontaktai</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:as.koncius@gmail.com" 
                    className="ai-card-desc hover:text-primary transition-colors break-all"
                  >
                    as.koncius@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+37064300602" 
                    className="ai-card-desc hover:text-primary transition-colors"
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
                    className="ai-card-desc hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center ai-card-desc text-sm">
          <p>&copy; {new Date().getFullYear()} Build with AI. Visos teisės saugomos. <Link to="/dashboard" className="hover:text-primary opacity-50 hover:opacity-100 transition-opacity"><Brain className="h-4 w-4 inline-block" /></Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
