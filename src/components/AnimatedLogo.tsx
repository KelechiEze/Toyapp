
import React from 'react';
import './AnimatedLogo.css';

interface AnimatedLogoProps {
  show: boolean;
}

const AnimatedLogo = ({ show }: AnimatedLogoProps) => {
  return (
    <div className={`animated-logo ${show ? 'visible' : ''}`}>
      <div className="logo-container">
        <div className="logo-circle">
          <div className="logo-inner">
            <div className="logo-icon">
              <div className="controller-body">
                <div className="controller-dpad">
                  <div className="dpad-vertical"></div>
                  <div className="dpad-horizontal"></div>
                </div>
                <div className="controller-buttons">
                  <div className="button button-a"></div>
                  <div className="button button-b"></div>
                  <div className="button button-x"></div>
                  <div className="button button-y"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
