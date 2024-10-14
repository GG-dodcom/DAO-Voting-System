import React from 'react';
import { format } from 'date-fns';
import { t } from 'i18next';
import { InputDate } from '.';

interface Props {
  delay?: number | null;
  isEditing?: boolean;
  date: number;
  onSelect: (date: number) => void; // Callback for the select event
}

const SpaceCreateVotingDateStart: React.FC<Props> = ({
  delay = 0,
  isEditing = false,
  date,
  onSelect,
}) => {
  const isDisabled = !!delay || isEditing;

  //Define the date format to match 'Oct 15, 2024, 12:47 PM'
  const dateFormat = 'MMM dd, yyyy, hh:mm a';

  // Check if the date is the current date
  const dateString =
    Math.round(date / 10) ===
    Math.round(Number((Date.now() / 1e3).toFixed()) / 10)
      ? t('create.now')
      : format(date * 1e3, dateFormat);

  return (
    <InputDate
      type="start"
      title={t('create.start')}
      disabled={isDisabled}
      date={date}
      dateString={dateString}
      tooltip={!!delay && !isEditing ? t('create.delayEnforced') : null}
      onInputDate={(newDate) => onSelect(newDate)}
    />
  );
};

export default SpaceCreateVotingDateStart;
