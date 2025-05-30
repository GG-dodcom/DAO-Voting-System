import React from 'react';
import classNames from 'classnames';
import { BaseLoading } from '.';
import '../assets/css/LoadingSpinner.scss';

interface LoadingSpinnerProps {
  fillWhite?: boolean;
  small?: boolean;
  big?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fillWhite = false,
  small = false,
  big = false,
  className,
}) => {
  return (
    <div className={classNames('loading', { small, big }, `${className}`)}>
      <BaseLoading>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 50 50"
        >
          <path
            className={fillWhite ? 'fill-white' : ''}
            d="M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </BaseLoading>
    </div>
  );
};

export default LoadingSpinner;
