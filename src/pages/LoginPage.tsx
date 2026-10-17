import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, Users } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setCurrentPage, showToast, switchToPatient, switchToCaregiver } = useApp();

  const [email, setEmail] = useState('ramesh.kumar@example.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes('anitha') || email.toLowerCase().includes('care')) {
        switchToCaregiver();
      } else {
        switchToPatient();
      }
    }, 500);
  };

  const handleGoogleSignIn = () => {
    showToast('Google Sign-In demo mode: logged in as Patient Ramesh.', 'info');
    switchToPatient();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F0FDFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
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
          Welcome Back!
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
          Sign in to continue
        </p>

        {/* Quick Demo Persona Pickers for Hackathon Demonstrator */}
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#F8FAFC',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            textAlign: 'left',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
            Quick Demo Sign-In
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <button
              type="button"
              onClick={() => {
                setEmail('ramesh.kumar@example.com');
                switchToPatient();
              }}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                fontSize: '11.5px',
                fontWeight: 600,
                color: '#102A43',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <User size={13} color="#0D9488" />
              <span>Ramesh (Patient)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('anitha.care@example.com');
                switchToCaregiver();
              }}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                fontSize: '11.5px',
                fontWeight: 600,
                color: '#102A43',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Users size={13} color="#0D9488" />
              <span>Anitha (Caregiver)</span>
            </button>
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '20px',
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* Email input */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '11px 14px',
                backgroundColor: '#FFFFFF',
                transition: 'border-color 0.2s ease',
              }}
            >
              <Mail size={18} color="#94A3B8" style={{ marginRight: '10px', flexShrink: 0 }} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#102A43',
                }}
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '11px 14px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Lock size={18} color="#94A3B8" style={{ marginRight: '10px', flexShrink: 0 }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#102A43',
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
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
                style={{ accentColor: '#0D9488', width: '15px', height: '15px' }}
              />
              <span>Remember me</span>
            </label>

            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                showToast('Password reset link sent to demo email address.', 'info');
              }}
              style={{ color: '#0D9488', fontWeight: 600 }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
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
            {isLoading ? 'Signing In...' : 'Sign In'}
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

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
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
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        {/* Footer Link */}
        <p style={{ marginTop: '22px', fontSize: '13.5px', color: '#64748B' }}>
          Don't have an account?{' '}
          <button
            onClick={() => setCurrentPage('signup')}
            style={{
              color: '#0D9488',
              fontWeight: 700,
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            Create Account
          </button>
        </p>

        {/* Demo notice */}
        <p style={{ marginTop: '14px', fontSize: '11px', color: '#94A3B8' }}>
          * Secure offline demo mode active. No password stored in plaintext.
        </p>
      </div>
    </div>
  );
};
