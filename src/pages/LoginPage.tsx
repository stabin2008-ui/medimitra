import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, Users, Globe, PhoneCall } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { 
    setCurrentPage, 
    showToast, 
    loginUser, 
    loginWithGoogle, 
    switchToPatient, 
    switchToCaregiver, 
    language, 
    setLanguage, 
    setIsEmergencyModalOpen,
    t 
  } = useApp();

  const [email, setEmail] = useState('ramesh.kumar@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError(t('invalidEmailError', 'Please provide a valid email address.'));
      return;
    }

    if (!password || password.length < 4) {
      setError(t('passwordLengthError', 'Password must be at least 4 characters.'));
      return;
    }

    setIsLoading(true);
    const result = await loginUser(email, password);
    setIsLoading(false);

    if (result.success) {
      showToast(t('loginSuccess', 'Signed in successfully!'), 'success');
      // Redirect based on loaded user role
      if (email.toLowerCase().includes('anitha') || email.toLowerCase().includes('care')) {
        setCurrentPage('caregiver');
      } else {
        setCurrentPage('dashboard');
      }
    } else {
      setError(result.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    const res = await loginWithGoogle();
    setIsLoading(false);

    if (res.success) {
      showToast('Signed in via Google successfully!', 'success');
      setCurrentPage('dashboard');
    } else {
      setError(res.error || 'Google authentication could not be completed.');
      showToast(res.error || 'Google authentication failed.', 'warning');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F0FDFA',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Top Bar with Language Toggle & Emergency Call */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: '#FEE2E2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            fontWeight: 700,
            fontSize: '12.5px',
          }}
          aria-label="Emergency 112 / 100"
        >
          <PhoneCall size={14} />
          <span>{t('emergencyHelpButton', 'Emergency 112')}</span>
        </button>

        <button
          onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            color: '#102A43',
            fontWeight: 600,
            fontSize: '12.5px',
          }}
          aria-label="Toggle language"
        >
          <Globe size={14} color="#0D9488" />
          <span>{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
        </button>
      </div>

      <div
        className="card-white"
        style={{
          width: '100%',
          maxWidth: '430px',
          padding: '36px 32px',
          borderRadius: '18px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 10px 30px rgba(16, 42, 67, 0.08)',
          textAlign: 'center',
        }}
      >
        {/* Brand Logo Centered */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          <div onClick={() => setCurrentPage('landing')} style={{ cursor: 'pointer' }} title="Back to Home">
            <Logo variant="navy" size="lg" />
          </div>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#102A43',
            marginBottom: '6px',
            letterSpacing: '-0.3px',
          }}
        >
          {t('welcomeBack', 'Welcome Back!')}
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
          {t('loginSubtitle', 'Please sign in to access your MediMitra CareLoop dashboard')}
        </p>

        {/* Quick Demo Persona Pickers for Hackathon Demonstrator */}
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#F8FAFC',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
            {t('quickDemoPersonas', 'Quick Demo Personas')}
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                setEmail('ramesh.kumar@example.com');
                setPassword('password123');
                switchToPatient();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '7px 10px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: 600,
                color: '#102A43',
              }}
            >
              <User size={14} color="#0D9488" />
              <span>Ramesh (Patient)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail('anitha.care@example.com');
                setPassword('password123');
                switchToCaregiver();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '7px 10px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: 600,
                color: '#102A43',
              }}
            >
              <Users size={14} color="#0D9488" />
              <span>Anitha (Caregiver)</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              backgroundColor: '#FEF2F2',
              borderRadius: '8px',
              border: '1px solid #FEE2E2',
              color: '#DC2626',
              fontSize: '13px',
              marginBottom: '16px',
              textAlign: 'left',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* Email Field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="login-email"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#102A43',
                marginBottom: '6px',
              }}
            >
              {t('emailLabel', 'Email Address')}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 38px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  color: '#102A43',
                }}
              />
              <Mail
                size={18}
                color="#94A3B8"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="login-password"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#102A43',
                marginBottom: '6px',
              }}
            >
              {t('passwordLabel', 'Password')}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '11px 40px 11px 38px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  color: '#102A43',
                }}
              />
              <Lock
                size={18}
                color="#94A3B8"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                  padding: '4px',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '22px',
              fontSize: '13px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#0D9488', width: '16px', height: '16px' }}
              />
              <span>{t('rememberMe', 'Remember Me')}</span>
            </label>

            <button
              type="button"
              onClick={() => showToast('Password reset link will be sent to your registered email.', 'info')}
              style={{ color: '#0D9488', fontWeight: 600, fontSize: '13px' }}
            >
              {t('forgotPassword', 'Forgot Password?')}
            </button>
          </div>

          {/* Primary Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-teal"
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25)',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Signing In...' : t('signInButton', 'Sign In')}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '22px 0',
            color: '#94A3B8',
            fontSize: '12.5px',
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
          <span style={{ padding: '0 12px' }}>{t('or', 'or')}</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
        </div>

        {/* Sign in with Google (Matching Reference Exact Layout) */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '11px',
            borderRadius: '10px',
            border: '1.5px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            color: '#102A43',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{t('signInWithGoogle', 'Sign in with Google')}</span>
        </button>

        {/* Create Account Link */}
        <p style={{ marginTop: '24px', fontSize: '13.5px', color: '#64748B' }}>
          {t('noAccountPrompt', "Don't have an account?")}{' '}
          <button
            type="button"
            onClick={() => setCurrentPage('signup')}
            style={{ color: '#0D9488', fontWeight: 700 }}
          >
            {t('createAccountLink', 'Create Account')}
          </button>
        </p>
      </div>
    </div>
  );
};
