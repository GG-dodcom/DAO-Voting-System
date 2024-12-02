import React, { useState, useEffect, useMemo } from 'react';
import { BaseCalendar, BaseModal, TuneButton, TuneErrorInput } from '.';
import { t } from 'i18next';

interface Props {
  open: boolean;
  value?: number;
  type?: string;
  onInput: (value: number) => void;
  onClose: () => void;
}

const ModalSelectDate: React.FC<Props> = ({
  open,
  value,
  type,
  onInput,
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [time, setTime] = useState('12:00');

  const isTimeValid = useMemo(() => {
    const isTimeEnteringStep = step === 1;
    if (!isTimeEnteringStep) return true;
    if (!input) return false;
    const startDateString = `${input} ${time}:59`;
    const startTimestamp = new Date(startDateString).getTime();
    return startTimestamp >= Date.now();
  }, [step, input, time]);

  const formatDate = (date?: number) => {
    const output = { h: '12', m: '00', dateString: '' };
    if (!date) return output;
    const dateObject = new Date(date * 1000);
    const offset = dateObject.getTimezoneOffset();
    const data = new Date(dateObject.getTime() - offset * 60 * 1000);
    output.dateString = data.toISOString().split('T')[0];
    output.h = `0${dateObject.getHours().toString()}`.slice(-2);
    output.m = `0${dateObject.getMinutes().toString()}`.slice(-2);
    return output;
  };

  const combineDateAndTime = (date: string, time: string) => {
    const dateString = `${date} ${time}:00`;
    return new Date(dateString).getTime() / 1000;
  };

  const handleSubmit = () => {
    if (step === 0) {
      setStep(1);
      return;
    }
    const timestamp = combineDateAndTime(input, time);
    const now = parseInt((Date.now() / 1e3).toFixed());
    onInput(Math.max(timestamp, now));
    onClose();
  };

  useEffect(() => {
    setStep(0);
    if (!value) return;
    const { dateString, h, m } = formatDate(value);
    setTime(`${h}:${m}`);
    setInput(dateString);
  }, [open, value]);

  useEffect(() => {
    if (step === 0) return;
    const selectedDateTimestamp = combineDateAndTime(input, time);
    const timestamp = Math.max(
      selectedDateTimestamp,
      parseInt((Date.now() / 1e3 + 10).toFixed())
    );
    const { dateString, h, m } = formatDate(timestamp);
    setTime(`${h}:${m}`);
    setInput(dateString);
  }, [step, input, time]);

  return (
    <BaseModal open={open} onClose={onClose}>
      {{
        header: (
          <h3>
            {step === 0
              ? t(type === 'start' ? 'create.startDate' : 'create.endDate')
              : t(type === 'start' ? 'create.startTime' : 'create.endTime')}
          </h3>
        ),
        children: (
          <>
            {step === 0 ? (
              <div className="m-4">
                <BaseCalendar
                  value={input}
                  onChange={setInput}
                  className="mx-auto mb-2"
                />
              </div>
            ) : (
              <div className="m-4">
                <input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  type="time"
                  className="s-input form-input mx-auto max-w-[140px] text-center text-lg"
                />
                {!isTimeValid && (
                  <TuneErrorInput
                    className="mx-auto mt-2 text-center"
                    error={t('create.errorTimeInPast')}
                  />
                )}
              </div>
            )}
          </>
        ),
        footer: (
          <>
            <div className="float-left w-2/4 pr-2">
              <TuneButton type="button" className="w-full" onClick={onClose}>
                {t('cancel')}
              </TuneButton>
            </div>
            <div className="float-left w-2/4 pl-2">
              <TuneButton
                disabled={!isTimeValid}
                className="w-full"
                primary
                onClick={handleSubmit}
              >
                <span>{step === 0 ? t('next') : t('select')}</span>
              </TuneButton>
            </div>
          </>
        ),
      }}
    </BaseModal>
  );
};

export default ModalSelectDate;
