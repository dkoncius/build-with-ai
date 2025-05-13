import React from 'react';
import { Brain } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-28 lg:pb-28 bg-background">
      <div className="ai-container relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 sm:h-10 sm:w-10 ai-icon text-primary animate-brain-pulse mr-3" />
              <div className="text-primary text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20">
                9–13 m. moksleiviams
              </div>
            </div>
            
            <h1 className="ai-section-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              🧠 Build with AI: <span className="text-primary">Mokymai, kurie padeda mokytis</span>
            </h1>
            
            <p className="ai-section-subtitle text-lg sm:text-xl mb-6 sm:mb-8 font-medium leading-relaxed">
              🎯 Vaikas ne tik naudoja DI – jis išmoksta kurti, integruoti ir pristatyti savo idėjas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#register" className="ai-button-primary text-center text-sm sm:text-base py-2.5 sm:py-3">
                Registruotis į kursą
              </a>
              <a href="#program" className="ai-button-secondary text-center text-sm sm:text-base py-2.5 sm:py-3">
                Programos detalės
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-8 sm:mt-12 md:mt-0 relative">
            <div className="relative w-full h-[240px] sm:h-96 md:h-[500px]">
              <div className="absolute top-0 left-0 w-full h-full ai-gradient-bg rounded-2xl sm:rounded-3xl opacity-30 dark:opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-6">
                <div className="grid grid-cols-2 gap-2 sm:gap-6 w-full">
                  <div className="ai-card animate-float delay-100">
                    <div className="text-xl sm:text-3xl mb-1 sm:mb-2">💻</div>
                    <h3 className="ai-card-title font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">ChatGPT</h3>
                    <p className="ai-card-desc text-[10px] sm:text-sm leading-tight sm:leading-normal">Promptų inžinerija ir DI asmenybės</p>
                  </div>
                  <div className="ai-card animate-float delay-200">
                    <div className="text-xl sm:text-3xl mb-1 sm:mb-2">🎨</div>
                    <h3 className="ai-card-title font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Google Gemini</h3>
                    <p className="ai-card-desc text-[10px] sm:text-sm leading-tight sm:leading-normal">Integracijos su Google Apps</p>
                  </div>
                  <div className="ai-card animate-float delay-300">
                    <div className="text-xl sm:text-3xl mb-1 sm:mb-2">🚀</div>
                    <h3 className="ai-card-title font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Svetainės</h3>
                    <p className="ai-card-desc text-[10px] sm:text-sm leading-tight sm:leading-normal">AI svetainės kūrimas</p>
                  </div>
                  <div className="ai-card animate-float delay-400">
                    <div className="text-xl sm:text-3xl mb-1 sm:mb-2">🎓</div>
                    <h3 className="ai-card-title font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Prezentacijos</h3>
                    <p className="ai-card-desc text-[10px] sm:text-sm leading-tight sm:leading-normal">Pristatymai su Gamma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-primary rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-accent rounded-full opacity-10 blur-3xl"></div>
    </section>
  );
};

export default Hero;
