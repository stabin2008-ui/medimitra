import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Globe, PhoneCall } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { 
    setCurrentPage, 
    showToast, 
    registerUser, 
    loginWithGoogle,
    language,
    setLanguage,
    setIsEmergencyModalOpen,
    t
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'patient' | 'caregiver'>('patient');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError(t('enterFullNameError', 'Please enter your full name.'));
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError(t('invalidEmailError', 'Please enter a valid email address.'));
      return;
    }

    if (!password || password.length < 6) {
      setError(t('passwordLengthError', 'Password must be at least 6 characters.'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('passwordMismatchError', 'Passwords do not match. Please re-enter.'));
      return;
    }

    if (!agreeTerms) {
      setError(t('termsRequiredError', 'You must accept the Terms of Use and Privacy Policy to continue.'));
      return;
    }

    setIsLoading(true);
    const res = await registerUser(fullName, email, password, accountType);
    setIsLoading(false);

    if (res.success) {
      showToast(
        accountType === 'patient'
          ? `Welcome to MediMitra CareLoop, ${fullName}! Your private patient routine is ready.`
          : `Welcome, ${fullName}! Your caregiver portal is ready to link loved ones with patient consent.`,
        'success'
      );
      if (accountType === 'patient') {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('caregiver');
      }
    } else {
      setError(res.error || 'Failed to create account. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError('');
    const res = await loginWithGoogle();
    setIsLoading(false);

    if (res.success) {
      showToast('Account registered via Google successfully!', 'success');
      setCurrentPage('dashboard');
    } else {
      setError(res.error || 'Google registration could not be completed.');
      showToast(res.error || 'Google registration failed.', 'warning');
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
        padding: '28px 16px',
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
          maxWidth: '460px',
          padding: '36px 32px',
          borderRadius: '18px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 10px 30px rgba(16, 42, 67, 0.08)',
          textAlign: 'center',
        }}
      >
        {/* Brand Logo Centered */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <div onClick={() => setCurrentPage('landing')} style={{ cursor: 'pointer' }}>
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
          {t('createAccountTitle', 'Create Your Account')}
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '22px' }}>
          {t('signUpSubtitle', 'Join MediMitra CareLoop to protect routines and connect with loved ones')}
        </p>

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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* Account Type Selector (Patient vs Caregiver) */}
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#102A43',
                marginBottom: '8px',
              }}
            >
              {t('accountTypeLabel', 'Account Type')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setAccountType('patient')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: accountType === 'patient' ? '2px solid #0D9488' : '1px solid #CBD5E1',
                  backgroundColor: accountType === 'patient' ? '#F0FDFA' : '#FFFFFF',
                  color: accountType === 'patient' ? '#0D9488' : '#475569',
                  fontWeight: accountType === 'patient' ? 700 : 500,
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{t('patientRole', 'Patient / Senior')}</span>
                {accountType === 'patient' && <CheckCircle2 size={16} color="#0D9488" />}
              </button>

              <button
                type="button"
                onClick={() => setAccountType('caregiver')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: accountType === 'caregiver' ? '2px solid #0D9488' : '1px solid #CBD5E1',
                  backgroundColor: accountType === 'caregiver' ? '#F0FDFA' : '#FFFFFF',
                  color: accountType === 'caregiver' ? '#0D9488' : '#475569',
                  fontWeight: accountType === 'caregiver' ? 700 : 500,
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{t('caregiverRole', 'Caregiver / Family')}</span>
                {accountType === 'caregiver' && <CheckCircle2 size={16} color="#0D9488" />}
              </button>
            </div>
          </div>

          {/* Full Name Field */}
          <div style={{ marginBottom: '14px' }}>
            <label
              htmlFor="signup-name"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#102A43',
                marginBottom: '6px',
              }}
            >
              {t('fullNameLabel', 'Full Name')}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  color: '#102A43',
                }}
              />
              <User
                size={18}
                color="#94A3B8"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '14px' }}>
            <label
              htmlFor="signup-email"
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
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
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
          <div style={{ marginBottom: '14px' }}>
            <label
              htmlFor="signup-password"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#102A43',
                marginBottom: '6px',
              }}
            >
              {t('passwordLabel', 'Password (min. 6 characters)')}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 38px',
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

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="signup-confirm-password"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#102A43',
                marginBottom: '6px',
              }}
            >
              {t('confirmPasswordLabel', 'Confirm Password')}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 38px',
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                  padding: '4px',
                }}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms & Privacy Consent */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '12.5px', color: '#475569', lineHeight: 1.4 }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ accentColor: '#0D9488', width: '16px', height: '16px', marginTop: '2px', flexShrink: 0 }}
              />
              <span>
                {t('agreeTermsText', 'I agree to the Terms of Use and Privacy Policy. I acknowledge that MediMitra CareLoop never provides medical prescriptions or automates pharmacy orders.')}
              </span>
            </label>
          </div>

          {/* Primary Create Account Button */}
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
            {isLoading ? 'Creating Account...' : t('createAccountTitle', 'Create Account')}
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

        {/* Sign Up with Google */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
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

        {/* Back to Sign In Link */}
        <p style={{ marginTop: '24px', fontSize: '13.5px', color: '#64748B' }}>
          {t('alreadyHaveAccount', 'Already have an account?')}{' '}
          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            style={{ color: '#0D9488', fontWeight: 700 }}
          >
            {t('signIn', 'Sign In')}
          </button>
        </p>
      </div>
    </div>
  );
};
