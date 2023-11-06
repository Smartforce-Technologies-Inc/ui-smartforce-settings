import moment from 'moment';

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
