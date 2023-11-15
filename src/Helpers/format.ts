import moment from 'moment';
import { DAYS_DICT } from '../Constants';
import { Shift, ShiftListItem } from '../Models';

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

export function getDaysLabel(
  shift: ShiftListItem | Shift,
  hasTime?: boolean
): string {
  let msg: string = `Every week on `;
  shift.recurrence.days.forEach((day: string, index: number) => {
    const isLast: boolean = index === shift.recurrence.days.length - 1;

    if (shift.recurrence.days.length > 1 && isLast) {
      msg += `and `;
    }

    msg += DAYS_DICT[day];

    if (!isLast) msg += ', ';
  });

  if (hasTime) {
    msg += ` from ${moment(shift.start.datetime).format('HH:mm')} to ${moment(
      shift.end.datetime
    ).format('HH:mm')}`;
  }

  return msg;
}
