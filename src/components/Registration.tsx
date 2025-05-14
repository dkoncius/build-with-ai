import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkAndStoreReferralCode } from '@/lib/referralUtils';

const Registration = () => {
  const [referral, setReferral] = useState('');

  useEffect(() => {
    // Užtikrina, kad kodas bus paimtas iš URL arba sessionStorage
    const refCode = checkAndStoreReferralCode();
    if (refCode) setReferral(refCode);
  }, []);

  const registrationLink = referral ? `/registracija?ref=${referral}` : '/registracija';

  return (
    <section id="register" className="ai-section ai-gradient-bg">
      <div className="ai-container">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="ai-section-title text-3xl md:text-4xl mb-6">📩 Registracija</h2>
          <p className="ai-section-subtitle text-xl mb-8">
            <strong>Grupė ribota – iki 20 vaikų.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="ai-card mb-8">
              <div className="text-5xl mb-4">🗓️</div>
              <h3 className="ai-card-title text-2xl font-bold mb-4">Nauja grupė startuoja nuo birželio!</h3>
              <p className="ai-card-desc font-semibold mb-3">
                Pirmadieniais ir trečiadieniais, 18:00-21:00 val.
              </p>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Laisvos vietos</span>
                  <span className="font-semibold">10/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                  <div className="bg-primary h-4 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <p className="text-sm mt-1 text-center font-medium">Paskubėkite registruotis!</p>
              </div>
            </div>
            
            <div className="ai-card mb-8">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="ai-card-title text-2xl font-bold mb-4">Pradėkite kelionę į AI pasaulį jau dabar!</h3>
              <p className="ai-card-desc mb-6">
                Registruokitės užpildydami formą ir netrukus susisieksime su jumis dėl detalių.
              </p>
              <Link 
                to={registrationLink}
                className="ai-button-primary block w-full text-center text-lg py-4 mb-4"
              >
                👉 Registruotis čia
              </Link>
              <Link 
                to="/partneriai" 
                className="ai-button-secondary block w-full text-center text-lg py-4"
              >
                🤝 Tapk partneriu
              </Link>
            </div>
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
