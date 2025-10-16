import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';

interface CookieBannerProps {
  onAccept: () => void;
  onReject: () => void;
  onConfigure: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onReject, onConfigure }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Always show banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
    onReject();
  };

  const handleConfigure = () => {
    onConfigure();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="position-fixed bottom-0 start-0 end-0 p-3 shadow-lg"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderTop: '3px solid #D4AF37',
        zIndex: 1060
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-7">
            <div className="d-flex align-items-start">
              <div 
                className="rounded-circle p-2 me-3 flex-shrink-0"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <Cookie className="text-gold" size={24} />
              </div>
              <div>
                <h6 className="fw-bold text-gray mb-2">
                  🍪 Consentimiento de Cookies y RGPD
                </h6>
                <p className="mb-0 text-gray" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                  Utilizamos cookies esenciales y de análisis para mejorar tu experiencia. 
                  Las cookies de análisis nos ayudan a entender cómo interactúas con nuestro sitio. 
                  <strong className="text-terracotta"> Puedes aceptar todas, rechazar las opcionales o configurar tus preferencias.</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <div className="d-flex flex-wrap gap-2 justify-content-md-end justify-content-start mt-3 mt-md-0">
              <button
                onClick={handleAccept}
                className="btn btn-sm px-3 py-2 rounded-pill fw-semibold text-white"
                style={{ backgroundColor: '#D4AF37', border: 'none' }}
              >
                Aceptar Todas
              </button>
              <button
                onClick={handleReject}
                className="btn btn-sm px-3 py-2 rounded-pill fw-semibold"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid #D96941',
                  color: '#D96941'
                }}
              >
                Solo Esenciales
              </button>
              <button
                onClick={handleConfigure}
                className="btn btn-sm px-2 py-2 rounded-pill"
                style={{ 
                  backgroundColor: 'rgba(164, 139, 181, 0.1)',
                  border: '1px solid #A48BB5',
                  color: '#A48BB5'
                }}
                title="Configurar cookies"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={handleClose}
                className="btn btn-sm px-2 py-2 rounded-pill"
                style={{ 
                  backgroundColor: 'rgba(110, 110, 110, 0.1)',
                  border: '1px solid #6E6E6E',
                  color: '#6E6E6E'
                }}
                title="Cerrar banner"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;