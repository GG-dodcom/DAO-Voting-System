/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { TuneErrorInput, TuneLabelInput, TuneLoadingSpinner } from '..';

interface Props {
  label?: string;
  hint?: string;
  loading?: boolean;
  error?: string;
  block?: boolean;
  type?: 'text' | 'number';
  value?: string | number;
  autofocus?: boolean;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  definition?: any;
  alwaysShowError?: boolean;
  onChange?: (value: string | number) => void;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

const TuneInput: React.FC<Props> = ({
  label = '',
  hint = '',
  loading = false,
  error = '',
  block = true,
  type = 'text',
  value = '',
  autofocus = false,
  placeholder = '',
  maxLength,
  readOnly = false,
  disabled = false,
  definition = {},
  alwaysShowError = false,
  onChange,
  before,
  after,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [forceError, setForceError] = useState(false);
  const [showError, setShowError] = useState(false);

  const showErrorMessage = forceError || alwaysShowError || showError;

  const forceShowError = () => {
    setForceError(true);
  };

  useEffect(() => {
    if (autofocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  return (
    <div className={block ? 'w-full' : ''}>
      {(label || definition?.title) && (
        <TuneLabelInput hint={hint || definition?.description}>
          {label || definition.title}
        </TuneLabelInput>
      )}
      <div className="flex">
        <div className={`group relative z-10 flex ${block ? 'w-full' : ''}`}>
          {before && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {before}
            </div>
          )}
          <input
            ref={inputRef}
            type={type}
            value={value}
            className={`tune-input px-3 py-2 
              ${error && showErrorMessage ? 'tune-error-border' : ''} 
              ${disabled ? 'cursor-not-allowed' : ''} 
              ${block ? 'w-full' : ''}`}
            placeholder={placeholder || definition?.examples?.[0] || ''}
            readOnly={readOnly}
            disabled={disabled}
            maxLength={maxLength || definition?.maxLength}
            onBlur={() => error && setShowError(true)}
            onFocus={() => !error && setShowError(false)}
            onInput={(e) => onChange?.((e.target as HTMLInputElement).value)}
          />
          {loading ? (
            <div className="tune-input-loading absolute inset-y-0 right-0 top-[1px] mr-1 flex h-[40px] items-center overflow-hidden pl-2 pr-2">
              <TuneLoadingSpinner />
            </div>
          ) : (
            after && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                {after}
              </div>
            )
          )}
        </div>
      </div>
      {error && showErrorMessage && <TuneErrorInput error={error} />}
    </div>
  );
};

export default TuneInput;
