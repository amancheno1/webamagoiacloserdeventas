import React, { useState, useEffect } from 'react';
import { Shield, X, Check } from 'lucide-react';

const GDPRBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    setIsVisible(false);
    
    // Enable analytics and other tracking
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('gdpr-consent', 'rejected');
    localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    setIsVisible(false);
    
    // Disable analytics and tracking
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="position-fixed w-100 h-100 top-0 start-0"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 9998,
          backdropFilter: 'blur(2px)'
        }}
      />
      
      {/* GDPR Banner */}
      <div 
        className="position-fixed bottom-0 start-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div className="container">
          <div 
            className="card border-0 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(212, 175, 55, 0.05))',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              animation: 'slideUp 0.5s ease-out'
            }}
          >
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-lg-1 col-md-2 text-center mb-3 mb-md-0">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, var(--color-gold), var(--color-terracotta))'
                    }}
                  >
                    <Shield className="text-white" size={28} />
                  </div>
                </div>
                
                <div className="col-lg-8 col-md-7 mb-3 mb-md-0">
                  <h5 className="fw-bold text-gray mb-2">
                    🍪 Consentimiento de Cookies y Datos
                  </h5>
                  <p className="mb-0 text-gray" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                    Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. 
                    Al hacer clic en <strong>"Aceptar"</strong>, consientes el uso de todas las cookies según nuestra 
                    <button 
                      className="btn btn-link p-0 text-decoration-underline text-gold fw-semibold"
                      style={{ fontSize: 'inherit', verticalAlign: 'baseline' }}
                      onClick={() => {
                        // This would open the privacy policy modal
                        const event = new CustomEvent('openPrivacyPolicy');
                        window.dispatchEvent(event);
                      }}
                    >
                      Política de Privacidad
                    </button>.
                  </p>
                </div>
                
                <div className="col-lg-3 col-md-3">
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <button
                      onClick={handleAccept}
                      className="btn btn-gold px-4 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center"
                      style={{ minWidth: '120px' }}
                    >
                      <Check size={18} className="me-2" />
                      Aceptar
                    </button>
                    <button
                      onClick={handleReject}
                      className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center"
                      style={{ minWidth: '120px' }}
                    >
                      <X size={18} className="me-2" />
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default GDPRBanner;