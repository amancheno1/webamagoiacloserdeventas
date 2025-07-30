import React from 'react';
import { X, Shield, FileText, Cookie } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    if (title.includes('Privacidad')) return <Shield className="text-gold" size={32} />;
    if (title.includes('Cookies')) return <Cookie className="text-terracotta" size={32} />;
    return <FileText className="text-lavender" size={32} />;
  };

  const getGradient = () => {
    if (title.includes('Privacidad')) return 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(255, 255, 255, 0.95))';
    if (title.includes('Cookies')) return 'linear-gradient(135deg, rgba(217, 105, 65, 0.1), rgba(255, 255, 255, 0.95))';
    return 'linear-gradient(135deg, rgba(164, 139, 181, 0.1), rgba(255, 255, 255, 0.95))';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 1055
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        style={{ zIndex: 1056 }}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="legalModalTitle"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
          <div 
            className="modal-content border-0 shadow-lg"
            style={{
              background: getGradient(),
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 175, 55, 0.2)',
              maxHeight: '90vh'
            }}
          >
            {/* Header */}
            <div 
              className="modal-header border-0 pb-2"
              style={{ 
                borderRadius: '24px 24px 0 0',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(212, 175, 55, 0.05))'
              }}
            >
              <div className="d-flex align-items-center w-100">
                <div className="me-3">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(217, 105, 65, 0.1))',
                      border: '2px solid rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {getIcon()}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h4 
                    id="legalModalTitle" 
                    className="modal-title font-serif fw-bold text-gray mb-1"
                    style={{ fontSize: '1.75rem' }}
                  >
                    {title}
                  </h4>
                  <p className="mb-0 text-muted">
                    Información legal actualizada - Enero 2025
                  </p>
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white p-3 rounded-circle"
                  onClick={onClose}
                  aria-label="Cerrar"
                  style={{
                    background: 'rgba(110, 110, 110, 0.1)',
                    border: '2px solid rgba(110, 110, 110, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(217, 105, 65, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(110, 110, 110, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
            </div>

            {/* Body */}
            <div 
              className="modal-body px-4 py-4"
              style={{ 
                maxHeight: 'calc(90vh - 200px)',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(212, 175, 55, 0.3) transparent'
              }}
            >
              <div 
                className="legal-content"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid rgba(212, 175, 55, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            </div>

            {/* Footer */}
            <div 
              className="modal-footer border-0 pt-2"
              style={{ 
                borderRadius: '0 0 24px 24px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(212, 175, 55, 0.05))'
              }}
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="text-muted small">
                  <Shield size={16} className="me-2 text-gold" />
                  Protegemos tu privacidad y datos personales
                </div>
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
                    onClick={onClose}
                    style={{
                      border: '2px solid rgba(110, 110, 110, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(110, 110, 110, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Cerrar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-gold px-4 py-2 rounded-pill fw-semibold"
                    onClick={onClose}
                    style={{
                      background: 'linear-gradient(135deg, var(--color-gold), var(--color-terracotta))',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
                    }}
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalModal;