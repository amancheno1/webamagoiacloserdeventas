import React, { useState } from 'react';
import { X, Calendar, User, Building, Phone, Mail } from 'lucide-react';
import { trackFormSubmission, trackExternalLink, trackConsultationBooking } from '../utils/analytics';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLegal: (title: string, content: string) => void;
  legalContent: {
    privacyPolicy: string;
    legalNotice: string;
  };
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ 
  isOpen, 
  onClose, 
  onOpenLegal, 
  legalContent 
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    empresa: '',
    telefono: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    
    // Track form submission
    trackFormSubmission('lead_capture_form');

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Nueva consulta de ${formData.nombre} ${formData.apellidos} - Amagoia Louvier`);
      const body = encodeURIComponent(`
Nombre: ${formData.nombre} ${formData.apellidos}
Empresa: ${formData.empresa}
Teléfono: ${formData.telefono}
Email: ${formData.email}

---
Solicitud de consulta personalizada de 30 minutos
Enviado desde el formulario de lead capture
      `);
      
      const mailtoLink = `mailto:amagoialr@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Redirect to Calendly
      setTimeout(() => {
        trackConsultationBooking();
        trackExternalLink('https://calendly.com/amagoiavd/30min');
        window.open('https://calendly.com/amagoiavd/30min', '_blank');
      }, 1000);
      
      // Show success message and reset form
      setSubmitStatus('success');
      setFormData({ nombre: '', apellidos: '', empresa: '', telefono: '', email: '' });
      
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalendlyDirect = () => {
    trackConsultationBooking();
    trackExternalLink('https://calendly.com/amagoiavd/30min');
    window.open('https://calendly.com/amagoiavd/30min', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal fade show d-block" 
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 1070
      }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '500px' }}>
        <div 
          className="modal-content border-0 shadow-lg overflow-hidden"
          style={{ 
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(212, 175, 55, 0.02))',
            backdropFilter: 'blur(20px)',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}
        >
          {/* Close Button */}
          <button 
            type="button" 
            className="btn position-absolute top-0 end-0 m-3 rounded-circle p-2"
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(110, 110, 110, 0.1)',
              border: 'none',
              width: '40px',
              height: '40px',
              zIndex: 10
            }}
          >
            <X size={20} className="text-gray" />
          </button>

          <div className="modal-body p-4">
            {/* Circular Profile Image */}
            <div className="text-center mb-3">
              <img 
                src="/assets/amagoia petfil1.jpg" 
                alt="Amagoia Louvier Logo" 
                className="rounded-circle border border-3"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'cover',
                  borderColor: '#D4AF37 !important',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                }}
              />
            </div>

            {/* Title and Subtitle */}
            <div className="text-center mb-3">
              <h2 className="h5 font-serif fw-bold text-gray mb-2">
                ¿Por qué necesitas un <span className="text-gold">Closer</span>?
              </h2>
              <p className="mb-3" style={{ color: 'rgba(110, 110, 110, 0.8)', lineHeight: '1.4', fontSize: '0.9rem' }}>
                Transforma tus ventas ahora con una llamada de 30 minutos
              </p>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="alert alert-success text-center mb-3" role="alert">
                <strong>¡Perfecto!</strong> Te redirigiremos a Calendly para agendar tu llamada.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="alert alert-danger text-center mb-3" role="alert">
                <strong>Error:</strong> No se pudo procesar la solicitud. Inténtalo de nuevo.
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label text-gray fw-medium" style={{ fontSize: '0.85rem' }}>
                    <User size={16} className="me-2 text-gold" />
                    Nombre *
                  </label>
                  <input 
                    type="text" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                    style={{
                      border: '2px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(253, 248, 243, 0.8)',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D4AF37';
                      e.target.style.backgroundColor = '#FDF8F3';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                      e.target.style.backgroundColor = 'rgba(253, 248, 243, 0.8)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-gray fw-medium" style={{ fontSize: '0.85rem' }}>
                    <User size={16} className="me-2 text-gold" />
                    Apellidos *
                  </label>
                  <input 
                    type="text" 
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                    style={{
                      border: '2px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(253, 248, 243, 0.8)',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D4AF37';
                      e.target.style.backgroundColor = '#FDF8F3';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                      e.target.style.backgroundColor = 'rgba(253, 248, 243, 0.8)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Tus apellidos"
                    required
                  />
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label text-gray fw-medium" style={{ fontSize: '0.85rem' }}>
                    <Building size={16} className="me-2 text-terracotta" />
                    Empresa *
                  </label>
                  <input 
                    type="text" 
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                    style={{
                      border: '2px solid rgba(217, 105, 65, 0.3)',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(253, 248, 243, 0.8)',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D96941';
                      e.target.style.backgroundColor = '#FDF8F3';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(217, 105, 65, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(217, 105, 65, 0.3)';
                      e.target.style.backgroundColor = 'rgba(253, 248, 243, 0.8)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Nombre de tu empresa"
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-gray fw-medium" style={{ fontSize: '0.85rem' }}>
                    <Phone size={16} className="me-2 text-terracotta" />
                    Teléfono *
                  </label>
                  <input 
                    type="tel" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="form-control form-control-sm"
                    style={{
                      border: '2px solid rgba(217, 105, 65, 0.3)',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(253, 248, 243, 0.8)',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D96941';
                      e.target.style.backgroundColor = '#FDF8F3';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(217, 105, 65, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(217, 105, 65, 0.3)';
                      e.target.style.backgroundColor = 'rgba(253, 248, 243, 0.8)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="+34 xxx xxx xxx"
                    required
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="form-label text-gray fw-medium" style={{ fontSize: '0.85rem' }}>
                  <Mail size={16} className="me-2 text-lavender" />
                  Email *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control form-control-sm"
                  style={{
                    border: '2px solid rgba(164, 139, 181, 0.3)',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(253, 248, 243, 0.8)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#A48BB5';
                    e.target.style.backgroundColor = '#FDF8F3';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(164, 139, 181, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(164, 139, 181, 0.3)';
                    e.target.style.backgroundColor = 'rgba(253, 248, 243, 0.8)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* CTA Button */}
              <div className="text-center mb-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-sm px-4 py-2 rounded-pill fw-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #D96941)',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.02)';
                    e.target.style.boxShadow = '0 12px 32px rgba(212, 175, 55, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
                  }}
                >
                  <Calendar size={18} className="me-2" />
                  {isSubmitting ? 'Procesando...' : 'Agenda Ya'}
                </button>
              </div>

              {/* Alternative Direct Link */}
              <div className="text-center mb-2">
                <p className="text-muted small mb-1">¿Prefieres ir directamente?</p>
                <button 
                  type="button"
                  onClick={handleCalendlyDirect}
                  className="btn btn-sm px-3 py-1 rounded-pill"
                  style={{
                    border: '2px solid #D4AF37',
                    color: '#D4AF37',
                    backgroundColor: 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#D4AF37';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#D4AF37';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Ir a Calendly
                </button>
              </div>
            </form>

            {/* Legal Links */}
            <div className="text-center">
              <p className="small text-muted mb-1">
                Al enviar este formulario, aceptas nuestra
              </p>
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => onOpenLegal('Política de Privacidad', legalContent.privacyPolicy)}
                  className="btn btn-link btn-sm text-gold p-0"
                  style={{ textDecoration: 'none', fontSize: '0.8rem' }}
                >
                  Política de Privacidad
                </button>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>y</span>
                <button
                  type="button"
                  onClick={() => onOpenLegal('Aviso Legal', legalContent.legalNotice)}
                  className="btn btn-link btn-sm text-terracotta p-0"
                  style={{ textDecoration: 'none', fontSize: '0.8rem' }}
                >
                  Aviso Legal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;