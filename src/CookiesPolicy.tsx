import React from 'react';
import { ArrowLeft, Cookie, Shield, Eye, Settings, Users, Mail } from 'lucide-react';

interface CookiesPolicyProps {
  onBack: () => void;
}

function CookiesPolicy({ onBack }: CookiesPolicyProps) {
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
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 mb-6 p-2 rounded-lg transition-colors duration-300 hover:bg-white/50"
            style={{ color: '#6E6E6E' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full p-3 mb-4 shadow-lg" style={{
              background: 'linear-gradient(135deg, #D4AF37, #D96941)'
            }}>
              <Cookie className="w-full h-full text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#6E6E6E' }}>
              Política de Cookies
            </h1>
            <p className="text-sm" style={{ color: '#6E6E6E' }}>
              Última actualización: Enero 2024
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="backdrop-blur-sm rounded-2xl p-6 border shadow-lg mb-6" style={{
          backgroundColor: 'rgba(253, 248, 243, 0.9)',
          borderColor: 'rgba(212, 175, 55, 0.3)'
        }}>
          {/* Section 1 */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full p-2" style={{ backgroundColor: '#D4AF37' }}>
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h2 className="text-xl font-bold" style={{ color: '#6E6E6E' }}>
                ¿Qué son las cookies?
              </h2>
            </div>
            <p className="text-sm leading-relaxed ml-11" style={{ color: '#6E6E6E' }}>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a mejorar tu experiencia de navegación.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full p-2" style={{ backgroundColor: '#D96941' }}>
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <h2 className="text-xl font-bold" style={{ color: '#6E6E6E' }}>
                Tipos de cookies que utilizamos
              </h2>
            </div>
            
            <div className="ml-11 space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 mt-1" style={{ color: '#D4AF37' }} />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#6E6E6E' }}>
                    Cookies técnicas (necesarias)
                  </h3>
                  <p className="text-sm" style={{ color: '#6E6E6E' }}>
                    Son esenciales para el funcionamiento del sitio web y no pueden ser desactivadas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Eye className="w-5 h-5 mt-1" style={{ color: '#D96941' }} />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#6E6E6E' }}>
                    Cookies de análisis
                  </h3>
                  <p className="text-sm" style={{ color: '#6E6E6E' }}>
                    Nos ayudan a entender cómo los visitantes interactúan con el sitio web, proporcionando información sobre las páginas visitadas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Settings className="w-5 h-5 mt-1" style={{ color: '#A48BB5' }} />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#6E6E6E' }}>
                    Cookies de funcionalidad
                  </h3>
                  <p className="text-sm" style={{ color: '#6E6E6E' }}>
                    Permiten recordar las elecciones que haces para mejorar tu experiencia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full p-2" style={{ backgroundColor: '#A48BB5' }}>
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <h2 className="text-xl font-bold" style={{ color: '#6E6E6E' }}>
                Cookies de terceros
              </h2>
            </div>
            <div className="ml-11">
              <p className="text-sm mb-3" style={{ color: '#6E6E6E' }}>
                Utilizamos servicios de terceros como:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: '#6E6E6E' }}>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D4AF37' }}></div>
                  <span>Google Analytics para análisis de tráfico</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D96941' }}></div>
                  <span>Calendly para la programación de citas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#A48BB5' }}></div>
                  <span>WhatsApp para comunicación</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full p-2" style={{ backgroundColor: '#D4AF37' }}>
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <h2 className="text-xl font-bold" style={{ color: '#6E6E6E' }}>
                Gestión de cookies
              </h2>
            </div>
            <p className="text-sm leading-relaxed ml-11" style={{ color: '#6E6E6E' }}>
              Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y configurar la mayoría de navegadores para evitar que se instalen.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full p-2" style={{ backgroundColor: '#D96941' }}>
                <span className="text-white text-sm font-bold">5</span>
              </div>
              <h2 className="text-xl font-bold" style={{ color: '#6E6E6E' }}>
                Más información
              </h2>
            </div>
            <div className="ml-11 flex items-center space-x-2">
              <Mail className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <p className="text-sm" style={{ color: '#6E6E6E' }}>
                Para más información sobre cookies, puedes contactarnos en:{' '}
                <a 
                  href="mailto:amagoiavd@gmail.com" 
                  className="font-semibold hover:underline"
                  style={{ color: '#D4AF37' }}
                >
                  amagoiavd@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs mb-1" style={{ color: '#6E6E6E' }}>
            © 2024 Amagoia Louvier - Closer de Ventas Profesional
          </p>
        </div>
      </div>
    </div>
  );
}

export default CookiesPolicy;