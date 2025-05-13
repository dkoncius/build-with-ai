import React from 'react';

const CourseProgram = () => {
  const programItems = [
    {
      title: 'Promptų inžinerija',
      description: 'ChatGPT ir Gemini – klausimų formulavimas, rezultato tikslumas'
    },
    {
      title: 'Kūryba su AI',
      description: 'Tekstai, vaizdai, garsas, istorijų ir idėjų vizualizacija'
    },
    {
      title: 'Google integracijos',
      description: 'Google Docs, Slides, Gmail + Gemini praktika'
    },
    {
      title: 'Asmeninis AI',
      description: 'ChatGPT asmenybės kūrimas, savarankiškas pagalbininkas'
    },
    {
      title: 'Svetainė',
      description: 'AI svetainės kūrimas su savo turiniu'
    },
    {
      title: 'Finalas',
      description: 'Pristatymas su Gamma – baigiamasis darbas ir refleksija'
    }
  ];

  return (
    <section id="program" className="ai-section ai-gradient-bg">
      <div className="ai-container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="ai-section-title text-3xl md:text-4xl mb-6">📚 Programa</h2>
          <p className="ai-section-subtitle text-lg">5 savaičių kursas, 30 akademinių valandų praktinės kūrybos</p>
        </div>
        
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border dark:border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="py-4 px-6 text-left font-heading text-lg">Tema</th>
                  <th className="py-4 px-6 text-left font-heading text-lg">Veikla</th>
                </tr>
              </thead>
              <tbody>
                {programItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-secondary/40 dark:bg-secondary/60'}>
                    <td className="py-4 px-6 border-b border-border font-medium text-foreground">{item.title}</td>
                    <td className="py-4 px-6 border-b border-border text-muted-foreground">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseProgram;
