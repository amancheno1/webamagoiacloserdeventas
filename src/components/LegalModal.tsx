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

  // Get appropriate icon based on title
  const getIcon = () => {
    if (title.includes('Privacidad')) return <Shield className="text-gold" size={28} />;
    if (title.includes('Cookies')) return <Cookie className="text-terracotta" size={28} />;
    return <FileText className="text-lavender" size={28} />;
  };

  // Get appropriate gradient based on title
  const getGradient = () => {
    if (title.includes('Privacidad')) return 'rgba(212, 175, 55, 0.05)';
    if (title.includes('Cookies')) return 'rgba(217, 105, 65, 0.05)';
    return 'rgba(164, 139, 181, 0.05)';
  };

  return (
    <div 
      className="modal fade show d-block" 
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(5px)'
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div 
          className="modal-content border-0 shadow-lg"
          style={{ 
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div 
            className="modal-header border-0 py-4"
            style={{ 
              background: getGradient(),
              borderBottom: '1px solid rgba(212, 175, 55, 0.1)'
            }}
          >
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle p-3 me-3"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
              >
                {getIcon()}
              </div>
              <div>
                <h4 className="modal-title text-gray fw-bold mb-1 font-serif">{title}</h4>
                <p className="mb-0 text-muted small">Información legal actualizada</p>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white rounded-circle p-2"
              onClick={onClose}
              style={{
                backgroundColor: 'rgba(110, 110, 110, 0.1)',
                border: 'none',
                width: '40px',
                height: '40px'
              }}
            ></button>
          </div>
          
          <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div 
              className="legal-content"
              dangerouslySetInnerHTML={{ __html: content }}
              style={{
                lineHeight: '1.7',
                color: '#6E6E6E'
              }}
            />
          </div>
          
          <div 
            className="modal-footer border-0 py-4"
            style={{ 
              background: getGradient(),
              borderTop: '1px solid rgba(212, 175, 55, 0.1)'
            }}
          >
            <button 
              type="button" 
              className="btn px-4 py-2 rounded-pill fw-semibold"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #D96941)',
                border: 'none',
                color: 'white'
              }}
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;