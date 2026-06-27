"use client";

import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import './ProfileCard.css';
import { useProfileCardTilt } from '@/hooks/useProfileCardTilt';

interface ProfileCardProps {
  avatarUrl: string;
  avatarAlt?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '<Placeholder for avatar URL>',
  avatarAlt,
  iconUrl = '<Placeholder for icon URL>',
  grainUrl = '<Placeholder for grain URL>',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  name = '',
  title = '',
  handle = 'javicodes',
  status = '',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick
}) => {
  const { wrapRef, shellRef } = useProfileCardTilt({
    enableTilt,
    enableMobileTilt,
    mobileTiltSensitivity
  });

  const cardStyle = useMemo(
    () =>
      ({
        '--icon': iconUrl ? `url(${iconUrl})` : 'none',
        '--grain': grainUrl ? `url(${grainUrl})` : 'none',
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--behind-glow-color': behindGlowColor ?? 'rgba(125, 190, 255, 0.67)',
        '--behind-glow-size': behindGlowSize ?? '50%'
      }) as React.CSSProperties,
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled ? <div className="pc-behind" /> : null}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-content pc-avatar-content">
              <div className="avatar-wrapper relative w-full h-full overflow-hidden">
                <Image
                  className="avatar object-cover"
                  src={avatarUrl}
                  alt={avatarAlt || `${name || 'User'} avatar`}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              {showUserInfo ? (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      {status ? <div className="pc-status">{status}</div> : null}
                    </div>
                  </div>
                  <button
                    className="pc-contact-btn"
                    onClick={handleContactClick}
                    style={{ pointerEvents: 'auto' }}
                    type="button"
                    aria-label={`Contact ${name || 'user'}`}
                  >
                    {contactText}
                  </button>
                </div>
              ) : null}
            </div>
            {name || title ? (
              <div className="pc-content">
                <div className="pc-details">
                  {name && <h3>{name}</h3>}
                  {title && <p>{title}</p>}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
