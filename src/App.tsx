import React from 'react';
import RunningAgent from './components/RunningAgent';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4 md:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-300/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 relative z-10">
          <div className="mb-8">
            {/* Logo de Onupolis */}
            <div className="mb-6 flex justify-center">
              <img 
                src="/loogo onupolis.png" 
                alt="Onupolis Logo" 
                className="w-20 h-20 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
              RUNNING COACH
            </h1>
            <div className="mt-4 w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto rounded-full shadow-lg"></div>
          </div>
          <p className="text-base md:text-lg text-blue-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Descubre el poder de un entrenamiento personalizado con inteligencia artificial. 
            Planes adaptados a tu nivel, consejos nutricionales especializados y técnicas 
            profesionales que transformarán tu forma de correr. ¡Alcanza tus metas más rápido 
            que nunca con tu coach personal disponible 24/7!
          </p>
        </div>
        
        <RunningAgent />
        
      </div>
    </div>
  );
}

export default App;