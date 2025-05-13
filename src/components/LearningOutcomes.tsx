
import React from 'react';

const LearningOutcomes = () => {
  return (
    <section className="ai-section">
      <div className="ai-container">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">📌 Ką vaikas išmoksta?</h2>
          <p className="text-lg text-gray-700">Praktiniai įgūdžiai ir žinios, kuriuos įgis jūsų vaikas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ai-card flex">
            <div className="text-2xl mr-4">🔍</div>
            <div>
              <h3 className="font-bold text-lg mb-2">Promptų inžinerija</h3>
              <p className="text-gray-700">Praktikuoja kaip tiksliai formuluoti užklausas dirbtiniam intelektui, kad gautų geriausius rezultatus</p>
            </div>
          </div>
          
          <div className="ai-card flex">
            <div className="text-2xl mr-4">🤖</div>
            <div>
              <h3 className="font-bold text-lg mb-2">ChatGPT asmenybė</h3>
              <p className="text-gray-700">Kuria savo individualų padėjėją mokslams ar kūrybai, pritaikytą specifiniams poreikiams</p>
            </div>
          </div>
          
          <div className="ai-card flex">
            <div className="text-2xl mr-4">📊</div>
            <div>
              <h3 className="font-bold text-lg mb-2">Google Gemini</h3>
              <p className="text-gray-700">Naudoja Gemini kartu su Google Apps – rašymui, užrašams, pristatymams</p>
            </div>
          </div>
          
          <div className="ai-card flex">
            <div className="text-2xl mr-4">🌐</div>
            <div>
              <h3 className="font-bold text-lg mb-2">AI svetainė</h3>
              <p className="text-gray-700">Kuria savo AI svetainę – asmeninei temai ar mokymosi projektui</p>
            </div>
          </div>
          
          <div className="ai-card flex md:col-span-2">
            <div className="text-2xl mr-4">🎯</div>
            <div>
              <h3 className="font-bold text-lg mb-2">Finalinis rezultatas</h3>
              <p className="text-gray-700">Pristatymas su Gamma: savo darbo ir įgūdžių prezentacija, demonstruojanti įgytas kompetencijas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
