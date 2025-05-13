import React from 'react';
import { Calendar, Clock, Users, Star } from 'lucide-react';

const CourseDetails = () => {
  return (
    <section id="about" className="ai-section bg-background">
      <div className="ai-container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="ai-section-title text-3xl md:text-4xl mb-6">Apie kursą</h2>
          <p className="ai-section-subtitle text-lg">Mokymai, kurie padeda vaikams ne tik naudoti, bet ir kurti su dirbtiniu intelektu</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="ai-card">
            <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 ai-icon text-primary" />
            </div>
            <h3 className="ai-card-title text-xl mb-3">📍 Formatas:</h3>
            <ul className="space-y-2 ai-card-desc">
              <li className="flex items-start">
                <span className="mr-2">💻</span>
                <span>Nuotoliniu būdu per „Teams" – patogu iš namų</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⏱️</span>
                <span>5 savaitės | 2 kartai per savaitę | po 3 val.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📚</span>
                <span>Iš viso – <strong>30 akademinių valandų praktinės kūrybos</strong></span>
              </li>
            </ul>
          </div>
          
          <div className="ai-card">
            <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 ai-icon text-primary" />
            </div>
            <h3 className="ai-card-title text-xl mb-3">👥 Kam skirta?</h3>
            <ul className="space-y-2 ai-card-desc">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>9–13 metų moksleiviams</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Norintiems išmokti naudoti AI mokslams ir kūrybai</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Visiškai pradedantiesiems – <strong>nereikia išankstinių žinių</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Visi įrankiai – <strong>suteikiami mokymų metu</strong></span>
              </li>
            </ul>
          </div>
          
          <div className="ai-card">
            <div className="rounded-full bg-primary/10 dark:bg-primary/20 w-12 h-12 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 ai-icon text-primary" />
            </div>
            <h3 className="ai-card-title text-xl mb-3">💰 Kaina</h3>
            <div className="mb-4">
              <div className="text-3xl font-bold text-primary">€150</div>
              <div className="ai-card-desc">vienam dalyviui</div>
            </div>
            <div className="bg-secondary/30 dark:bg-secondary/60 p-4 rounded-lg">
              <p className="ai-card-desc text-sm">
                Į kainą įskaičiuota: visa mokymų programa + prieiga prie ChatGPT licencijos mokymosi metu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
