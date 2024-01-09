import moment from 'moment';
import { DAYS_DICT } from '../Constants';
import { ShiftRecurrence } from '../Models';

export const formatDateString = (isoDate: string, format: string): string => {
  return moment(new Date(isoDate)).format(format);
};

export const formatUTCDateString = (
  isoDate: string,
  format: string
): string => {
  return moment(new Date(isoDate)).utc().format(format);
};

export const upperFirstChar = (text: string): string => {
  return `${text[0].toUpperCase()}${text.substring(1, text.length)}`;
};

export const getStringAbbreviation = (value: string): string => {
  const reg = /^([a-zA-Z])|\s([a-zA-Z])/g;
  const abbreviation = value.match(reg);
  let stringAbbreviation: string = '';

  if (abbreviation) {
    stringAbbreviation = abbreviation[0].replace(/\s+/g, '');

    if (abbreviation.length >= 2) {
      stringAbbreviation += abbreviation[1].replace(/\s+/g, '');
    }

    if (abbreviation.length >= 3) {
      stringAbbreviation += abbreviation[2].replace(/\s+/g, '');
    }
  }

  return stringAbbreviation;
};

export function formatArrayToString<T>(value: T[]): string {
  return value.join(', ');
}

export function getRecurrenceString(recurrence: ShiftRecurrence): string {
  let msg: string = `Every week on `;
  recurrence.days.forEach((day: string, index: number) => {
    const isLast: boolean = index === recurrence.days.length - 1;

    if (recurrence.days.length > 1 && isLast) {
      msg += ` and `;
    }

    msg += DAYS_DICT[day];

    if (!isLast) msg += ', ';
  });

  return msg;
}

export function getTimeRangeString(start: string, end: string): string {
  return `${moment(start).format('HH:mm')} to ${moment(end).format('HH:mm')}`;
}

export function getNumberString(value: number): string {
  return value.toString().padStart(2, '0');
}
