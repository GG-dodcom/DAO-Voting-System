/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslation } from 'react-i18next';

/**
 * This is needed since Intl still doesn't support durations:
 * https://github.com/tc39/proposal-intl-duration-format (hopefully soon!)
 *
 * The Intl.relativeTimeFormat API (same as basically all libraries like day.js, timeago.js)
 * only supports phrases like "5 hours ago" or "in 35 minutes". But these time durations can be phrased
 * differently, e.g. we also use "12 hours left" instead of "(ends) in 12 hours". For that you need
 * a simple duration formatter, that turns 3600 into "1 hour" and 180000 into "2 days". More granular
 * formats are possible like "1 hour, 30 minutes" (which will be covered by Intl.Duration).
 * For now, this function just returns the biggest/closest unit and the resulting number from an integer
 * of seconds. (3678 => { duration: 1, unit: 'hour'}) This is accompanied by manual translations in our message
 * catalogues of strings like "second", "seconds", "minute", "minutes", etc.
 */
const getDurationAndUnit = (seconds: number) => {
  let unit: Intl.RelativeTimeFormatUnit = 'second';
  let duration = seconds;
  const abs = Math.abs(seconds);

  if (abs >= 60) {
    unit = 'minute';
    duration = duration / 60;
    if (abs >= 60 * 60) {
      unit = 'hour';
      duration = duration / 60;
      if (abs >= 60 * 60 * 24) {
        unit = 'day';
        duration = duration / 24;
        if (abs >= 60 * 60 * 24 * 365) {
          unit = 'year';
          duration = duration / 365;
        } else if (abs >= 60 * 60 * 24 * 30) {
          unit = 'month';
          duration = duration / 30;
        } else if (abs >= 60 * 60 * 24 * 7) {
          unit = 'week';
          duration = duration / 7;
        }
      }
    }
  }

  duration = Math.round(duration);

  return { duration, unit };
};

export function useIntl() {
  const { t } = useTranslation();
  /**
   * functions to create computed formatters based on locale
   *
   * If you need a custom format in only one component, you can import these
   * functions to create a custom formatter locally in that component, to use
   * it as the formatting functions' 2nd argument.
   * Otherwise you can add a predefined formatter and a formatting function
   * below and add them to the return list.
   */

  const getRelativeTimeFormatter = (
    locale: string = 'en',
    options?: Intl.RelativeTimeFormatOptions
  ) => {
    // Create a new Intl.RelativeTimeFormat instance for the specified locale
    return new Intl.RelativeTimeFormat(
      locale,
      options || { style: 'short', numeric: 'always' }
    );
  };

  const getNumberFormatter = (options?: Intl.NumberFormatOptions) => {
    // Create a new Intl.NumberFormat instance for English locale
    return new Intl.NumberFormat('en', options || { notation: 'standard' });
  };

  /**
   * predefined formatters
   */

  const defaultRelativeTimeFormatter = getRelativeTimeFormatter();
  const longRelativeTimeFormatter = getRelativeTimeFormatter('en', {
    style: 'long',
    numeric: 'always',
  });
  const defaultNumberFormatter = getNumberFormatter(
    // format with two decimal places
    { maximumFractionDigits: 2 }
  );
  const compactNumberFormatter = getNumberFormatter({
    notation: 'compact',
    compactDisplay: 'short',
  });
  const percentNumberFormatter = getNumberFormatter({
    style: 'percent',
    maximumFractionDigits: 2,
  });

  /**
   * formatting functions
   */

  const formatRelativeTime = (
    timestamp: number,
    formatter?: Intl.RelativeTimeFormat
  ) => {
    const relativeTo = new Date().getTime() / 1e3;

    const { duration, unit } = getDurationAndUnit(timestamp - relativeTo);

    formatter = formatter || defaultRelativeTimeFormatter;

    return formatter.format(duration, unit);
  };

  // doesn't use Intl (yet), needs useI18n's t function, to translate the unit
  const formatDuration = (seconds: number) => {
    const { duration, unit } = getDurationAndUnit(seconds);

    return t(`timeUnits.${unit}`, { n: duration });
  };

  const formatNumber = (number: number, formatter?: Intl.NumberFormat) => {
    formatter = formatter || defaultNumberFormatter;

    return formatter.format(number);
  };

  const formatCompactNumber = (number: number) =>
    formatNumber(number, compactNumberFormatter);

  const formatPercentNumber = (number: number) =>
    formatNumber(number, percentNumberFormatter);

  const getRelativeProposalPeriod = (state: any, start: any, end: any): any => {
    if (state === 'closed') {
      return t('endedAgo', {
        0: formatRelativeTime(end, longRelativeTimeFormatter),
      });
    }
    if (state === 'active') {
      return t('endIn', {
        0: formatRelativeTime(end, longRelativeTimeFormatter),
      });
    }
    return t('startIn', {
      0: formatRelativeTime(start, longRelativeTimeFormatter),
    });
  };

  const getPercentFractionDigits = (value: number) => {
    const absValue = Math.abs(value);

    if (absValue === 0) {
      return 0;
    }

    let leadingZeros = 0;
    let tempValue = absValue;
    while (tempValue < 1) {
      tempValue *= 10;
      leadingZeros++;
    }

    return Math.max(1, Math.min(leadingZeros, 8));
  };

  return {
    getRelativeTimeFormatter,
    getNumberFormatter,
    formatRelativeTime,
    formatDuration,
    formatNumber,
    formatCompactNumber,
    formatPercentNumber,
    getRelativeProposalPeriod,
    getPercentFractionDigits,
    longRelativeTimeFormatter,
  };
}
