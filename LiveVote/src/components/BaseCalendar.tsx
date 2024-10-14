import React, { useMemo, useState } from 'react';
import i18n from '../utils/i18n';
import '../assets/css/baseCalender.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const BaseCalendar: React.FC<Props> = ({ value, onChange, className }) => {
  const [yearNow, monthNow] = value
    ? value.split('-')
    : [new Date().getFullYear(), new Date().getMonth()];

  const [input, setInput] = useState(value);
  const [year, setYear] = useState(Number(yearNow));
  const [month, setMonth] = useState(Number(monthNow) - 1);

  const fullYear = useMemo(
    () => new Date(year, month).getFullYear(),
    [year, month]
  );
  const days = useMemo(
    () => new Date(year, month + 1, 0).getDate(),
    [year, month]
  );
  const emptyDays = useMemo(
    () => new Date(year, month, 1).getDay(),
    [year, month]
  );

  const today = useMemo(() => {
    return formatDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
  }, []);

  const daysOfWeek = useMemo(() => {
    const sunday = new Date(2017, 0, 0);
    return [...Array(7)].map(() => {
      sunday.setDate(sunday.getDate() + 1);
      return sunday.toLocaleDateString(i18n.language, {
        weekday: 'short',
      });
    });
  }, [i18n.language]);

  const monthName = useMemo(() => {
    const name = new Date(year, month).toLocaleString(i18n.language, {
      month: 'long',
    });
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  }, [year, month, i18n.language]);

  function formatDate(year: number, month: number, day: number) {
    let date = new Date(year, month, day);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  }

  function toggleDay(year: number, month: number, day: number) {
    const newInput = formatDate(year, month, day);
    setInput(newInput);
    onChange(newInput);
  }

  function isSelectable(year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    const dateNow = new Date().setHours(0, 0, 0, 0);
    return !(dateNow - Number(date) > 0);
  }

  return (
    <div className={`calendar ${className}`}>
      <div className="mb-2 flex items-center">
        <div className="w-1/4 text-left">
          <button
            className="iconfont iconback text-lg font-semibold text-skin-text"
            onClick={() => setMonth((prev) => prev - 1)}
          />
        </div>
        <h4 className="h-full w-full text-center">
          {monthName} {fullYear}
        </h4>
        <div className="w-1/4 text-right">
          <button
            className="iconfont icongo text-lg font-semibold text-skin-text"
            onClick={() => setMonth((prev) => prev + 1)}
          />
        </div>
      </div>
      <div className="overflow-hidden border-l border-t">
        {daysOfWeek.map((dayOfWeek) => (
          <div key={dayOfWeek} className="day border-b border-r text-skin-link">
            {dayOfWeek}
          </div>
        ))}
        {[...Array(emptyDays)].map((_, index) => (
          <div key={`empty-${index}`} className="day border-b border-r" />
        ))}
        {[...Array(days)].map((_, day) => (
          <div key={day}>
            {isSelectable(year, month, day) ? (
              <a
                className={`day border-b border-r bg-transparent text-skin-link hover:bg-skin-link hover:text-skin-bg 
                  ${
                    formatDate(year, month, day) === today
                      ? 'ring-1 ring-inset ring-skin-primary'
                      : ''
                  } 
                  ${
                    input.includes(formatDate(year, month, day))
                      ? '!bg-skin-link !text-skin-bg'
                      : ''
                  }`}
                onClick={() => toggleDay(year, month, day)}
                onKeyDown={() => toggleDay(year, month, day)}
                tabIndex={0}
              >
                {day}
              </a>
            ) : (
              <div
                key={day}
                className="day cursor-not-allowed border-b border-r text-skin-border"
              >
                {day}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseCalendar;
