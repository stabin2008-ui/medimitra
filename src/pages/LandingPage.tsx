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
  CheckCircle2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Navigation */}
      <header
        style={{
          padding: '18px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #F1F5F9',
          backgroundColor: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
          <Logo variant="navy" size="md" />
        </div>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#334155',
          }}
          className="landing-desktop-nav"
        >
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: '#0D9488', fontWeight: 600 }}>Home</button>
          <button onClick={() => scrollToSection('features')} style={{ color: '#475569' }}>Features</button>
          <button onClick={() => scrollToSection('how-it-works')} style={{ color: '#475569' }}>How It Works</button>
          <button onClick={() => scrollToSection('safety')} style={{ color: '#475569' }}>Safety</button>
          <button onClick={() => scrollToSection('contact')} style={{ color: '#475569' }}>Contact</button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setCurrentPage('login')}
            className="btn-outline"
            style={{ padding: '8px 18px', fontSize: '13.5px' }}
          >
            Sign In
          </button>
          <button
            onClick={() => setCurrentPage('signup')}
            className="btn-teal"
            style={{ padding: '8px 20px', fontSize: '13.5px' }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main style={{ flex: 1, padding: '48px 48px 60px 48px', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(320px, 1fr)',
            alignItems: 'center',
            gap: '48px',
            marginBottom: '64px',
          }}
          className="hero-grid"
        >
          {/* Left Column: Heading, description, CTA */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '20px',
                backgroundColor: '#F0FDFA',
                border: '1px solid #CCFBF1',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#0D9488',
                marginBottom: '16px',
              }}
            >
              <Heart size={14} /> Smart Healthcare & Caregiver Support
            </div>

            <h1
              style={{
                fontSize: '44px',
                fontWeight: 800,
                color: '#102A43',
                lineHeight: 1.15,
                letterSpacing: '-0.8px',
                marginBottom: '10px',
              }}
            >
              Better medicine routines.
              <span style={{ display: 'block', color: '#0D9488', marginTop: '6px' }}>
                Stronger care connections.
              </span>
            </h1>

            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#475569',
                marginTop: '18px',
                marginBottom: '32px',
                maxWidth: '500px',
              }}
            >
              MediMitra CareLoop helps seniors take medicines on time with smart reminders and keeps loved ones informed, every step of the way.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentPage('signup')}
                className="btn-teal"
                style={{ padding: '13px 28px', fontSize: '15px' }}
              >
                Get Started
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="btn-outline"
                style={{ padding: '13px 26px', fontSize: '15px' }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column: Healthcare Illustration & Vertical Flow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            {/* The Illustration Card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(16,42,67,0.06)',
                maxWidth: '380px',
                flex: 1,
              }}
            >
              <img
                src="/assets/hero_illustration.jpg"
                alt="Older adult grandfather and caring daughter using MediMitra CareLoop"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>

            {/* Vertical Flow Diagram matching the reference exactly */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#FFFFFF',
                padding: '16px 14px',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 15px rgba(16,42,67,0.04)',
                minWidth: '105px',
              }}
            >
              {/* Step 1: Reminder */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
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
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>Reminder</span>
              </div>

              <div style={{ color: '#94A3B8' }}>
                <ArrowDown size={16} />
              </div>

              {/* Step 2: Confirmed */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
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
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>Confirmed</span>
              </div>

              <div style={{ color: '#94A3B8' }}>
                <ArrowDown size={16} />
              </div>

              {/* Step 3: Caregiver Alert */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
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
                  Caregiver Alert
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '72px',
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
                width: '46px',
                height: '46px',
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
                Smart Reminders
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Timely medicine alerts with easy actions.
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
                width: '46px',
                height: '46px',
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
                CareLoop Alerts
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Caregivers are notified if reminders are missed.
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
                width: '46px',
                height: '46px',
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
                Refill Tracking
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Track medicine stock and get refill alerts.
              </p>
            </div>
          </div>
        </section>

        {/* Section: How It Works */}
        <section id="how-it-works" style={{ marginBottom: '72px', borderTop: '1px solid #F1F5F9', paddingTop: '56px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#102A43' }}>
              How CareLoop Works
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', marginTop: '8px' }}>
              Designed with elderly patients and caring families at the heart of every interaction.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div className="card-white" style={{ padding: '24px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0D9488', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '14px' }}>1</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>Schedule Prescriptions</h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Add doctor-prescribed routines with customizable times, meal associations, and stock counts.
              </p>
            </div>

            <div className="card-white" style={{ padding: '24px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0D9488', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '14px' }}>2</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>Confirm In One Tap</h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                When reminder fires, tap 'Taken', 'Remind Me Later', or 'Need Help' with oversized touch targets.
              </p>
            </div>

            <div className="card-white" style={{ padding: '24px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0D9488', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '14px' }}>3</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>Caregiver Alert Loop</h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                Loved ones check the live dashboard or receive emergency help alerts when assistance is requested.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Safety & Privacy */}
        <section id="safety" style={{ marginBottom: '72px', borderTop: '1px solid #F1F5F9', paddingTop: '56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1.2fr)', gap: '40px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0D9488', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                <Lock size={15} /> Healthcare Safety First
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#102A43', lineHeight: 1.2, marginBottom: '14px' }}>
                Patient Consent & Medical Data Protection
              </h2>
              <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                MediMitra CareLoop never automatically changes medication dosages, diagnoses conditions, or orders medications automatically.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="card-white" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <CheckCircle2 size={20} color="#16A34A" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#102A43', fontWeight: 600 }}>Consent-based caregiver linking authorized by patients</span>
              </div>
              <div className="card-white" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <CheckCircle2 size={20} color="#16A34A" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#102A43', fontWeight: 600 }}>Zero automated pharmaceutical ordering or dispensing</span>
              </div>
              <div className="card-white" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <CheckCircle2 size={20} color="#16A34A" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#102A43', fontWeight: 600 }}>Clear estimates for stock run-out dates based on user daily intake</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Contact */}
        <section id="contact" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '56px', marginBottom: '40px' }}>
          <div className="card-white" style={{ padding: '36px', backgroundColor: '#F0FDFA', borderColor: '#CCFBF1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#102A43' }}>Have questions about CareLoop?</h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                Our healthcare support and engineering team is available 24/7.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setActiveModal('contact')}
                className="btn-teal"
                style={{ padding: '10px 20px' }}
              >
                Contact Support
              </button>
              <button
                onClick={() => setCurrentPage('signup')}
                className="btn-outline"
                style={{ padding: '10px 20px' }}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Dark Navy Footer matching reference exactly */}
      <footer
        style={{
          backgroundColor: '#102A43',
          color: '#FFFFFF',
          padding: '28px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Logo variant="white" size="md" />
          <span style={{ fontSize: '13px', color: '#94A3B8' }}>
            Better medicine routines. Stronger care connections.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', color: '#CBD5E1' }}>
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
              padding: '28px',
              borderRadius: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#102A43' }}>
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms of Use'}
                {activeModal === 'contact' && 'Contact MediMitra Support'}
              </h2>
              <button onClick={() => setActiveModal(null)} style={{ padding: '6px', color: '#64748B' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, maxHeight: '60vh', overflowY: 'auto', paddingRight: '6px' }}>
              {activeModal === 'privacy' && (
                <div>
                  <p>MediMitra CareLoop is committed to user confidentiality. Personal medication schedules, caregiver link requests, and emergency contacts are securely protected.</p>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                    <li>Patient medical schedules are only shared with linked caregivers with explicit consent.</li>
                    <li>No third-party marketing or advertising tracking.</li>
                    <li>Passwords and authentication tokens are encrypted.</li>
                  </ul>
                </div>
              )}
              {activeModal === 'terms' && (
                <div>
                  <p>MediMitra CareLoop provides routine adherence support and family alerts. It is not an emergency response service or replacement for professional medical advice.</p>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                    <li>Always follow dosage instructions given by your registered medical physician.</li>
                    <li>In case of acute medical emergencies, call your local emergency service immediately.</li>
                    <li>Stock tracking indicates estimates based on user logging.</li>
                  </ul>
                </div>
              )}
              {activeModal === 'contact' && (
                <div>
                  <p>Our CareLoop team is available to assist patients, families, and healthcare organizations:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
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
              style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .landing-desktop-nav {
            display: none !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};
