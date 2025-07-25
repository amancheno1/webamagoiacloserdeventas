import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { trackPageView } from './utils/analytics';
import { 
  trackFormSubmission, 
  trackButtonClick, 
  trackExternalLink, 
  trackWhatsAppClick, 
  trackSocialClick, 
  trackConsultationBooking 
} from './utils/analytics';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap, 
  Target, 
  BarChart3, 
  BookOpen, 
  Award,
  Heart,
  Linkedin
} from 'lucide-react';
import LegalModal from './components/LegalModal';
import { legalContent } from './data/legalContent';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Track initial page view
    trackPageView(window.location.pathname);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openModal = (title: string, content: string) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', content: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    trackFormSubmission('contact_form');

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Nuevo contacto de ${formData.name} - Amagoia Louvier`);
      const body = encodeURIComponent(`
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}

Mensaje:
${formData.message}

---
Enviado desde el formulario de contacto de amagoialouviercloserdeventas.netlify.app
      `);
      
      const mailtoLink = `mailto:amagoialr@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message and reset form
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="smooth-scroll" style={{ backgroundColor: '#FDF8F3' }}>
      {/* Header */}
      <nav className={`navbar navbar-expand-lg fixed-top navbar-custom ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <img 
              src="/assets/logo amagoia.jpg" 
              alt="Amagoia Louvier Logo" 
              className="rounded-circle me-3"
              style={{ width: '48px', height: '48px', objectFit: 'cover', border: '2px solid #D4AF37' }}
            />
            <div>
              <h1 className="h5 mb-0 font-serif text-gray">Amagoia Louvier</h1>
              <p className="small mb-0 text-terracotta">Closer de Ventas</p>
            </div>
          </div>

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: '#6E6E6E' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button onClick={() => scrollToSection('inicio')} className="nav-link btn btn-link text-gray fw-medium">
                  Inicio
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToSection('sobre-mi')} className="nav-link btn btn-link text-gray fw-medium">
                  Sobre Mí
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToSection('beneficios')} className="nav-link btn btn-link text-gray fw-medium">
                  Beneficios
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToSection('servicios')} className="nav-link btn btn-link text-gray fw-medium">
                  Servicios
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToSection('contacto')} className="nav-link btn btn-link text-gray fw-medium">
                  Contacto
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/34627985178"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        onClick={trackWhatsAppClick}
      >
        <MessageCircle size={24} />
      </a>

      {/* Hero Section */}
      <section id="inicio" className="hero-gradient d-flex align-items-center" style={{ minHeight: '100vh', paddingTop: '80px' }} data-aos="fade-up">
        <div className="container py-5">
          <div className="text-center">
            <h1 className="display-2 font-serif fw-bold text-gray mb-4 hero-title" data-aos="fade-down" data-aos-delay="200">
              Ventas con <span className="text-gold">alma</span>,<br />
              poder con <span className="text-terracotta">propósito</span>
            </h1>
            <p className="lead text-gray mb-4 hero-subtitle" data-aos="fade-up" data-aos-delay="400">
              <span className="text-gold fw-bold">Conecta.</span> <span className="text-terracotta fw-bold">Conquista.</span> <span className="text-lavender fw-bold">Cierra con conciencia.</span>
            </p>
            <p className="fs-5 mb-5" style={{ color: 'rgba(110, 110, 110, 0.8)' }} data-aos="fade-up" data-aos-delay="600">
              Transformo conversaciones en decisiones, creando conexiones auténticas que generan resultados extraordinarios en ventas de alto ticket digital.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center" data-aos="fade-up" data-aos-delay="800">
              <button 
                onClick={() => scrollToSection('contacto')}
                className="btn btn-gold btn-lg px-4 py-3 rounded-pill fw-semibold"
                onClick={() => {
                  trackButtonClick('hero_transform_sales');
                  scrollToSection('contacto');
                }}
              >
                Transformar Mis Ventas
              </button>
              <button 
                onClick={() => {
                  trackButtonClick('hero_know_more');
                  scrollToSection('sobre-mi');
                }}
                className="btn btn-terracotta btn-lg px-4 py-3 rounded-pill fw-semibold"
              >
                Conocer Más
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center mb-5" data-aos="fade-right">
            <div className="col-lg-6">
              <h2 className="display-4 font-serif fw-bold text-gray mb-4 section-title">
                Sobre <span className="text-gold">Mí</span>
              </h2>
              <p className="fs-5 text-gray mb-4">
                Con más de <strong className="text-terracotta">15 años de experiencia</strong> en ventas, he desarrollado un enfoque único que combina técnicas de closing avanzadas con conexión emocional auténtica.
              </p>
              <p className="fs-5 text-gray mb-4">
                Mi metodología se basa en entender profundamente las necesidades del cliente, crear confianza genuina y guiar hacia decisiones que realmente transformen sus vidas y negocios.
              </p>
              <p className="fs-5 text-gray mb-4">
                <strong className="text-gold">¿Por qué necesitas una closer especializada?</strong> <br /> Porque el 80% de las ventas se pierden por falta de seguimiento profesional y técnicas de cierre inadecuadas. Yo convierto esas oportunidades perdidas en ingresos reales.
              </p>
            </div>
            <div className="col-lg-6 text-center" data-aos="fade-left">
              <div className="position-relative">
                <div 
                  className="position-absolute w-100 h-100 rounded-4"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(164, 139, 181, 0.2))',
                    transform: 'rotate(6deg)',
                    top: 0,
                    left: 0
                  }}
                ></div>
                <img 
                  src="/assets/amagoia poerfil2.jpg" 
                  alt="Amagoia Louvier" 
                  className="profile-image position-relative"
                  style={{ width: '400px', height: '480px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-10">
              <div className="stats-container p-4 rounded-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #6E6E6E, rgba(110, 110, 110, 0.9))', border: '2px solid rgba(212, 175, 55, 0.3)' }}>
                <div className="row g-4 text-center">
                  <div className="col-md-3" data-aos="zoom-in" data-aos-delay="200">
                    <div className="stat-item">
                      <div className="gradient-mixed rounded-circle p-3 mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                        <Award className="text-white" size={32} />
                      </div>
                      <h3 className="h4 text-white mb-1">35%</h3>
                      <p className="mb-0 text-white-50">Cierre Promedio Evergreen VSL</p>
                    </div>
                  </div>
                  <div className="col-md-3" data-aos="zoom-in" data-aos-delay="300">
                    <div className="stat-item">
                      <div className="bg-lavender rounded-circle p-3 mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                        <TrendingUp className="text-white" size={32} />
                      </div>
                      <h3 className="h4 text-white mb-1">80%</h3>
                      <p className="mb-0 text-white-50">Cierre Lanzamiento 
                        High Ticket</p>
                    </div>
                  </div>
                  <div className="col-md-3" data-aos="zoom-in" data-aos-delay="400">
                    <div className="stat-item">
                      <div className="bg-gold rounded-circle p-3 mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                        <Target className="text-white" size={32} />
                      </div>
                      <h3 className="h4 text-white mb-1">1000€</h3>
                      <p className="mb-0 text-white-50">Ticket Mínimo</p>
                    </div>
                  </div>
                  <div className="col-md-3" data-aos="zoom-in" data-aos-delay="500">
                    <div className="stat-item">
                      <div className="bg-terracotta rounded-circle p-3 mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                        <TrendingUp className="text-white" size={32} />
                      </div>
                      <h3 className="h4 text-white mb-1">35%</h3>
                      <p className="mb-0 text-white-50">Aumento de Ventas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-5 benefits-gradient">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-4 font-serif fw-bold text-gray mb-4 section-title">
              ¿Listo para <span className="text-gold">transformar</span> tus ventas?
            </h2>
            <p className="fs-4 mb-0" style={{ color: 'rgba(110, 110, 110, 0.8)' }}>
              Descubre los beneficios de trabajar con una closer especializada en alto ticket
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 border-0 shadow-lg modern-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="modern-icon-circle bg-gold me-3">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <h3 className="h5 fw-bold mb-0 text-gray">Incremento de Ingresos</h3>
                  </div>
                  <p className="text-gray mb-0" style={{ lineHeight: '1.6' }}>
                    Aumenta un 35% de tus conversiones con técnicas de closing probadas y personalizadas para tu audiencia.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
              <div className="card h-100 border-0 shadow-lg modern-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="modern-icon-circle bg-terracotta me-3">
                      <Users size={24} className="text-white" />
                    </div>
                    <h3 className="h5 fw-bold mb-0 text-gray">Reducción de tiempo</h3>
                  </div>
                  <p className="text-gray mb-0" style={{ lineHeight: '1.6' }}>
                    Libera un 40% de tus horas semanales para enfocarte en crear contenido mientras yo me encargo de cerrar tus ventas.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="600">
              <div className="card h-100 border-0 shadow-lg modern-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="modern-icon-circle bg-lavender me-3">
                      <Shield size={24} className="text-white" />
                    </div>
                    <h3 className="h5 fw-bold mb-0 text-gray">Reducción de Riesgo</h3>
                  </div>
                  <p className="text-gray mb-0" style={{ lineHeight: '1.6' }}>
                    Minimiza las objeciones y rechazos con un enfoque estratégico basado en psicología de ventas.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="800">
              <div className="card h-100 border-0 shadow-lg modern-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="modern-icon-circle bg-gray me-3">
                      <Zap size={24} className="text-white" />
                    </div>
                    <h3 className="h5 fw-bold mb-0 text-gray">Resultados Inmediatos</h3>
                  </div>
                  <p className="text-gray mb-0" style={{ lineHeight: '1.6' }}>
                    Consigue mejoras en tus métricas de conversión desde la primera semana de implementación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-4 font-serif fw-bold text-gray mb-4 section-title">
              Mis <span className="text-gold">Servicios</span>
            </h2>
            <p className="fs-4 mb-0" style={{ color: 'rgba(110, 110, 110, 0.8)' }}>
              Soluciones especializadas para maximizar tus ventas de alto ticket
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6" data-aos="fade-right" data-aos-delay="200">
              <div className="card service-card h-100 border-0 shadow-lg bg-white">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start mb-4">
                    <div className="service-icon-circle bg-gold me-3">
                      <Target size={28} className="text-white" />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="h4 fw-bold mb-2 text-gray">Closing de Alto Ticket</h3>
                      <p className="text-gray mb-3" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        Manejo completo de llamadas de cierre para productos y servicios de alto valor.
                      </p>
                    </div>
                  </div>
                  <div className="service-features">
                    <div className="feature-item">• Llamadas de descubrimiento</div>
                    <div className="feature-item">• Presentaciones de venta</div>
                    <div className="feature-item">• Manejo de objeciones</div>
                    <div className="feature-item">• Cierre y seguimiento</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6" data-aos="fade-left" data-aos-delay="200">
              <div className="card service-card h-100 border-0 shadow-lg bg-white">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start mb-4">
                    <div className="service-icon-circle bg-terracotta me-3">
                      <BookOpen size={28} className="text-white" />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="h4 fw-bold mb-2 text-gray">Consultoría en Ventas</h3>
                      <p className="text-gray mb-3" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        Análisis y optimización completa de tus procesos de venta actuales.
                      </p>
                    </div>
                  </div>
                  <div className="service-features">
                    <div className="feature-item">• Auditoría de procesos</div>
                    <div className="feature-item">• Optimización de scripts</div>
                    <div className="feature-item">• Estrategias personalizadas</div>
                    <div className="feature-item">• Plan de implementación</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6" data-aos="fade-right" data-aos-delay="400">
              <div className="card service-card h-100 border-0 shadow-lg bg-white">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start mb-4">
                    <div className="service-icon-circle bg-lavender me-3">
                      <BarChart3 size={28} className="text-white" />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="h4 fw-bold mb-2 text-gray">Análisis de Conversión</h3>
                      <p className="text-gray mb-3" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        Seguimiento detallado de métricas y ROI para optimizar resultados.
                      </p>
                    </div>
                  </div>
                  <div className="service-features">
                    <div className="feature-item">• Tracking de conversiones</div>
                    <div className="feature-item">• Análisis de ROI</div>
                    <div className="feature-item">• Reportes detallados</div>
                    <div className="feature-item">• Recomendaciones</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6" data-aos="fade-left" data-aos-delay="400">
              <div className="card service-card h-100 border-0 shadow-lg bg-white">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start mb-4">
                    <div className="service-icon-circle bg-gray me-3">
                      <Heart size={28} className="text-white" />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="h4 fw-bold mb-2 text-gray">Fidelización y Seguimiento</h3>
                      <p className="text-gray mb-3" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        Estrategias personalizadas para mantener y fortalecer la relación con tus clientes.
                      </p>
                    </div>
                  </div>
                  <div className="service-features">
                    <div className="feature-item">• Programas de fidelización</div>
                    <div className="feature-item">• Seguimiento post-venta</div>
                    <div className="feature-item">• Estrategias de retención</div>
                    <div className="feature-item">• Upselling y cross-selling</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consulta Gratuita Section */}
          <div className="mt-5" data-aos="zoom-in">
            <div className="consultation-box text-center">
              <h3 className="h2 font-serif fw-bold text-gray mb-4">
                <span className="text-gold">Consulta Personalizada</span>
              </h3>
              <p className="fs-5 mb-4" style={{ color: 'rgba(110, 110, 110, 0.8)' }}>
                Agenda una llamada de 30 minutos para analizar tu situación actual y descubrir oportunidades de mejora
              </p>
              <a
                href="https://calendly.com/amagoiavd/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg px-5 py-3 rounded-pill fw-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #D96941)' }}
                onClick={() => {
                  trackConsultationBooking();
                  trackExternalLink('https://calendly.com/amagoiavd/30min');
                }}
              >
                Agendar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-5 contact-gradient">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-4 font-serif fw-bold text-gray mb-4 section-title">
              Conectemos y <span className="text-gold">Transformemos</span>
            </h2>
            <p className="fs-4 mb-4" style={{ color: 'rgba(110, 110, 110, 0.8)' }}>
              Tu mensaje merece ser escuchado... y comprado. Hablemos sobre cómo puedo ayudarte.
            </p>
            <div className="d-flex justify-content-center mb-4" data-aos="zoom-in">
              <img 
                src="/assets/amagoia petfil1.jpg" 
                alt="Amagoia Louvier Servicios" 
                className="rounded-circle border border-4"
                style={{ 
                  width: '200px', 
                  height: '200px', 
                  objectFit: 'cover',
                  borderColor: '#D4AF37 !important'
                }}
              />
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="card border-0 contact-form-card">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div className="contact-icon-wrapper mb-3">
                      <Mail className="text-gold" size={32} />
                    </div>
                    <h3 className="h4 fw-bold text-gray">Envíame un mensaje</h3>
                    {submitStatus === 'success' && (
                      <div className="alert alert-success mt-3" role="alert">
                        <strong>¡Mensaje enviado!</strong> Te contactaré pronto.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="alert alert-danger mt-3" role="alert">
                        <strong>Error:</strong> No se pudo enviar el mensaje. Inténtalo de nuevo.
                      </div>
                    )}
                  </div>
                  <form 
                    name="contact" 
                    method="POST" 
                    data-netlify="true" 
                    onSubmit={handleSubmit}
                    netlify-honeypot="bot-field"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <div style={{ display: 'none' }}>
                      <label>
                        Don't fill this out if you're human: <input name="bot-field" />
                      </label>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-gray fw-medium">
                        <Users size={16} className="me-2 text-gold" />
                        Nombre completo
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control form-control-lg contact-input"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-gray fw-medium">
                        <Mail size={16} className="me-2 text-gold" />
                        Email
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control form-control-lg contact-input"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-gray fw-medium">
                        <Phone size={16} className="me-2 text-gold" />
                        Teléfono
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control form-control-lg contact-input"
                        placeholder="+34 xxx xxxx xxx"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-gray fw-medium">
                        <MessageCircle size={16} className="me-2 text-gold" />
                        ¿En qué puedo ayudarte?
                      </label>
                      <textarea 
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-control form-control-lg contact-input"
                        placeholder="Cuéntame sobre tu negocio y objetivos de venta..."
                        style={{ resize: 'none' }}
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-gold btn-lg w-100 py-3 rounded-pill fw-semibold contact-submit-btn"
                    >
                      {isSubmitting ? 'Enviando...' : 'Transformar Mis Ventas Ahora'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="row g-4">
                <div className="col-12">
                  <div className="card border-0 contact-info-card">
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <div className="contact-icon-wrapper mb-3">
                          <Phone className="text-terracotta" size={32} />
                        </div>
                        <h3 className="h4 fw-bold text-gray">Información de contacto</h3>
                      </div>
                      <div className="contact-info-item mb-3">
                        <div className="contact-info-icon">
                          <Phone className="text-gold" size={24} />
                        </div>
                        <div>
                          <p className="fw-semibold text-gray mb-1">Teléfono</p>
                          <p className="mb-0" style={{ color: 'rgba(110, 110, 110, 0.7)' }}>627 985 178</p>
                        </div>
                      </div>
                      <div className="contact-info-item mb-3">
                        <div className="contact-info-icon">
                          <Mail className="text-terracotta" size={24} />
                        </div>
                        <div>
                          <p className="fw-semibold text-gray mb-1">Email</p>
                          <p className="mb-0" style={{ color: 'rgba(110, 110, 110, 0.7)' }}>amagoialr@gmail.com</p>
                        </div>
                      </div>
                      <div className="contact-info-item">
                        <div className="contact-info-icon">
                          <MapPin className="text-lavender" size={24} />
                        </div>
                        <div>
                          <p className="fw-semibold text-gray mb-1">Ubicación</p>
                          <p className="mb-0" style={{ color: 'rgba(110, 110, 110, 0.7)' }}>España en Remoto</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-0 contact-social-card">
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <div className="contact-icon-wrapper mb-3">
                          <Instagram className="text-lavender" size={32} />
                        </div>
                        <h3 className="h4 fw-bold text-gray">Sígueme en redes</h3>
                      </div>
                      <div className="d-flex gap-3 justify-content-center">
                        <a
                          href="https://www.instagram.com/amagoia_louvier/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon instagram-gradient text-white social-3d"
                          onClick={() => {
                            trackSocialClick('instagram');
                            trackExternalLink('https://www.instagram.com/amagoia_louvier/');
                          }}
                        >
                          <Instagram size={24} />
                        </a>
                        <a
                          href="https://www.facebook.com/people/Amagoia-Louvier/100009764285753/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon text-white social-3d"
                          style={{ backgroundColor: '#1877F2' }}
                          onClick={() => {
                            trackSocialClick('facebook');
                            trackExternalLink('https://www.facebook.com/people/Amagoia-Louvier/100009764285753/');
                          }}
                        >
                          <Facebook size={24} />
                        </a>
                        <a
                          href="mailto:amagoialr@gmail.com"
                          className="social-icon bg-terracotta text-white social-3d"
                          onClick={() => trackSocialClick('email')}
                        >
                          <Mail size={24} />
                        </a>
                        <a
                          href="https://www.linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon bg-gold text-white social-3d"
                          onClick={() => trackSocialClick('linkedin')}
                        >
                          <Linkedin size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray text-white py-5">
        <div className="container">
          <div className="text-center mb-4">
            <img 
              src="/assets/logo amagoia.jpg" 
              alt="Amagoia Louvier Logo" 
              className="rounded-circle mb-3"
              style={{ width: '80px', height: '80px', objectFit: 'cover', border: '2px solid #D4AF37' }}
            />
            <p className="fs-5 mb-4 fw-medium">
              "Conexiones auténticas. Resultados reales."
            </p>
            <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Transformando conversaciones en decisiones
            </p>
            
            <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
              <a
                href="https://www.instagram.com/amagoia_louvier/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram-gradient text-white"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/people/Amagoia-Louvier/100009764285753/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-white"
                style={{ backgroundColor: '#1877F2' }}
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:amagoialr@gmail.com"
                className="social-icon bg-terracotta text-white"
              >
                <Mail size={20} />
              </a>
              <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon text-white"
            style={{ backgroundColor: '#0077B5' }}
            onClick={() => {
              trackSocialClick('linkedin');
              trackExternalLink('https://www.linkedin.com/');
            }}
          >
            <Linkedin size={20} />
          </a>
            </div>
          </div>
          
          <div className="border-top pt-4 text-center" style={{ borderColor: 'rgba(255, 255, 255, 0.2) !important' }}>
            <div className="mb-3">
              <button
                onClick={() => openModal('Política de Privacidad', legalContent.privacyPolicy)}
                className="btn btn-link text-white-50 me-3"
                style={{ textDecoration: 'none' }}
              >
                Política de Privacidad
              </button>
              <button
                onClick={() => openModal('Aviso Legal', legalContent.legalNotice)}
                className="btn btn-link text-white-50 me-3"
                style={{ textDecoration: 'none' }}
              >
                Aviso Legal
              </button>
              <button
                onClick={() => openModal('Política de Cookies', legalContent.cookiesPolicy)}
                className="btn btn-link text-white-50"
                style={{ textDecoration: 'none' }}
              >
                Política de Cookies
              </button>
            </div>
            <p className="mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              © 2025 Amagoia Louvier. Todos los derechos reservados.
            </p>
            <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Hecho con <Heart size={16} className="text-danger mx-1" /> para transformar ventas
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <LegalModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        content={modalState.content}
      />
    </div>
  );
}

export default App;