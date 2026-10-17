import React from 'react';

interface LogoProps {
  variant?: 'navy' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'navy', size = 'md', showTagline = false }) => {
  const isWhite = variant === 'white';
  
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 36 : 30;
  const brandFontSize = size === 'sm' ? '17px' : size === 'lg' ? '24px' : '20px';
  const subFontSize = size === 'sm' ? '15px' : size === 'lg' ? '21px' : '17px';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', userSelect: 'none' }}>
      {/* Heart + Cross Icon matching reference exactly */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Heart background outline */}
        <path
          d="M18 32C18 32 4 22.8 4 13.5C4 8.5 7.8 4.5 12.8 4.5C15.6 4.5 17.2 5.8 18 6.7C18.8 5.8 20.4 4.5 23.2 4.5C28.2 4.5 32 8.5 32 13.5C32 22.8 18 32 18 32Z"
          fill={isWhite ? 'rgba(13, 148, 136, 0.25)' : '#F0FDFA'}
          stroke="#0D9488"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Medical Cross inside heart */}
        <path
          d="M18 10V20M13 15H23"
          stroke="#0D9488"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: brandFontSize,
              color: isWhite ? '#FFFFFF' : '#102A43',
              letterSpacing: '-0.3px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            MediMitra
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: subFontSize,
              color: '#0D9488',
              letterSpacing: '-0.2px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            CareLoop
          </span>
        </div>
        {showTagline && (
          <span
            style={{
              fontSize: '11px',
              color: isWhite ? '#94A3B8' : '#64748B',
              marginTop: '2px',
              fontWeight: 500,
            }}
          >
            Better medicine routines. Stronger care connections.
          </span>
        )}
      </div>
    </div>
  );
};
