import React from 'react';
import { Linkedin, Mail, Phone, Youtube } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BrainIcon from './BrainIcon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Instructor = () => {
  return (
    <section id="instructor" className="ai-section bg-background">
      <div className="ai-container">
        <div className="max-w-4xl mx-auto">
          <div className="ai-card p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 ai-gradient-bg p-8 text-primary-foreground flex flex-col items-center md:items-start">
                <h2 className="ai-section-title text-2xl md:text-3xl mb-6">🎓 Programos autorius</h2>
                <div className="mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto md:mx-0 border-4 border-primary/40 dark:border-primary/60">
                    <img 
                      src="/lovable-uploads/3bf5b898-b8e0-4b8f-9091-83f6429b054f.png" 
                      alt="Deividas Koncius"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="ai-card-title text-xl font-bold">Deividas Koncius</h3>
                  <p className="ai-card-desc font-medium">AI įrankių ekspertas ir full-stack programuotojas</p>
                </div>
                <div className="space-y-2 w-full">
                  <a href="mailto:as.koncius@gmail.com" className="flex items-center font-medium text-primary dark:text-primary-foreground hover:underline transition-colors">
                    <Mail className="h-5 w-5 mr-2 ai-icon" />
                    <span>as.koncius@gmail.com</span>
                  </a>
                  <a href="tel:+37064300602" className="flex items-center font-medium text-primary dark:text-primary-foreground hover:underline transition-colors">
                    <Phone className="h-5 w-5 mr-2 ai-icon" />
                    <span>+370 643 00602</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/deividas-koncius/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center font-medium text-primary dark:text-primary-foreground hover:underline transition-colors"
                  >
                    <Linkedin className="h-5 w-5 mr-2 ai-icon" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <Tabs defaultValue="experience" className="w-full">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="experience" className="flex-1">Patirtis ir kvalifikacija</TabsTrigger>
                    <TabsTrigger value="youtube" className="flex-1">YouTube pranešimai</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="experience">
                    <h3 className="ai-card-title text-xl font-bold mb-4">Patirtis ir kvalifikacija</h3>
                    <ul className="space-y-3 ai-card-desc mb-6">
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        <span><strong>9+ metų patirtis</strong> skaitmeninio ugdymo ir technologijų srityje</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        <span>Pasiekė daugiau nei <strong>6 000 dalyvių</strong> per atviras AI paskaitas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        <span>Apmokė <strong>100+ profesionalų</strong> struktūruotose AI programose</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        <span>Vedė <strong>3 mėn. programą su Lietuvos kultūros taryba (LKT)</strong> – AI ir audiovizualinių įrankių taikymas kūrybos sektoriuose</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        <span><strong>Kursuok platformoje</strong> išmokė daugiau nei <strong>50 specialistų</strong> produktyvumo, automatizavimo ir kūrybos su AI</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        <span>Šiuo metu kuria <strong>160 val. AI programą viešajam ugdymui</strong> ir <strong>16 val. AI kursą verslui</strong> – efektyvesniam darbui ir AI integracijai</span>
                      </li>
                    </ul>
                    <div className="bg-secondary/30 dark:bg-secondary/60 p-4 rounded-lg italic ai-card-desc">
                      „Build with AI moko vaikus naudoti AI ne kaip žaislą, o kaip žinių ir idėjų variklį."
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="youtube">
                    <h3 className="ai-card-title text-xl font-bold mb-4">YouTube pranešimai</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="bg-secondary/20 p-4 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                        <h4 className="font-semibold mb-2">Dirbtinio intelekto įrankiai produktyvumui</h4>
                        <p className="text-sm text-muted-foreground mb-3">FastTrack paskaita apie dirbtinio intelekto įrankius, padedančius padidinti produktyvumą</p>
                        <a 
                          href="https://www.youtube.com/watch?v=r9rHAtuYt8U&ab_channel=FastTrack" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:underline"
                        >
                          <Youtube className="h-4 w-4 mr-1" />
                          <span className="text-sm">Žiūrėti pranešimą</span>
                        </a>
                      </div>
                      
                      <div className="bg-secondary/20 p-4 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                        <h4 className="font-semibold mb-2">Kaip suprasti ar tech karjera – man?</h4>
                        <p className="text-sm text-muted-foreground mb-3">CodeAcademy #1 paskaita apie technologijų karjerą ir jos galimybes</p>
                        <a 
                          href="https://www.youtube.com/watch?v=LcW5KqrzzfU&t=134s&ab_channel=CodeAcademy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:underline"
                        >
                          <Youtube className="h-4 w-4 mr-1" />
                          <span className="text-sm">Žiūrėti pranešimą</span>
                        </a>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructor;
