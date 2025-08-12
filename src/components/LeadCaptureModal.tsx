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
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div 
          className="modal-content border-0 shadow-lg overflow-hidden"
          style={{ 
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(212, 175, 55, 0.02))',
            backdropFilter: 'blur(20px)',
            maxHeight: '90vh',
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

          {/* Header Image */}
          <div className="text-center position-relative">
            <div 
              className="position-absolute w-100 h-100"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.9) 80%, rgba(255, 255, 255, 1) 100%)',
                zIndex: 1
              }}
            ></div>
            <img 
              src="/assets/amagoia petfil1.jpg" 
              alt="Amagoia Louvier" 
              className="w-100"
              style={{ 
                height: '200px', 
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
            />
          </div>

          <div className="modal-body p-4 pt-0">
            {/* Logo */}
            <div className="text-center mb-3" style={{ marginTop: '-30px', zIndex: 2, position: 'relative' }}>
              <img 
                src="/assets/logo amagoia.jpg" 
                alt="Amagoia Louvier Logo" 
                className="rounded-circle border border-4 bg-white"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  objectFit: 'cover',
                  borderColor: '#D4AF37 !important',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                }}
              />
            </div>

            {/* Title and Subtitle */}
            <div className="text-center mb-3">
              <h2 className="h4 font-serif fw-bold text-gray mb-2">
                <span className="text-gold">Transforma</span> tus ventas <span className="text-terracotta">ahora</span>
              </h2>
              <p className="mb-3" style={{ color: 'rgba(110, 110, 110, 0.8)', lineHeight: '1.4', fontSize: '0.95rem' }}>
                Agenda una llamada personalizada de 30 minutos y descubre los beneficios de contar con una especialista en ventas
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
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-gray fw-medium">
                    <User size={16} className="me-2 text-gold" />
                    Nombre *
                  </label>
                  <input 
                    type="text" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="form-control lead-input"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-gray fw-medium">
                    <User size={16} className="me-2 text-gold" />
                    Apellidos *
                  </label>
                  <input 
                    type="text" 
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className="form-control lead-input"
                    placeholder="Tus apellidos"
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-gray fw-medium">
                    <Building size={16} className="me-2 text-terracotta" />
                    Empresa *
                  </label>
                  <input 
                    type="text" 
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="form-control lead-input"
                    placeholder="Nombre de tu empresa"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-gray fw-medium">
                    <Phone size={16} className="me-2 text-terracotta" />
                    Teléfono *
                  </label>
                  <input 
                    type="tel" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="form-control lead-input"
                    placeholder="+34 xxx xxx xxx"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-gray fw-medium">
                  <Mail size={16} className="me-2 text-lavender" />
                  Email *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control lead-input"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* CTA Button */}
              <div className="text-center mb-3">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn px-4 py-2 rounded-pill fw-bold text-white lead-cta-btn"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #D96941)',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem'
                  }}
                >
                  <Calendar size={20} className="me-2" />
                  {isSubmitting ? 'Procesando...' : 'Agenda Ya'}
                </button>
              </div>

              {/* Alternative Direct Link */}
              <div className="text-center mb-3">
                <p className="text-muted small mb-2">¿Prefieres ir directamente?</p>
                <button 
                  type="button"
                  onClick={handleCalendlyDirect}
                  className="btn btn-outline-gold btn-sm px-4 py-2 rounded-pill"
                >
                  Ir a Calendly
                </button>
              </div>
            </form>

            {/* Legal Links */}
            <div className="text-center">
              <p className="small text-muted mb-2">
                Al enviar este formulario, aceptas nuestra
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => onOpenLegal('Política de Privacidad', legalContent.privacyPolicy)}
                  className="btn btn-link btn-sm text-gold p-0"
                  style={{ textDecoration: 'none', fontSize: '0.85rem' }}
                >
                  Política de Privacidad
                </button>
                <span className="text-muted small">y</span>
                <button
                  type="button"
                  onClick={() => onOpenLegal('Aviso Legal', legalContent.legalNotice)}
                  className="btn btn-link btn-sm text-terracotta p-0"
                  style={{ textDecoration: 'none', fontSize: '0.85rem' }}
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