import React from 'react';
import { DialogTitle } from '@headlessui/react';

interface Props {
  as?: keyof JSX.IntrinsicElements; // This allows 'as' to be any valid HTML element tag
  children: React.ReactNode;
  className?: string;
}

const TuneModalTitle: React.FC<Props> = ({
  as = 'h3',
  children,
  className,
}) => {
  return (
    <DialogTitle as={as} className={`${className}`}>
      {children}
    </DialogTitle>
  );
};

export default TuneModalTitle;
