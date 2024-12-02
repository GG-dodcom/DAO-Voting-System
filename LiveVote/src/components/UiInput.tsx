import React, { useEffect, useRef } from 'react';
import { BaseIcon } from '.';
import { IHoSparkles } from '../assets/icons';

interface Props {
  value?: string | number;
  placeholder?: string;
  error?: string | boolean;
  number?: boolean;
  disabled?: boolean;
  maxLength?: string | number;
  additionalInputClass?: string;
  focusOnMount?: boolean;
  readonly?: boolean;
  quickFix?: () => void;
  onChange: (value: string | number | undefined) => void;
  onBlur?: () => void;
  children: {
    label: React.ReactNode;
    selected?: React.ReactNode;
    info: React.ReactNode;
  };
  className?: string;
}

const UiInput: React.FC<Props> = ({
  value,
  placeholder,
  error,
  number,
  disabled,
  maxLength,
  additionalInputClass,
  focusOnMount,
  readonly,
  quickFix,
  onChange,
  onBlur,
  children,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusOnMount]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (number) {
      onChange(input ? parseFloat(input) : undefined);
    } else {
      onChange(input);
    }
  };

  return (
    <div className={`w-full rounded-3xl ${className}`}>
      <div
        className={`relative z-10 flex w-full rounded-3xl border border-skin-border bg-skin-bg px-3 text-left leading-[42px] outline-none transition-colors focus-within:border-skin-text
        ${error ? '!border-red' : ''}`}
      >
        <div className="mr-2 whitespace-nowrap text-skin-text">
          {children.label}
        </div>
        {children.selected ? (
          <button
            className={`flex-auto overflow-x-auto whitespace-nowrap text-left text-skin-link outline-none ${
              disabled ? 'cursor-not-allowed text-skin-border' : ''
            }`}
            disabled={disabled}
          >
            {children.selected}
          </button>
        ) : (
          <input
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            type={number ? 'number' : 'text'}
            disabled={disabled}
            readOnly={readonly}
            maxLength={maxLength ? Number(maxLength) : undefined}
            className={`input w-full flex-auto ${additionalInputClass} ${
              disabled ? 'cursor-not-allowed' : ''
            }`}
            onInput={handleInput}
            onBlur={onBlur}
          />
        )}
        {children.info}
      </div>
      <div
        className={`s-error relative z-0 ${
          error ? '-mt-[20px] opacity-100' : '-mt-[48px] opacity-0'
        }`}
      >
        <BaseIcon name="warning" className="text-red-500 mr-2" />
        {/* The fact that error can be bool or string makes this necessary */}
        {error || ''}
        {/* Allow parent to format value with action */}
        {quickFix && (
          <button className="ml-auto" onClick={quickFix}>
            Quick Fix <IHoSparkles className="inline" />
          </button>
        )}
      </div>
    </div>
  );
};

export default UiInput;
