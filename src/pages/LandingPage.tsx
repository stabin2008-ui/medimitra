import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { 
  Bell, 
  ShieldCheck, 
  Layers, 
  ArrowDown, 
  UserCheck, 
  AlertCircle, 
  Lock, 
  Heart, 
  Phone, 
  Mail, 
  X,
  CheckCircle2,
  Globe,
  PhoneCall,
  Menu
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    setCurrentPage, 
    language, 
    setLanguage, 
    setIsEmergencyModalOpen,
    t 
  } = useApp();
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Header Navigation */}
      <header
        style={{
          borderBottom: '1px solid #F1F5F9',
          backgroundColor: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="landing-header-inner"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer', flexShrink: 0 }}>
            <Logo variant="navy" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#334155',
            }}
            className="landing-desktop-nav"
          >
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: '#0D9488', fontWeight: 600 }}>
              {t('home', 'Home')}
            </button>
            <button onClick={() => scrollToSection('features')} style={{ color: '#475569' }}>
              {t('features', 'Features')}
            </button>
            <button onClick={() => scrollToSection('how-it-works')} style={{ color: '#475569' }}>
              {t('howItWorks', 'How It Works')}
            </button>
            <button onClick={() => scrollToSection('safety')} style={{ color: '#475569' }}>
              {t('safety', 'Safety')}
            </button>
            <button onClick={() => scrollToSection('contact')} style={{ color: '#475569' }}>
              {t('contact', 'Contact')}
            </button>
          </nav>

          {/* Action Controls & Responsive Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Emergency Button (Issue 5) */}
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '18px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                fontWeight: 700,
                fontSize: '12px',
              }}
              aria-label="Emergency 112 / 100"
            >
              <PhoneCall size={13} />
              <span className="emergency-label">{t('emergencyHelpButton', 'Emergency 112')}</span>
            </button>

            {/* Language Selector (Issue 1) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '18px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#102A43',
                fontWeight: 600,
                fontSize: '12px',
              }}
              aria-label="Toggle language"
            >
              <Globe size={13} color="#0D9488" />
              <span>{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>

            {/* Sign In & Get Started (Desktop) */}
            <div className="landing-desktop-auth" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setCurrentPage('login')}
                className="btn-outline"
                style={{ padding: '7px 14px', fontSize: '13px' }}
              >
                {t('signIn', 'Sign In')}
              </button>
              <button
                onClick={() => setCurrentPage('signup')}
                className="btn-teal"
                style={{ padding: '7px 16px', fontSize: '13px' }}
              >
                {t('getStarted', 'Get Started')}
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="landing-mobile-menu-btn"
              style={{
                padding: '7px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#102A43',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            }}
          >
            <button onClick={() => scrollToSection('features')} style={{ textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#334155', padding: '6px 0' }}>
              {t('features', 'Features')}
            </button>
            <button onClick={() => scrollToSection('how-it-works')} style={{ textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#334155', padding: '6px 0' }}>
              {t('howItWorks', 'How It Works')}
            </button>
            <button onClick={() => scrollToSection('safety')} style={{ textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#334155', padding: '6px 0' }}>
              {t('safety', 'Safety')}
            </button>
            <button onClick={() => scrollToSection('contact')} style={{ textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#334155', padding: '6px 0' }}>
              {t('contact', 'Contact')}
            </button>
            <div style={{ display: 'flex', gap: '10px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
              <button
                onClick={() => setCurrentPage('login')}
                className="btn-outline"
                style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
              >
                {t('signIn', 'Sign In')}
              </button>
              <button
                onClick={() => setCurrentPage('signup')}
                className="btn-teal"
                style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
              >
                {t('getStarted', 'Get Started')}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Hero Section */}
      <main 
        className="landing-main"
        style={{ 
          flex: 1, 
          padding: '48px 24px 60px 24px', 
          maxWidth: '1280px', 
          margin: '0 auto', 
          width: '100%', 
          boxSizing: 'border-box' 
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1.15fr) minmax(280px, 1fr)',
            alignItems: 'center',
            gap: '40px',
            marginBottom: '64px',
          }}
        >
          {/* Left Column: Heading, description, CTA */}
          <div style={{ maxWidth: '100%' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '20px',
                backgroundColor: '#F0FDFA',
                border: '1px solid #CCFBF1',
                fontSize: '12px',
                fontWeight: 600,
                color: '#0D9488',
                marginBottom: '16px',
                maxWidth: '100%',
                flexWrap: 'wrap',
              }}
            >
              <Heart size={14} /> <span>{t('heroBadge', 'Smart Healthcare & Caregiver Support')}</span>
            </div>

            <h1
              className="hero-heading"
              style={{
                fontSize: 'clamp(28px, 4.5vw, 44px)',
                fontWeight: 800,
                color: '#102A43',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                marginBottom: '10px',
                wordBreak: 'break-word',
              }}
            >
              {t('heroHeadingLine1', 'Better medicine routines.')}
              <span style={{ display: 'block', color: '#0D9488', marginTop: '6px' }}>
                {t('heroHeadingLine2', 'Stronger care connections.')}
              </span>
            </h1>

            <p
              style={{
                fontSize: '15.5px',
                lineHeight: 1.6,
                color: '#475569',
                marginTop: '16px',
                marginBottom: '28px',
                maxWidth: '520px',
              }}
            >
              {t('heroDescription', 'MediMitra CareLoop helps seniors take medicines on time with smart reminders and keeps loved ones informed, every step of the way.')}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentPage('signup')}
                className="btn-teal"
                style={{ padding: '12px 26px', fontSize: '14.5px' }}
              >
                {t('startFreeCareLoop', 'Start Free CareLoop')}
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="btn-outline"
                style={{ padding: '12px 22px', fontSize: '14.5px' }}
              >
                {t('exploreFeatures', 'Explore Features')}
              </button>
            </div>
          </div>

          {/* Right Column: Healthcare Illustration & Vertical Flow */}
          <div
            className="hero-right-col"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              maxWidth: '100%',
            }}
          >
            {/* Illustration Card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(16,42,67,0.06)',
                maxWidth: '360px',
                width: '100%',
                flex: '1 1 260px',
              }}
            >
              <img
                src="/assets/hero_illustration.jpg"
                alt="Older adult grandfather and caring daughter using MediMitra CareLoop"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>

            {/* Vertical Flow Diagram matching the reference */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#FFFFFF',
                padding: '16px 14px',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 15px rgba(16,42,67,0.04)',
                minWidth: '105px',
                flexShrink: 0,
              }}
            >
              {/* Step 1: Reminder */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#E0F2FE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0284C7',
                  }}
                >
                  <Bell size={18} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>
                  {t('stepReminderTitle', 'Reminder')}
                </span>
              </div>

              <div style={{ color: '#94A3B8' }}>
                <ArrowDown size={14} />
              </div>

              {/* Step 2: Confirmed */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#DCFCE7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16A34A',
                  }}
                >
                  <UserCheck size={18} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>
                  {t('stepConfirmTitle', 'Confirmed')}
                </span>
              </div>

              <div style={{ color: '#94A3B8' }}>
                <ArrowDown size={14} />
              </div>

              {/* Step 3: Caregiver Alert */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D97706',
                  }}
                >
                  <AlertCircle size={18} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155', maxWidth: '65px', lineHeight: 1.2 }}>
                  {t('stepAlertTitle', 'Caregiver Alert')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Feature Cards */}
        <section
          id="features"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          {/* Card 1: Smart Reminders */}
          <div
            className="card-white"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => setCurrentPage('reminder')}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
                flexShrink: 0,
              }}
            >
              <Bell size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>
                {t('feature1Title', 'Smart Reminders')}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                {t('feature1Desc', 'Timely medicine alerts with easy actions.')}
              </p>
            </div>
          </div>

          {/* Card 2: CareLoop Alerts */}
          <div
            className="card-white"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => setCurrentPage('caregiver')}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#F0FDFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0D9488',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>
                {t('feature2Title', 'CareLoop Alerts')}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                {t('feature2Desc', 'Caregivers are notified if reminders are missed.')}
              </p>
            </div>
          </div>

          {/* Card 3: Refill Tracking */}
          <div
            className="card-white"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => setCurrentPage('stock')}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7',
                flexShrink: 0,
              }}
            >
              <Layers size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>
                {t('feature3Title', 'Refill Tracking')}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                {t('feature3Desc', 'Track medicine stock and get refill alerts.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section: How It Works */}
        <section id="how-it-works" style={{ marginBottom: '64px', borderTop: '1px solid #F1F5F9', paddingTop: '48px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#102A43' }}>
              {t('howItWorks', 'How CareLoop Works')}
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B', marginTop: '6px' }}>
              Designed with elderly patients and caring families at the heart of every interaction.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div className="card-white" style={{ padding: '24px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0D9488', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '14px' }}>1</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>Schedule Prescriptions</h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                Add doctor-prescribed routines with customizable times, meal associations, and stock counts.
              </p>
            </div>

            <div className="card-white" style={{ padding: '24px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0D9488', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '14px' }}>2</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>Confirm In One Tap</h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                When reminder fires, tap 'Taken', 'Remind Me Later', or 'Need Help' with oversized touch targets.
              </p>
            </div>

            <div className="card-white" style={{ padding: '24px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0D9488', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '14px' }}>3</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>Caregiver Alert Loop</h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                Loved ones check the live dashboard or receive emergency help alerts when assistance is requested.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Safety & Privacy */}
        <section id="safety" style={{ marginBottom: '64px', borderTop: '1px solid #F1F5F9', paddingTop: '48px' }}>
          <div 
            className="safety-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '32px', 
              alignItems: 'center' 
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0D9488', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                <Lock size={15} /> Healthcare Safety First
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#102A43', lineHeight: 1.25, marginBottom: '12px' }}>
                Patient Consent & Medical Data Protection
              </h2>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                MediMitra CareLoop never automatically changes medication dosages, diagnoses conditions, or orders medications automatically.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="card-white" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '13.5px', color: '#102A43', fontWeight: 600 }}>Consent-based caregiver linking authorized by patients</span>
              </div>
              <div className="card-white" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '13.5px', color: '#102A43', fontWeight: 600 }}>Zero automated pharmaceutical ordering or dispensing</span>
              </div>
              <div className="card-white" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '13.5px', color: '#102A43', fontWeight: 600 }}>Clear estimates for stock run-out dates based on user daily intake</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Contact */}
        <section id="contact" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '48px', marginBottom: '32px' }}>
          <div className="card-white" style={{ padding: '28px', backgroundColor: '#F0FDFA', borderColor: '#CCFBF1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#102A43' }}>Have questions about CareLoop?</h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
                Our healthcare support and engineering team is available 24/7.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveModal('contact')}
                className="btn-teal"
                style={{ padding: '9px 18px', fontSize: '13.5px' }}
              >
                Contact Support
              </button>
              <button
                onClick={() => setCurrentPage('signup')}
                className="btn-outline"
                style={{ padding: '9px 18px', fontSize: '13.5px' }}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Dark Navy Footer */}
      <footer
        style={{
          backgroundColor: '#102A43',
          color: '#FFFFFF',
          padding: '28px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Logo variant="white" size="md" />
          <span style={{ fontSize: '12.5px', color: '#94A3B8' }}>
            {t('tagline', 'Better medicine routines. Stronger care connections.')}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12.5px', color: '#CBD5E1', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveModal('privacy')} style={{ color: '#CBD5E1', cursor: 'pointer' }}>Privacy Policy</button>
          <button onClick={() => setActiveModal('terms')} style={{ color: '#CBD5E1', cursor: 'pointer' }}>Terms of Use</button>
          <button onClick={() => setActiveModal('contact')} style={{ color: '#CBD5E1', cursor: 'pointer' }}>Contact Us</button>
          <span style={{ color: '#64748B' }}>© 2025 MediMitra CareLoop</span>
        </div>
      </footer>

      {/* Modals for Privacy, Terms, Contact */}
      {activeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16,42,67,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 1000,
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            className="card-white"
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '24px',
              borderRadius: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#102A43' }}>
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms of Use'}
                {activeModal === 'contact' && 'Contact MediMitra Support'}
              </h2>
              <button onClick={() => setActiveModal(null)} style={{ padding: '6px', color: '#64748B' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, maxHeight: '60vh', overflowY: 'auto' }}>
              {activeModal === 'privacy' && (
                <div>
                  <p>MediMitra CareLoop is committed to user confidentiality. Personal medication schedules, caregiver link requests, and emergency contacts are securely protected.</p>
                  <ul style={{ paddingLeft: '18px', marginTop: '8px' }}>
                    <li>Patient medical schedules are only shared with linked caregivers with explicit consent.</li>
                    <li>No third-party marketing or advertising tracking.</li>
                    <li>Passwords and authentication tokens are encrypted.</li>
                  </ul>
                </div>
              )}
              {activeModal === 'terms' && (
                <div>
                  <p>MediMitra CareLoop provides routine adherence support and family alerts. It is not an emergency response service or replacement for professional medical advice.</p>
                  <ul style={{ paddingLeft: '18px', marginTop: '8px' }}>
                    <li>Always follow dosage instructions given by your registered medical physician.</li>
                    <li>In case of acute medical emergencies, call 112 or your local emergency service immediately.</li>
                    <li>Stock tracking indicates estimates based on user logging.</li>
                  </ul>
                </div>
              )}
              {activeModal === 'contact' && (
                <div>
                  <p>Our CareLoop team is available to assist patients, families, and healthcare organizations:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Mail size={16} color="#0D9488" />
                      <strong>support@medimitra-careloop.com</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Phone size={16} color="#0D9488" />
                      <strong>+91 (080) 4567-8900 (Helpline)</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="btn-teal"
              style={{ width: '100%', marginTop: '18px', justifyContent: 'center' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Responsive Breakpoints CSS */}
      <style>{`
        @media (max-width: 860px) {
          .landing-desktop-nav,
          .landing-desktop-auth {
            display: none !important;
          }
          .landing-mobile-menu-btn {
            display: flex !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-right-col {
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .landing-header-inner {
            padding: 10px 14px !important;
          }
          .emergency-label {
            display: none !important;
          }
          .landing-main {
            padding: 24px 14px 40px 14px !important;
          }
        }
      `}</style>
    </div>
  );
};
