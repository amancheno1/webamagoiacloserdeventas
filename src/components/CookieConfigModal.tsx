import React, { useState } from 'react';
import { Cookie, Shield, BarChart3, X } from 'lucide-react';

interface CookieConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: CookiePreferences) => void;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConfigModal: React.FC<CookieConfigModalProps> = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false
  });

  const handleSave = () => {
    localStorage.setItem('cookieConsent', 'configured');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    onSave(preferences);
    onClose();
  };

  const handleToggle = (type: keyof CookiePreferences) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content" style={{ border: '2px solid #D4AF37' }}>
          <div className="modal-header" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle p-2 me-3"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <Cookie className="text-gold" size={24} />
              </div>
              <h5 className="modal-title text-gray fw-bold mb-0">Configuración de Cookies</h5>
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-4">
            <p className="text-gray mb-4">
              Personaliza qué tipos de cookies quieres permitir. Las cookies esenciales son necesarias 
              para el funcionamiento básico del sitio y no pueden desactivarse.
            </p>

            {/* Essential Cookies */}
            <div className="card mb-3" style={{ border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-start">
                    <div 
                      className="rounded-circle p-2 me-3"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                    >
                      <Shield className="text-gold" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold text-gray mb-1">Cookies Esenciales</h6>
                      <p className="mb-2 text-gray" style={{ fontSize: '0.9rem' }}>
                        Necesarias para el funcionamiento básico del sitio web, navegación y funciones de seguridad.
                      </p>
                      <small className="text-muted">
                        Incluye: Sesión, seguridad, preferencias básicas
                      </small>
                    </div>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={true}
                      disabled
                      style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37' }}
                    />
                    <label className="form-check-label text-muted">
                      <small>Siempre activas</small>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="card mb-3" style={{ border: '1px solid rgba(217, 105, 65, 0.2)' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-start">
                    <div 
                      className="rounded-circle p-2 me-3"
                      style={{ backgroundColor: 'rgba(217, 105, 65, 0.1)' }}
                    >
                      <BarChart3 className="text-terracotta" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold text-gray mb-1">Cookies de Análisis</h6>
                      <p className="mb-2 text-gray" style={{ fontSize: '0.9rem' }}>
                        Nos ayudan a entender cómo los visitantes interactúan con el sitio web recopilando información de forma anónima.
                      </p>
                      <small className="text-muted">
                        Incluye: Google Analytics, métricas de rendimiento
                      </small>
                    </div>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={preferences.analytics}
                      onChange={() => handleToggle('analytics')}
                      style={{ 
                        backgroundColor: preferences.analytics ? '#D96941' : '#ccc',
                        borderColor: preferences.analytics ? '#D96941' : '#ccc'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="card mb-3" style={{ border: '1px solid rgba(164, 139, 181, 0.2)' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-start">
                    <div 
                      className="rounded-circle p-2 me-3"
                      style={{ backgroundColor: 'rgba(164, 139, 181, 0.1)' }}
                    >
                      <Cookie className="text-lavender" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold text-gray mb-1">Cookies de Marketing</h6>
                      <p className="mb-2 text-gray" style={{ fontSize: '0.9rem' }}>
                        Se utilizan para mostrar anuncios relevantes y medir la efectividad de las campañas publicitarias.
                      </p>
                      <small className="text-muted">
                        Incluye: Remarketing, publicidad personalizada
                      </small>
                    </div>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={preferences.marketing}
                      onChange={() => handleToggle('marketing')}
                      style={{ 
                        backgroundColor: preferences.marketing ? '#A48BB5' : '#ccc',
                        borderColor: preferences.marketing ? '#A48BB5' : '#ccc'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <small className="text-gray">
                <strong>Nota:</strong> Puedes cambiar estas preferencias en cualquier momento desde los enlaces del pie de página.
              </small>
            </div>
          </div>
          
          <div className="modal-footer" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn text-white fw-semibold"
              style={{ backgroundColor: '#D4AF37' }}
              onClick={handleSave}
            >
              Guardar Preferencias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConfigModal;