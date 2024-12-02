import React from 'react';
import { IHoExclamationCircle, IHoInformationCircle } from '../assets/icons';

interface BaseMessage {
  level: 'info' | 'warning' | 'warning-red';
  children: React.ReactNode;
  className?: string;
}

const BaseMessage: React.FC<BaseMessage> = ({ level, children, className }) => {
  return (
    <div className={`${className}`}>
      {level === 'info' ? (
        <IHoInformationCircle className="float-left mr-1 text-sm" />
      ) : (
        <IHoExclamationCircle
          className={`float-left mr-1 text-sm ${
            level === 'warning-red' ? 'text-red' : ''
          }`}
        />
      )}
      <div className={`leading-5 ${level === 'warning-red' ? 'text-red' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default BaseMessage;
