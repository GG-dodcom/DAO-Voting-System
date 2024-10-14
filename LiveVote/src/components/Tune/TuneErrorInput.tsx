import React from 'react';

interface TuneErrorInputProps {
  error?: string;
  className?: string;
}

const TuneErrorInput: React.FC<TuneErrorInputProps> = ({
  error,
  className,
}) => {
  return <div className={`tune-error-text mt-[2px] ${className}`}>{error}</div>;
};

export default TuneErrorInput;
