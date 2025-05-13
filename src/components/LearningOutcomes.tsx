import React from 'react';

const LearningOutcomes = () => {
  return (
    <section className="ai-section bg-background">
      <div className="ai-container">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="ai-section-title text-3xl md:text-4xl mb-6">📌 Ką vaikas išmoksta?</h2>
          <p className="ai-section-subtitle text-lg">Praktiniai įgūdžiai ir žinios, kuriuos įgis jūsų vaikas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ai-card flex">
            <div className="text-2xl mr-4">🔍</div>
            <div>
              <h3 className="ai-card-title font-bold text-lg mb-2">Promptų inžinerija</h3>
              <p className="ai-card-desc">Praktikuoja kaip tiksliai formuluoti užklausas dirbtiniam intelektui, kad gautų geriausius rezultatus</p>
            </div>
          </div>
          
          <div className="ai-card flex">
            <div className="text-2xl mr-4">🤖</div>
            <div>
              <h3 className="ai-card-title font-bold text-lg mb-2">ChatGPT asmenybė</h3>
              <p className="ai-card-desc">Kuria savo individualų padėjėją mokslams ar kūrybai, pritaikytą specifiniams poreikiams</p>
            </div>
          </div>
          
          <div className="ai-card flex">
            <div className="text-2xl mr-4">📊</div>
            <div>
              <h3 className="ai-card-title font-bold text-lg mb-2">Google Gemini</h3>
              <p className="ai-card-desc">Naudoja Gemini kartu su Google Apps – rašymui, užrašams, pristatymams</p>
            </div>
          </div>
          
          <div className="ai-card flex">
            <div className="text-2xl mr-4">🌐</div>
            <div>
              <h3 className="ai-card-title font-bold text-lg mb-2">AI svetainė</h3>
              <p className="ai-card-desc">Kuria savo AI svetainę – asmeninei temai ar mokymosi projektui</p>
            </div>
          </div>
          
          <div className="ai-card flex md:col-span-2">
            <div className="text-2xl mr-4">🎯</div>
            <div>
              <h3 className="ai-card-title font-bold text-lg mb-2">Finalinis rezultatas</h3>
              <p className="ai-card-desc">Pristatymas su Gamma: savo darbo ir įgūdžių prezentacija, demonstruojanti įgytas kompetencijas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
