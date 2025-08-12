import React from 'react';
import { useState } from 'react';
import { Instagram, Facebook, Linkedin, Mail, Phone, TrendingUp, Award, Users, Calendar, Shield } from 'lucide-react';
import CookiesPolicy from './CookiesPolicy';
import PrivacyPolicy from './PrivacyPolicy';

function App() {
  const [showCookiesPolicy, setShowCookiesPolicy] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  if (showCookiesPolicy) {
    return <CookiesPolicy onBack={() => setShowCookiesPolicy(false)} />;
  }

  if (showPrivacyPolicy) {
    return <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />;
  }

  return (
    <div className="min-h-screen" style={{
      backgroundColor: '#FDF8F3'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/5"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        {/* Profile Section */}
        <div className="text-center mb-8">
          {/* Profile Image */}
          <div className="relative mb-6">
            <div className="w-32 h-32 mx-auto rounded-full p-1 shadow-2xl" style={{
              background: 'linear-gradient(135deg, #D4AF37, #D96941, #A48BB5)'
            }}>
              <img 
                src="/amagoia,jpg-Photoroom.jpg"
                alt="Amagoia Louvier"
                className="w-full h-full rounded-full object-cover bg-white"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #D4AF37, #D96941)'
              }}>
                <span className="text-white text-3xl font-bold">AL</span>
              </div>
            </div>
            <a 
              href="https://wa.me/34123456789?text=Hola%20Amagoia,%20me%20interesa%20conocer%20más%20sobre%20tus%20servicios%20de%20closer%20de%20ventas"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer" style={{
              backgroundColor: '#D4AF37'
            }}
            >
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </a>
          </div>

          {/* Name and Title */}
          <h1 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: '#6E6E6E' }}>
            Amagoia Louvier
          </h1>
          <div className="text-lg font-semibold mb-4" style={{
            background: 'linear-gradient(135deg, #D4AF37, #D96941)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Closer de Ventas Alto Ticket
          </div>
          
          {/* Eslogan en tres colores */}
          <div className="text-2xl font-bold mb-8 leading-tight">
            <span style={{ color: '#D4AF37' }}>Conecta.</span>{' '}
            <span style={{ color: '#D96941' }}>Conquista.</span>{' '}
            <span style={{ color: '#A48BB5' }}>Cierra con conciencia.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          {/* Main CTA - ¿Qué es un Closer? */}
          <a 
            href="https://amagoialouviercloserventasdigital.es/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full text-white rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #D96941)',
              borderColor: 'rgba(212, 175, 55, 0.5)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">¿Qué es un Closer de Ventas?</h3>
                <p className="text-sm opacity-90">Descubre cómo puedo transformar tu negocio</p>
              </div>
              <Phone className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
          </a>

          {/* Nuevo botón unificado */}
          <a 
            href="https://amagoialouviercloserventasdigital.es/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full text-white rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #A48BB5, #D4AF37)',
              borderColor: 'rgba(164, 139, 181, 0.5)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Transforma tus ventas ahora</h3>
                <p className="text-sm opacity-90">Benefíciate de trabajar con una closer especializada en ventas de alto ticket</p>
              </div>
              <TrendingUp className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
          </a>

          {/* Agenda tu llamada ahora */}
          <a 
            href="https://calendly.com/amagoiavd/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full text-white rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 shadow-lg border"
            style={{
              background: 'linear-gradient(135deg, #D96941, #A48BB5)',
              borderColor: 'rgba(217, 105, 65, 0.5)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Agenda tu llamada ahora</h3>
                <p className="text-sm opacity-90">Agenda una llamada de 30 minutos para analizar tu situación actual y descubrir oportunidades de mejora</p>
              </div>
              <Calendar className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/amagoia_louvier/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full text-white rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 shadow-lg border"
            style={{
              background: 'linear-gradient(135deg, #A48BB5, #D96941)',
              borderColor: 'rgba(164, 139, 181, 0.5)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Sígueme en Instagram</h3>
                <p className="text-sm opacity-90">Descubre contenido exclusivo sobre ventas y estrategias de alto ticket</p>
              </div>
              <Instagram className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="backdrop-blur-sm rounded-2xl p-6 border shadow-lg mb-6" style={{
          backgroundColor: 'rgba(253, 248, 243, 0.9)',
          borderColor: 'rgba(212, 175, 55, 0.3)'
        }}>
          <h3 className="font-semibold text-center mb-4" style={{ color: '#6E6E6E' }}>Conecta Conmigo</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.instagram.com/amagoia_louvier"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #A48BB5, #D96941)' }}
            >
              <Instagram className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </a>
            
            <a 
              href="https://www.facebook.com/people/Amagoia-Louvier/100009764285753/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              style={{ backgroundColor: '#D96941' }}
            >
              <Facebook className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/amagoia-louvier/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              style={{ backgroundColor: '#A48BB5' }}
            >
              <Linkedin className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </a>
            
            <a 
              href="mailto:amagoiavd@gmail.com?subject=Consulta%20sobre%20servicios%20de%20closer&body=Hola%20Amagoia,%0A%0AMe%20interesa%20conocer%20más%20sobre%20tus%20servicios%20de%20closer%20de%20ventas.%0A%0ASaludos"
              className="group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              style={{ backgroundColor: '#D4AF37' }}
            >
              <Mail className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="text-center mb-6">
          <img 
            src="/public/logo-amagoia-white.jpg" 
            alt="Amagoia Louvier Logo"
            className="h-16 mx-auto opacity-80"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="mb-3 flex justify-center space-x-6">
            <button 
              onClick={() => setShowCookiesPolicy(true)}
              className="inline-flex items-center space-x-2 text-sm transition-colors duration-300 hover:opacity-80"
              style={{ color: '#6E6E6E' }}
            >
              <Shield className="w-4 h-4" />
              <span>Política de Cookies</span>
            </button>
            <button 
              onClick={() => setShowPrivacyPolicy(true)}
              className="inline-flex items-center space-x-2 text-sm transition-colors duration-300 hover:opacity-80"
              style={{ color: '#6E6E6E' }}
            >
              <Shield className="w-4 h-4" />
              <span>Política de Privacidad</span>
            </button>
          </div>
          <p className="text-xs mb-1" style={{ color: '#6E6E6E' }}>
            © 2024 Amagoia Louvier - Closer de Ventas Profesional
          </p>
          <p className="text-xs opacity-60" style={{ color: '#6E6E6E' }}>
            Transformando conversaciones en decisiones de alto valor
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;