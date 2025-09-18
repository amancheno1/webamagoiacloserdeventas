import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { trackPageView } from './utils/analytics';
import CookieBanner from './components/CookieBanner';
import CookieConfigModal, { CookiePreferences } from './components/CookieConfigModal';
import LeadCaptureModal from './components/LeadCaptureModal';
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
  const [showCookieConfig, setShowCookieConfig] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

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

  const handleCookieAccept = () => {
    // Show lead capture modal 6 seconds after accepting cookies
    setTimeout(() => {
      setShowLeadCapture(true);
    }, 6000);
    
    // Enable all analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  const handleCookieReject = () => {
    // Show lead capture modal 6 seconds after rejecting cookies
    setTimeout(() => {
      setShowLeadCapture(true);
    }, 6000);
    
    // Disable optional analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  const handleCookieConfigure = () => {
    // Show lead capture modal 6 seconds after configuring cookies
    setTimeout(() => {
      setShowLeadCapture(true);
    }, 6000);
    setShowCookieConfig(true);
  };

  const handleCookiePreferencesSave = (preferences: CookiePreferences) => {
    // Apply preferences to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied'
      });
    }
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
Enviado desde el formulario de contacto de amagoialouviercloserventasdigital.es
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
              alt="Amagoia Louvier Closer de Ventas - Logo" 
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
                onClick={() => {
                  trackButtonClick('hero_transform_sales');
                  scrollToSection('contacto');
                }}
                className="btn btn-gold btn-lg px-4 py-3 rounded-pill fw-semibold"
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
                <strong className="text-terracotta">¿Qué es un Closer de Ventas?</strong> <br /> 
                Un closer es el especialista que se encarga de la fase final y más crítica del proceso de ventas: convertir leads cualificados en clientes que toman la decisión de compra. Mientras tú te enfocas en crear contenido y generar leads, yo me especializo en las conversaciones de cierre, manejando objeciones, convirtiendo las necesidades del cliente en oportunidades de crecimiento para su negocio.
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
                  alt="Amagoia Louvier Closer de Ventas - Especialista en ventas de alto ticket digital" 
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
                      <p className="mb-0 text-white-50">Cierre Lanzamiento High Ticket</p>
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
                      <h4 className="h4 fw-bold mb-2 text-gray">Closing de Alto Ticket</h4>
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
                      <h4 className="h4 fw-bold mb-2 text-gray">Consultoría en Ventas</h4>
                      <p className="text-gray mb-3" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        Análisis y optimización completa de tus procesos de venta actuales.
                      </p>
                    </div>
                  </div>
                  <div className="service-features">
                    <div className="feature-item">• Auditoría de procesos</div>
                    <div className="feature-item">• Optimización de scripts</div>
                    <div className="feature-item">• Estrategias personalizadas</div>
                    <div className="feature-item">• Formación del equipo</div>
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
                      <h4 className="h4 fw-bold mb-2 text-gray">Análisis de Conversión</h4>
                      <p className="text-gray mb-3" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        Evaluación detallada de tus métricas y optimización de embudos de venta.
                      </p>
                    </div>
                  </div>
                  <div className="service-features">
                    <div className="feature-item">• Análisis de métricas</div>
                    <div className="feature-item">• Optimización de embudos</div>
                    <div className="feature-item">• Reportes detallados</div>
                    <div className="feature-item">• Recomendaciones estratégicas</div>
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
                      <h4 className="h4 fw-bold mb-2 text-gray">Formación Personalizada</h4>
                      <p className="text-gray mb-3" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        Capacitación especializada en técnicas de closing y ventas conscientes.
                      </p>
                    </div>
                  </div>
                  <div className="service-features">
                    <div className="feature-item">• Workshops personalizados</div>
                    <div className="feature-item">• Técnicas de closing</div>
                    <div className="feature-item">• Práctica supervisada</div>
                    <div className="feature-item">• Seguimiento continuo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-5 contact-gradient">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-4 font-serif fw-bold text-white mb-4 section-title">
              ¿Listo para <span className="text-gold">transformar</span> tus ventas?
            </h2>
            <p className="fs-4 mb-0 text-white-75">
              Conectemos y descubre cómo puedo ayudarte a alcanzar tus objetivos
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row g-4 mb-5">
                <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="200">
                  <div className="contact-item">
                    <div className="contact-icon-circle bg-gold mx-auto mb-3">
                      <Phone size={24} className="text-white" />
                    </div>
                    <h4 className="h5 fw-bold text-white mb-2">Teléfono</h4>
                    <a href="tel:+34627985178" className="text-white-75 text-decoration-none">
                      +34 627 985 178
                    </a>
                  </div>
                </div>
                <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="400">
                  <div className="contact-item">
                    <div className="contact-icon-circle bg-terracotta mx-auto mb-3">
                      <Mail size={24} className="text-white" />
                    </div>
                    <h4 className="h5 fw-bold text-white mb-2">Email</h4>
                    <a href="mailto:amagoialr@gmail.com" className="text-white-75 text-decoration-none">
                      amagoialr@gmail.com
                    </a>
                  </div>
                </div>
                <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="600">
                  <div className="contact-item">
                    <div className="contact-icon-circle bg-lavender mx-auto mb-3">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <h4 className="h5 fw-bold text-white mb-2">Ubicación</h4>
                    <p className="text-white-75 mb-0">España</p>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-lg" data-aos="fade-up" data-aos-delay="800">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-4 text-center mb-4 mb-md-0">
                      <img 
                        src="/assets/amagoia poerfil2.jpg" 
                        alt="Amagoia Louvier Closer de Ventas - Contacto y servicios de closing" 
                        className="rounded-circle shadow-lg"
                        style={{ width: '200px', height: '200px', objectFit: 'cover', border: '4px solid #D4AF37' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <h3 className="h4 fw-bold text-gray mb-3">Hablemos de tu proyecto</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="form-control form-control-lg"
                              placeholder="Tu nombre"
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="form-control form-control-lg"
                              placeholder="Tu email"
                              required
                            />
                          </div>
                          <div className="col-12">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="form-control form-control-lg"
                              placeholder="Tu teléfono (opcional)"
                            />
                          </div>
                          <div className="col-12">
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              className="form-control form-control-lg"
                              rows={4}
                              placeholder="Cuéntame sobre tu proyecto y objetivos..."
                              required
                            ></textarea>
                          </div>
                          <div className="col-12">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn btn-gold btn-lg w-100 fw-semibold"
                              onClick={() => trackButtonClick('contact_form_submit')}
                            >
                              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                          </div>
                        </div>
                      </form>
                      
                      {submitStatus === 'success' && (
                        <div className="alert alert-success mt-3" role="alert">
                          ¡Mensaje enviado! Te contactaré pronto.
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="alert alert-danger mt-3" role="alert">
                          Error al enviar el mensaje. Inténtalo de nuevo.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-gray text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <img 
                  src="/assets/logo amagoia.jpg" 
                  alt="Closer de Ventas - Logo Amagoia Louvier" 
                  className="rounded-circle me-3"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <div>
                  <h5 className="mb-0 font-serif">Amagoia Louvier</h5>
                  <p className="small mb-0 text-white-75">Closer de Ventas</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <div className="d-flex justify-content-md-end gap-3">
                <a 
                  href="https://www.instagram.com/amagoialouvier/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white-75 hover-gold"
                  onClick={() => trackSocialClick('instagram')}
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://www.facebook.com/amagoia.louvier" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white-75 hover-gold"
                  onClick={() => trackSocialClick('facebook')}
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/amagoia-louvier/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white-75 hover-gold"
                  onClick={() => trackSocialClick('linkedin')}
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          <hr className="my-3 border-white-25" />
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="small mb-0 text-white-75">
                © 2024 Amagoia Louvier. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-6 text-md-end mt-2 mt-md-0">
              <div className="d-flex justify-content-md-end gap-3">
                <button
                  onClick={() => openModal('Política de Privacidad', legalContent.privacyPolicy)}
                  className="btn btn-link text-white-75 p-0 small text-decoration-none hover-gold"
                >
                  Privacidad
                </button>
                <button
                  onClick={() => openModal('Aviso Legal', legalContent.legalNotice)}
                  className="btn btn-link text-white-75 p-0 small text-decoration-none hover-gold"
                >
                  Legal
                </button>
                <button
                  onClick={() => openModal('Política de Cookies', legalContent.cookiesPolicy)}
                  className="btn btn-link text-white-75 p-0 small text-decoration-none hover-gold"
                >
                  Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LegalModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        content={modalState.content}
      />

      <CookieBanner
        onAccept={handleCookieAccept}
        onReject={handleCookieReject}
        onConfigure={handleCookieConfigure}
      />

      <CookieConfigModal
        isOpen={showCookieConfig}
        onClose={() => setShowCookieConfig(false)}
        onSave={handleCookiePreferencesSave}
      />

      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        onOpenLegal={openModal}
        legalContent={legalContent}
      />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Amagoia Louvier",
            "jobTitle": "Closer de Ventas",
            "description": "Especialista en closing de ventas de alto ticket digital con más de 15 años de experiencia. Transformo conversaciones en decisiones, creando conexiones auténticas que generan resultados extraordinarios.",
            "url": "https://amagoialouviercloserventasdigital.es",
            "image": "https://amagoialouviercloserventasdigital.es/assets/amagoia%20poerfil2.jpg",
            "email": "amagoialr@gmail.com",
            "telephone": "+34627985178",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "ES"
            },
            "sameAs": [
              "https://www.instagram.com/amagoialouvier/",
              "https://www.facebook.com/amagoia.louvier",
              "https://www.linkedin.com/in/amagoia-louvier/"
            ],
            "knowsAbout": [
              "Closing de ventas",
              "Ventas de alto ticket",
              "Consultoría en ventas",
              "Psicología de ventas",
              "Marketing digital",
              "Conversión de leads"
            ],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "15+ años de experiencia en ventas"
              }
            ],
            "award": [
              "35% de cierre promedio en Evergreen VSL",
              "80% de cierre en lanzamientos High Ticket",
              "35% de aumento en ventas para clientes"
            ],
            "offers": [
              {
                "@type": "Service",
                "name": "Closing de Alto Ticket",
                "description": "Manejo completo de llamadas de cierre para productos y servicios de alto valor",
                "provider": {
                  "@type": "Person",
                  "name": "Amagoia Louvier"
                }
              },
              {
                "@type": "Service",
                "name": "Consultoría en Ventas",
                "description": "Análisis y optimización completa de procesos de venta actuales",
                "provider": {
                  "@type": "Person",
                  "name": "Amagoia Louvier"
                }
              },
              {
                "@type": "Service",
                "name": "Análisis de Conversión",
                "description": "Evaluación detallada de métricas y optimización de embudos de venta",
                "provider": {
                  "@type": "Person",
                  "name": "Amagoia Louvier"
                }
              },
              {
                "@type": "Service",
                "name": "Formación Personalizada",
                "description": "Capacitación especializada en técnicas de closing y ventas conscientes",
                "provider": {
                  "@type": "Person",
                  "name": "Amagoia Louvier"
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}

export default App;