import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Calendar } from 'lucide-react';
import { trackFormSubmission } from '../utils/analytics';

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const PopupForm: React.FC<PopupFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    trackFormSubmission('popup_form');

    try {
      // Submit to Mailchimp via Netlify function
      const response = await fetch('/api/mailchimp-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: 'Solicitud desde formulario emergente - Transformar ventas'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', phone: '', email: '' });
        
        // Close form after success
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="position-fixed w-100 h-100 top-0 start-0"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 9998,
          backdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      />
      
      {/* Popup Form */}
      <div 
        className="position-fixed top-50 start-50 translate-middle"
        style={{ zIndex: 9999, width: '90%', maxWidth: '500px' }}
      >
        <div 
          className="card border-0 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(212, 175, 55, 0.05))',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            animation: 'popupSlideIn 0.4s ease-out'
          }}
        >
          {/* Header */}
          <div className="position-relative text-center p-4 pb-2">
            <button
              onClick={onClose}
              className="btn-close position-absolute top-0 end-0 m-3 p-2 rounded-circle"
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
            
            {/* Logo and Photo */}
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img 
                src="/assets/logo amagoia.jpg" 
                alt="Amagoia Louvier Logo" 
                className="rounded-circle me-3"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  objectFit: 'cover', 
                  border: '3px solid #D4AF37',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}
              />
              <img 
                src="/assets/amagoia petfil1.jpg" 
                alt="Amagoia Louvier" 
                className="rounded-circle"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'cover', 
                  border: '3px solid #D96941',
                  boxShadow: '0 4px 15px rgba(217, 105, 65, 0.3)'
                }}
              />
            </div>

            <h2 className="h3 font-serif fw-bold text-gray mb-2">
              Transforma tus <span className="text-gold">ventas</span> ahora
            </h2>
            <p className="text-gray mb-0" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
              ¿Transformar tus ventas? Descubre los beneficios de trabajar con una closer especializada en alto ticket
            </p>
          </div>

          {/* Form Body */}
          <div className="card-body p-4 pt-2">
            {submitStatus === 'success' && (
              <div className="alert alert-success mb-3" role="alert">
                <strong>¡Perfecto!</strong> He recibido tu información. Te contactaré pronto para transformar tus ventas.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="alert alert-danger mb-3" role="alert">
                <strong>Error:</strong> No se pudo enviar la información. Por favor, inténtalo de nuevo.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-gray fw-medium small">
                    <User size={14} className="me-2 text-gold" />
                    Nombre
                  </label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-control popup-input"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-gray fw-medium small">
                    <User size={14} className="me-2 text-terracotta" />
                    Apellidos
                  </label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-control popup-input"
                    placeholder="Tus apellidos"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-gray fw-medium small">
                  <Phone size={14} className="me-2 text-lavender" />
                  Teléfono
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control popup-input"
                  placeholder="+34 xxx xxxx xxx"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-gray fw-medium small">
                  <Mail size={14} className="me-2 text-gold" />
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control popup-input"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn btn-lg w-100 py-3 rounded-pill fw-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #D96941)',
                  border: 'none',
                  boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://calendly.com/amagoiavd/30min', '_blank');
                  onClose();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 175, 55, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
                }}
              >
                <>
                  <Calendar size={18} className="me-2" />
                  Agenda Ya
                </>
              </button>
            </form>

            <p className="text-center mt-3 mb-0 small text-muted">
              🔒 Tus datos están protegidos y no serán compartidos con terceros
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes popupSlideIn {
          from {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default PopupForm;