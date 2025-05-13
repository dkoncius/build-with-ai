import React from 'react';

const Registration = () => {
  return (
    <section id="register" className="ai-section ai-gradient-bg">
      <div className="ai-container">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="ai-section-title text-3xl md:text-4xl mb-6">📩 Registracija</h2>
          <p className="ai-section-subtitle text-xl mb-8">
            <strong>Grupė ribota – iki 20 vaikų.</strong>
          </p>
          <div className="ai-card mb-8">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="ai-card-title text-2xl font-bold mb-4">Pradėkite kelionę į AI pasaulį jau dabar!</h3>
            <p className="ai-card-desc mb-6">
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
          <p className="ai-card-desc">
            Turite klausimų? Susisiekite el. paštu <a href="mailto:as.koncius@gmail.com" className="text-primary underline">as.koncius@gmail.com</a> arba telefonu <a href="tel:+37064300602" className="text-primary underline">+370 643 00602</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;
