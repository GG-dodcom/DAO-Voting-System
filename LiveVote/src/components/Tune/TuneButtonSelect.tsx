import React from 'react';
import { TuneButton, TuneLabelInput } from '..';
import { IHoChevronDown } from '../../assets/icons';

interface Props {
  modelValue?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
  tooltip?: string | null;
  definition?: {
    title?: string;
    description?: string;
  };
  className?: string;
  onSelect: () => void;
  children?: React.ReactNode;
}

const TuneButtonSelect: React.FC<Props> = ({
  modelValue,
  label,
  hint,
  disabled,
  tooltip,
  definition,
  className,
  onSelect,
  children,
}) => {
  return (
    <div className="w-full">
      {(label || definition?.title) && (
        <TuneLabelInput hint={hint || definition?.description}>
          {label || definition?.title}
        </TuneLabelInput>
      )}
      <TuneButton
        data-tippy-content={tooltip || undefined}
        className={`${className} tune-button-select ${
          disabled ? 'disabled' : ''
        }`}
        disabled={disabled}
        onClick={disabled ? undefined : onSelect}
      >
        {children ? children : <span>{modelValue}</span>}
        <IHoChevronDown className="absolute inset-y-[12px] right-[14px] text-sm text-skin-link" />
      </TuneButton>
    </div>
  );
};

export default TuneButtonSelect;
