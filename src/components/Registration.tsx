
import React from 'react';

const Registration = () => {
  return (
    <section id="register" className="ai-section bg-gradient-to-br from-aiblue-light/20 via-white to-aipurple-light/20">
      <div className="ai-container">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">📩 Registracija</h2>
          <p className="text-xl text-gray-700 mb-8">
            <strong>Grupė ribota – iki 20 vaikų.</strong>
          </p>
          
          <div className="ai-card mb-8">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">Pradėkite kelionę į DI pasaulį jau dabar!</h3>
            <p className="text-gray-700 mb-6">
              Registruokitės užpildydami formą ir netrukus susisieksime su jumis dėl detalių.
            </p>
            
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSfu_t7esMTA25fSE3sAmPvvFXhTKT6LqfWgE7oLXRcnA_shmw/viewform?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ai-button-primary block w-full text-center text-lg py-4"
            >
              👉 Registruotis čia
            </a>
          </div>
          
          <p className="text-gray-600">
            Turite klausimų? Susisiekite el. paštu <a href="mailto:as.koncius@gmail.com" className="text-aipurple underline">as.koncius@gmail.com</a> arba telefonu <a href="tel:+37064300602" className="text-aipurple underline">+370 643 00602</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;
