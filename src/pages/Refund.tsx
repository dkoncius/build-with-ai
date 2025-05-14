import React from 'react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Refund = () => {
  return (
    <>
      <Header />
      <div className="ai-container py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Grąžinimo politika</h1>
          
          <Card className="p-6 mb-10">
            <h2 className="text-2xl font-bold mb-6">Mokėjimų ir grąžinimų sąlygos</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Mokėjimas</h3>
                <p className="mb-4">
                  Mokėjimas už kursą atliekamas visa suma iš karto registracijos metu. 
                  Tai užtikrina jūsų vietą kursuose ir leidžia mums tinkamai pasiruošti užsiėmimams.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Grąžinimo sąlygos</h3>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">Likus daugiau nei 10 dienų iki kursų pradžios:</p>
                  <p>Grąžinama 100% sumokėtos sumos.</p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">Likus mažiau nei 10 dienų iki kursų pradžios:</p>
                  <p>Grąžinama iki 50% sumokėtos sumos.</p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-2">Prasidėjus kursams:</p>
                  <p>Pinigai negrąžinami.</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Kaip pateikti prašymą</h3>
                <p className="mb-2">
                  Prašymą dėl mokėjimo grąžinimo galite pateikti el. paštu 
                  <a href="mailto:as.koncius@gmail.com" className="text-primary mx-1">as.koncius@gmail.com</a>
                  arba telefonu
                  <a href="tel:+37064300602" className="text-primary mx-1">+370 643 00602</a>.
                </p>
                <p>
                  Prašyme nurodykite registracijos duomenis ir mokėjimo informaciją.
                  Atsakysime jums per 3 darbo dienas.
                </p>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Pastaba</h3>
                <p>
                  Išskirtiniais atvejais (liga, kitos rimtos priežastys) grąžinimo sąlygos gali būti 
                  peržiūrimos individualiai. Tokiais atvejais prašome pateikti pagrindžiančius dokumentus.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Refund; 