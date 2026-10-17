import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { setCurrentPage, setUserRole, showToast } = useApp();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the Terms of Use and Privacy Policy to continue.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUserRole(accountType);
      showToast(
        accountType === 'patient'
          ? `Welcome to MediMitra CareLoop, ${fullName}! Your patient routine is ready.`
          : `Welcome, ${fullName}! Your caregiver portal is ready to link loved ones.`,
        'success'
      );
      if (accountType === 'patient') {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('caregiver');
      }
    }, 700);
  };

  const handleGoogleSignUp = () => {
    showToast('Demo Mode: Google account linked as Patient.', 'info');
    setUserRole('patient');
    setCurrentPage('dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F0FDFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 16px',
        boxSizing: 'border-box',
      }}
    >
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
          Create Your Account
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '24px' }}>
          Join MediMitra CareLoop to protect health routines
        </p>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* Account Type Selector */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '6px' }}>
              Account Type *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setAccountType('patient')}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: accountType === 'patient' ? '2px solid #0D9488' : '1px solid #CBD5E1',
                  backgroundColor: accountType === 'patient' ? '#F0FDFA' : '#FFFFFF',
                  color: accountType === 'patient' ? '#0D9488' : '#475569',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                {accountType === 'patient' && <CheckCircle2 size={16} color="#0D9488" />}
                <span>Patient / Senior</span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('caregiver')}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: accountType === 'caregiver' ? '2px solid #0D9488' : '1px solid #CBD5E1',
                  backgroundColor: accountType === 'caregiver' ? '#F0FDFA' : '#FFFFFF',
                  color: accountType === 'caregiver' ? '#0D9488' : '#475569',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                {accountType === 'caregiver' && <CheckCircle2 size={16} color="#0D9488" />}
                <span>Caregiver / Family</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '5px' }}>
              Full Name *
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '10px 14px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <User size={18} color="#94A3B8" style={{ marginRight: '10px', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#102A43' }}
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '5px' }}>
              Email Address *
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '10px 14px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Mail size={18} color="#94A3B8" style={{ marginRight: '10px', flexShrink: 0 }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#102A43' }}
                required
              />
            </div>
          </div>

          {/* Create Password */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '5px' }}>
              Create Password *
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '10px 14px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Lock size={18} color="#94A3B8" style={{ marginRight: '10px', flexShrink: 0 }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#102A43' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#102A43', marginBottom: '5px' }}>
              Confirm Password *
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '10px 14px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Lock size={18} color="#94A3B8" style={{ marginRight: '10px', flexShrink: 0 }} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#102A43' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center' }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: '#475569', cursor: 'pointer', lineHeight: 1.4 }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ accentColor: '#0D9488', width: '16px', height: '16px', marginTop: '2px', flexShrink: 0 }}
                required
              />
              <span>
                I agree to the <a href="#terms" style={{ color: '#0D9488', fontWeight: 600 }}>Terms of Use</a> and acknowledge the{' '}
                <a href="#privacy" style={{ color: '#0D9488', fontWeight: 600 }}>Privacy Policy</a>. Data is encrypted and private.
              </span>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="btn-teal"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider with 'or' */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0',
            color: '#94A3B8',
            fontSize: '13px',
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
          <span style={{ padding: '0 12px' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
        </div>

        {/* Sign up with Google */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="btn-outline"
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            borderColor: '#CBD5E1',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Sign up with Google</span>
        </button>

        {/* Link back to Login */}
        <p style={{ marginTop: '22px', fontSize: '13.5px', color: '#64748B' }}>
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            style={{
              color: '#0D9488',
              fontWeight: 700,
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
