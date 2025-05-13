
import React from 'react';

const CourseProgram = () => {
  const programItems = [
    {
      title: 'Promptų inžinerija',
      description: 'ChatGPT ir Gemini – klausimų formulavimas, rezultato tikslumas'
    },
    {
      title: 'Kūryba su DI',
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
    <section id="program" className="ai-section bg-gradient-to-br from-aipurple-light/30 via-white to-aiblue-light/20">
      <div className="ai-container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">📚 Programa</h2>
          <p className="text-lg text-gray-700">5 savaičių kursas, 30 akademinių valandų praktinės kūrybos</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-aipurple text-white">
                  <th className="py-4 px-6 text-left font-heading text-lg">Tema</th>
                  <th className="py-4 px-6 text-left font-heading text-lg">Veikla</th>
                </tr>
              </thead>
              <tbody>
                {programItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 border-b border-gray-100 font-medium">{item.title}</td>
                    <td className="py-4 px-6 border-b border-gray-100 text-gray-700">{item.description}</td>
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
