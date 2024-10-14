import React, { useState } from 'react';
import { LabelInput, ModalSelectDate, TuneButton } from '.';
import Tippy from '@tippyjs/react';
import { IHoCalendar } from '../assets/icons';

interface Props {
  title?: string;
  information?: string;
  dateString?: string;
  date: number;
  disabled?: boolean;
  type?: string;
  tooltip: string | null;
  onInputDate: (date: number) => void;
}

const InputDate: React.FC<Props> = ({
  title,
  information,
  dateString,
  date,
  disabled = false,
  type,
  tooltip,
  onInputDate,
}) => {
  const [modalDateSelectOpen, setModalDateSelectOpen] =
    useState<boolean>(false);

  const handleClick = () => {
    if (!disabled) {
      setModalDateSelectOpen(true);
    }
  };

  return (
    <div className="w-full">
      <LabelInput information={information}>{title}</LabelInput>
      <Tippy content={tooltip || ''}>
        <TuneButton
          className={`relative inset-y-0 flex !h-[42px] w-full items-center truncate pl-[44px] pr-3 text-left 
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleClick}
        >
          <span className={`${disabled ? 'text-skin-text opacity-60' : ''}`}>
            {dateString}
          </span>
          <IHoCalendar className="absolute left-[16px] -mt-[1px] text-sm text-skin-text" />
        </TuneButton>
      </Tippy>
      {modalDateSelectOpen && (
        <ModalSelectDate
          type={type}
          open={modalDateSelectOpen}
          value={date}
          onClose={() => setModalDateSelectOpen(false)}
          onInput={(newDate: number) => {
            onInputDate(newDate);
            setModalDateSelectOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default InputDate;
