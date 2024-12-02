import React from 'react';
import i18n from '../utils/i18n';
import { t } from 'i18next';
import { InputDate } from '.';

interface Props {
  period?: number | null;
  isEditing?: boolean;
  date: number;
  onSelect: (date: number) => void; // Callback for date selection
}

const SpaceCreateVotingDateEnd: React.FC<Props> = ({
  period = 0,
  isEditing = false,
  date,
  onSelect,
}) => {
  //Define the date format to match 'Oct 15, 2024, 12:47 PM'
  // const dateFormat = 'MMM dd, yyyy, hh:mm a';

  // Formatting the date using Intl.DateTimeFormat
  const formatDate = (timestamp: number, locale: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short', // e.g., "Oct"
      day: 'numeric', // e.g., "15"
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat(locale, options).format(new Date(timestamp));
  };

  const dateString = formatDate(date * 1000, i18n.language); // Format the date
  const isDisabled = !!period || isEditing;

  return (
    <InputDate
      type="end"
      title={t('create.end')}
      disabled={isDisabled}
      date={date}
      dateString={dateString}
      tooltip={!!period && !isEditing ? t('create.periodEnforced') : null}
      onInputDate={(newDate) => onSelect(newDate)} // Pass the selected date to the parent component
    />
  );
};

export default SpaceCreateVotingDateEnd;
