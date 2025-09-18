import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  CheckCircle,
  ArrowRight,
  Calendar,
  MessageCircle,
  BarChart3,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import AOS from 'aos';
import CookieBanner from './components/CookieBanner';
import CookieConfigModal, { CookiePreferences } from './components/CookieConfigModal';
import LegalModal from './components/LegalModal';
import LeadCaptureModal from './components/LeadCaptureModal';
import { legalContent } from './data/legalContent';
import { 
  trackButtonClick, 
  trackWhatsAppClick, 
  trackSocialClick, 
  trackExternalLink,
  trackConsultationBooking 
} from './utils/analytics';

function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showCookieConfig, setShowCookieConfig] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState({ title: '', content: '' });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowCookieBanner(true);
    }

    // Show lead capture modal after 30 seconds
    const leadTimer = setTimeout(() => {
      setShowLeadModal(true);
    }, 30000);

    return () => clearTimeout(leadTimer);
  }, []);

  const handleCookieAccept = () => {
    // Enable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  const handleCookieReject = () => {
    // Keep analytics disabled
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  const handleCookieConfig = () => {
    setShowCookieConfig(true);
  };

  const handleCookiePreferences = (preferences: CookiePreferences) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied'
      });
    }
  };

  const openLegalModal = (title: string, content: string) => {
    setLegalModalContent({ title, content });
    setShowLegalModal(true);
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    trackExternalLink('https://wa.me/34672985178');
  };

  const handleCalendlyClick = () => {
    trackConsultationBooking();
    trackExternalLink('https://calendly.com/amagoiavd/30min');
  };

  const handleInstagramClick = () => {
    trackSocialClick('instagram');
    trackExternalLink('https://www.instagram.com/amagoiavd/');
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#inicio">
            <img 
              src="/assets/logo amagoia.jpg" 
              alt="Amagoia Louvier Logo" 
              style={{ height: '50px', width: '50px', objectFit: 'cover' }}
              className="rounded-circle me-3"
            />
            <div>
              <span className="fw-bold text-gray font-serif" style={{ fontSize: '1.2rem' }}>
                Amagoia Louvier
              </span>
              <div className="text-gold" style={{ fontSize: '0.8rem', lineHeight: '1' }}>
                Closer de Ventas
              </div>
            </div>
          </a>
          
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link fw-semibold text-gray" href="#inicio">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold text-gray" href="#sobre-mi">Sobre Mí</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold text-gray" href="#beneficios">Beneficios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold text-gray" href="#servicios">Servicios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold text-gray" href="#contacto">Contacto</a>
              </li>
              <li className="nav-item ms-2">
                <button 
                  className="btn btn-gold rounded-pill px-4 fw-semibold"
                  onClick={() => setShowLeadModal(true)}
                >
                  Consulta Gratis
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="hero-gradient min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h1 className="hero-title font-serif fw-bold text-gray mb-4">
                Transformo <span className="text-gold">conversaciones</span> en <span className="text-terracotta">decisiones</span>
              </h1>
              <p className="lead text-gray mb-4" style={{ lineHeight: '1.8' }}>
                Especialista en <strong className="text-lavender">closing de ventas de alto ticket digital</strong> con más de 8 años de experiencia. 
                Incremento las conversiones hasta un <strong className="text-gold">35%</strong> con técnicas probadas y personalizadas para tu audiencia.
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-5">
                <button 
                  className="btn btn-gold btn-lg rounded-pill px-5 fw-bold"
                  onClick={() => setShowLeadModal(true)}
                >
                  <Calendar className="me-2" size={20} />
                  Consulta Gratuita
                </button>
                <a 
                  href="https://wa.me/34672985178" 
                  className="btn btn-terracotta btn-lg rounded-pill px-5 fw-bold"
                  onClick={handleWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="me-2" size={20} />
                  WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="stats-container">
                <div className="row g-4">
                  <div className="col-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="stat-item text-center">
                      <div className="h2 fw-bold text-gold mb-1">8+</div>
                      <div className="small text-gray">Años de Experiencia</div>
                    </div>
                  </div>
                  <div className="col-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="stat-item text-center">
                      <div className="h2 fw-bold text-terracotta mb-1">35%</div>
                      <div className="small text-gray">Incremento Conversiones</div>
                    </div>
                  </div>
                  <div className="col-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="stat-item text-center">
                      <div className="h2 fw-bold text-lavender mb-1">500+</div>
                      <div className="small text-gray">Clientes Satisfechos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6" data-aos="fade-left">
              <div className="text-center">
                <img 
                  src="/assets/amagoia petfil1.jpg" 
                  alt="Amagoia Louvier - Especialista en Closing de Ventas" 
                  className="profile-image img-fluid"
                  style={{ maxWidth: '400px', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <img 
                src="/assets/amagoia poerfil2.jpg" 
                alt="Amagoia Louvier Perfil" 
                className="profile-image img-fluid mb-4"
              />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <h2 className="section-title font-serif fw-bold text-gray mb-4">
                Sobre <span className="text-gold">Mí</span>
              </h2>
              <p className="text-gray mb-4" style={{ lineHeight: '1.8' }}>
                Soy <strong className="text-terracotta">Amagoia Louvier</strong>, especialista en closing de ventas de alto ticket digital 
                con más de 8 años transformando conversaciones en decisiones de compra.
              </p>
              <p className="text-gray mb-4" style={{ lineHeight: '1.8' }}>
                Mi enfoque se basa en técnicas psicológicas avanzadas y estrategias personalizadas que han ayudado 
                a más de 500 empresas a incrementar sus conversiones hasta un <strong className="text-gold">35%</strong>.
              </p>
              
              <div className="row g-3 mb-4">
                <div className="col-sm-6">
                  <div className="achievement-badge text-center p-3">
                    <Award className="text-white mb-2" size={32} />
                    <div className="fw-bold text-white">Certificada</div>
                    <div className="small text-white opacity-75">Closing Avanzado</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="achievement-badge text-center p-3">
                    <Target className="text-white mb-2" size={32} />
                    <div className="fw-bold text-white">Especialista</div>
                    <div className="small text-white opacity-75">Alto Ticket</div>
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-gold rounded-pill px-4 fw-semibold"
                onClick={() => setShowLeadModal(true)}
              >
                Trabajemos Juntos
                <ArrowRight className="ms-2" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="benefits-gradient py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="section-title font-serif fw-bold text-gray mb-3">
              ¿Por qué necesitas un <span className="text-gold">Closer</span>?
            </h2>
            <p className="lead text-gray">
              Transforma tu proceso de ventas con técnicas probadas que generan resultados inmediatos
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="modern-card h-100 p-4 text-center">
                <div className="modern-icon-circle bg-gold text-white mb-3">
                  <TrendingUp size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Incrementa Conversiones</h4>
                <p className="text-gray mb-0">
                  Aumenta tus ventas hasta un 35% con técnicas de closing probadas y personalizadas para tu audiencia específica.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="modern-card h-100 p-4 text-center">
                <div className="modern-icon-circle bg-terracotta text-white mb-3">
                  <Clock size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Reduce Tiempo de Cierre</h4>
                <p className="text-gray mb-0">
                  Acorta el ciclo de ventas identificando y superando objeciones de manera eficiente y estratégica.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="modern-card h-100 p-4 text-center">
                <div className="modern-icon-circle bg-lavender text-white mb-3">
                  <Users size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Mejora Experiencia Cliente</h4>
                <p className="text-gray mb-0">
                  Crea conexiones auténticas que generan confianza y facilitan la toma de decisiones de compra.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="modern-card h-100 p-4 text-center">
                <div className="modern-icon-circle bg-gold text-white mb-3">
                  <BarChart3 size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Maximiza ROI</h4>
                <p className="text-gray mb-0">
                  Optimiza cada interacción para obtener el máximo retorno de inversión en tus campañas de marketing.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
              <div className="modern-card h-100 p-4 text-center">
                <div className="modern-icon-circle bg-terracotta text-white mb-3">
                  <Shield size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Estrategias Probadas</h4>
                <p className="text-gray mb-0">
                  Implementa técnicas respaldadas por 8+ años de experiencia y más de 500 casos de éxito.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
              <div className="modern-card h-100 p-4 text-center">
                <div className="modern-icon-circle bg-lavender text-white mb-3">
                  <Zap size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Resultados Inmediatos</h4>
                <p className="text-gray mb-0">
                  Ve mejoras en tus conversiones desde la primera semana de implementación de las estrategias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="section-title font-serif fw-bold text-gray mb-3">
              Mis <span className="text-terracotta">Servicios</span>
            </h2>
            <p className="lead text-gray">
              Soluciones personalizadas para maximizar tus conversiones de alto ticket
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="service-card card-hover h-100 p-4 bg-white shadow-sm">
                <div className="service-icon-circle bg-gold text-white mb-4">
                  <Target size={28} />
                </div>
                <h3 className="h4 fw-bold text-gray mb-3">Closing de Alto Ticket</h3>
                <p className="text-gray mb-4">
                  Especialización en cierre de ventas de productos y servicios de alto valor, 
                  utilizando técnicas psicológicas avanzadas para maximizar conversiones.
                </p>
                <div className="service-features mb-4">
                  <div className="feature-item">• Análisis de audiencia objetivo</div>
                  <div className="feature-item">• Técnicas de persuasión avanzada</div>
                  <div className="feature-item">• Manejo de objeciones complejas</div>
                  <div className="feature-item">• Seguimiento post-venta</div>
                </div>
                <div className="text-center">
                  <button 
                    className="btn btn-gold rounded-pill px-4 fw-semibold"
                    onClick={() => setShowLeadModal(true)}
                  >
                    Más Información
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="service-card card-hover h-100 p-4 bg-white shadow-sm">
                <div className="service-icon-circle bg-terracotta text-white mb-4">
                  <BarChart3 size={28} />
                </div>
                <h3 className="h4 fw-bold text-gray mb-3">Consultoría en Ventas</h3>
                <p className="text-gray mb-4">
                  Análisis completo de tu proceso de ventas actual y optimización 
                  estratégica para incrementar conversiones y reducir tiempos de cierre.
                </p>
                <div className="service-features mb-4">
                  <div className="feature-item">• Auditoría de proceso actual</div>
                  <div className="feature-item">• Identificación de puntos débiles</div>
                  <div className="feature-item">• Plan de optimización</div>
                  <div className="feature-item">• Implementación guiada</div>
                </div>
                <div className="text-center">
                  <button 
                    className="btn btn-terracotta rounded-pill px-4 fw-semibold text-white"
                    onClick={() => setShowLeadModal(true)}
                  >
                    Más Información
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="service-card card-hover h-100 p-4 bg-white shadow-sm">
                <div className="service-icon-circle bg-lavender text-white mb-4">
                  <Users size={28} />
                </div>
                <h3 className="h4 fw-bold text-gray mb-3">Entrenamiento de Equipos</h3>
                <p className="text-gray mb-4">
                  Formación especializada para equipos de ventas en técnicas de closing, 
                  manejo de objeciones y psicología del consumidor de alto ticket.
                </p>
                <div className="service-features mb-4">
                  <div className="feature-item">• Workshops personalizados</div>
                  <div className="feature-item">• Role-playing avanzado</div>
                  <div className="feature-item">• Optimización de scripts</div>
                  <div className="feature-item">• Estrategias personalizadas</div>
                </div>
                <div className="text-center">
                  <button 
                    className="btn btn-lavender rounded-pill px-4 fw-semibold text-white"
                    onClick={() => setShowLeadModal(true)}
                  >
                    Más Información
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="consultation-box mt-5" data-aos="fade-up">
            <div className="text-center">
              <h3 className="h4 fw-bold text-gray mb-3">
                ¿Listo para transformar tus ventas?
              </h3>
              <p className="text-gray mb-4">
                Agenda una consulta gratuita de 30 minutos y descubre cómo puedo ayudarte 
                a incrementar tus conversiones de alto ticket.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button 
                  className="btn btn-gold btn-lg rounded-pill px-5 fw-bold"
                  onClick={() => setShowLeadModal(true)}
                >
                  <Calendar className="me-2" size={20} />
                  Consulta Gratuita
                </button>
                <a 
                  href="https://calendly.com/amagoiavd/30min" 
                  className="btn btn-terracotta btn-lg rounded-pill px-5 fw-bold"
                  onClick={handleCalendlyClick}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Clock className="me-2" size={20} />
                  Calendly Directo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="contact-gradient py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="section-title font-serif fw-bold text-gray mb-3">
              Hablemos de tu <span className="text-gold">Proyecto</span>
            </h2>
            <p className="lead text-gray">
              Estoy aquí para ayudarte a transformar tus conversaciones en decisiones de compra
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="contact-info-card p-4 h-100">
                <div className="contact-icon-wrapper mb-3">
                  <Phone className="text-gold" size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Teléfono</h4>
                <div className="contact-info-item mb-3">
                  <div className="contact-info-icon">
                    <Phone className="text-terracotta" size={20} />
                  </div>
                  <div>
                    <div className="fw-semibold text-gray">Llamada Directa</div>
                    <a href="tel:+34672985178" className="text-decoration-none text-gray">
                      +34 672 985 178
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MessageCircle className="text-gold" size={20} />
                  </div>
                  <div>
                    <div className="fw-semibold text-gray">WhatsApp</div>
                    <a 
                      href="https://wa.me/34672985178" 
                      className="text-decoration-none text-gray"
                      onClick={handleWhatsAppClick}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mensaje directo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="contact-info-card p-4 h-100">
                <div className="contact-icon-wrapper mb-3">
                  <Mail className="text-terracotta" size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Email</h4>
                <div className="contact-info-item mb-3">
                  <div className="contact-info-icon">
                    <Mail className="text-lavender" size={20} />
                  </div>
                  <div>
                    <div className="fw-semibold text-gray">Contacto Profesional</div>
                    <a href="mailto:amagoialr@gmail.com" className="text-decoration-none text-gray">
                      amagoialr@gmail.com
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Calendar className="text-gold" size={20} />
                  </div>
                  <div>
                    <div className="fw-semibold text-gray">Agenda una Cita</div>
                    <a 
                      href="https://calendly.com/amagoiavd/30min" 
                      className="text-decoration-none text-gray"
                      onClick={handleCalendlyClick}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Calendly
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="contact-social-card p-4 h-100">
                <div className="contact-icon-wrapper mb-3">
                  <Users className="text-lavender" size={24} />
                </div>
                <h4 className="h5 fw-bold text-gray mb-3">Redes Sociales</h4>
                <div className="contact-info-item mb-3">
                  <div className="contact-info-icon">
                    <MessageCircle className="text-terracotta" size={20} />
                  </div>
                  <div>
                    <div className="fw-semibold text-gray">Instagram</div>
                    <a 
                      href="https://www.instagram.com/amagoiavd/" 
                      className="text-decoration-none text-gray"
                      onClick={handleInstagramClick}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @amagoiavd
                    </a>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <a 
                    href="https://www.instagram.com/amagoiavd/" 
                    className="social-icon social-3d instagram-gradient text-white"
                    onClick={handleInstagramClick}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3 mb-md-0">
                <img 
                  src="/assets/logo amagoia.jpg" 
                  alt="Amagoia Louvier Logo" 
                  style={{ height: '40px', width: '40px', objectFit: 'cover' }}
                  className="rounded-circle me-3"
                />
                <div>
                  <div className="fw-bold">Amagoia Louvier</div>
                  <div className="small opacity-75">Especialista en Closing de Ventas</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end justify-content-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => openLegalModal('Política de Privacidad', legalContent.privacyPolicy)}
                  className="btn btn-link text-white-50 p-0 small"
                  style={{ textDecoration: 'none' }}
                >
                  Privacidad
                </button>
                <button
                  type="button"
                  onClick={() => openLegalModal('Aviso Legal', legalContent.legalNotice)}
                  className="btn btn-link text-white-50 p-0 small"
                  style={{ textDecoration: 'none' }}
                >
                  Legal
                </button>
                <button
                  type="button"
                  onClick={() => openLegalModal('Política de Cookies', legalContent.cookiesPolicy)}
                  className="btn btn-link text-white-50 p-0 small"
                  style={{ textDecoration: 'none' }}
                >
                  Cookies
                </button>
              </div>
            </div>
          </div>
          <hr className="my-3 opacity-25" />
          <div className="text-center">
            <p className="mb-0 small opacity-75">
              © 2024 Amagoia Louvier. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a 
        href="https://wa.me/34672985178" 
        className="whatsapp-float"
        onClick={handleWhatsAppClick}
        target="_blank"
        rel="noopener noreferrer"
        title="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Modals */}
      <CookieBanner 
        onAccept={handleCookieAccept}
        onReject={handleCookieReject}
        onConfigure={handleCookieConfig}
      />

      <CookieConfigModal 
        isOpen={showCookieConfig}
        onClose={() => setShowCookieConfig(false)}
        onSave={handleCookiePreferences}
      />

      <LegalModal 
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
        title={legalModalContent.title}
        content={legalModalContent.content}
      />

      <LeadCaptureModal 
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onOpenLegal={openLegalModal}
        legalContent={legalContent}
      />
    </div>
  );
}

export default App;