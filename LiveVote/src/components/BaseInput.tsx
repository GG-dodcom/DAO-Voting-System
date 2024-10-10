/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { FormError } from '../utils/interfaces';
import { BaseIcon, LabelInput, LoadingSpinner } from '.';
import { IHoCheck, IHoX } from '../assets/icons';

interface BaseInputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  value?: string | number;
  definition?: any;
  error?: FormError | null;
  focusOnMount?: boolean;
  placeholder?: string;
  title?: string;
  maxLength?: number;
  readonly?: boolean;
  information?: string;
  loading?: boolean;
  isDisabled?: boolean;
  success?: boolean;
  failed?: boolean;
  onChange?: (value: string) => void;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

const BaseInput: React.FC<BaseInputProps> = ({
  type = 'text',
  value = undefined,
  definition = undefined,
  error = null,
  focusOnMount = false,
  placeholder = undefined,
  title = undefined,
  maxLength = undefined,
  readonly = false,
  information = undefined,
  loading = false,
  isDisabled = false,
  success = false,
  failed = false,
  onChange,
  before,
  after,
  ...props
}) => {
  const [visited, setVisited] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showErrorMessage = visited || error?.push;

  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusOnMount]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {(title || definition?.title) && (
        <LabelInput information={information}>
          {title ?? definition?.title}
        </LabelInput>
      )}

      <div className="group relative z-10">
        {before && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {before}
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          value={value}
          className={`s-input !h-[42px] ${
            error?.message && showErrorMessage ? '!border-red' : ''
          } ${isDisabled ? 'cursor-not-allowed placeholder:!opacity-30' : ''}`}
          maxLength={maxLength ?? definition?.maxLength}
          placeholder={placeholder ?? definition?.examples?.[0] ?? ''}
          readOnly={readonly}
          disabled={isDisabled}
          onBlur={() => (error?.message ? setVisited(true) : null)}
          onFocus={() => (error?.message ? null : setVisited(false))}
          onInput={handleInput}
          {...props}
        />
        {(loading || success || failed) && (
          <div className="absolute inset-y-0 right-0 top-[1px] mr-1 hidden h-[40px] items-center overflow-hidden rounded-r-full bg-skin-bg pl-2 pr-2 group-focus-within:flex">
            {loading && (
              <div className="pb-[3px]">
                <LoadingSpinner />
              </div>
            )}
            {success && <IHoCheck className="text-md text-green" />}
            {failed && <IHoX className="text-sm text-red" />}
          </div>
        )}
        {after && !loading && !success && !failed && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {after}
          </div>
        )}
      </div>
      <div
        className={`s-error ${
          !!error?.message && showErrorMessage
            ? '-mt-[21px] opacity-100'
            : '-mt-[40px] h-6 opacity-0'
        }`}
      >
        {error?.message && showErrorMessage && (
          <div className="mr-2 text-white">
            <BaseIcon name="warning" />
          </div>
        )}
        {error?.message}
      </div>
    </div>
  );
};

export default BaseInput;
