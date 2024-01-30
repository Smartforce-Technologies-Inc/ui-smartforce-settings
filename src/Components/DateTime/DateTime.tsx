import React from 'react';
import styles from './DateTime.module.scss';
import moment from 'moment';
import { SFDatePicker, SFSelect } from 'sfui';
import { getTimeOptions } from '../../Helpers';

const TIME_OPTIONS = getTimeOptions();

export interface DateTimeValue {
  date: moment.Moment | null;
  time: string;
}

export interface DateTimeProps {
  label: string;
  value: DateTimeValue;
  error?: boolean;
  required?: boolean;
  onChange: (value: DateTimeValue) => void;
}

export const DateTime = ({
  error = false,
  required = false,
  label,
  value,
  onChange
}: DateTimeProps): React.ReactElement<DateTimeProps> => {
  const isDateInvalid: boolean = !!value.date && !value.date.isValid();

  return (
    <div className={styles.dateTime}>
      <SFDatePicker
        label={`${label} date`}
        required={required}
        error={isDateInvalid || error}
        value={value.date}
        onChange={(date: moment.Moment) =>
          onChange({
            ...value,
            date
          })
        }
      />

      <SFSelect
        label={`${label} time`}
        required={required}
        error={error}
        value={value.time}
        options={TIME_OPTIONS}
        onChange={(
          e: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
          }>
        ) =>
          onChange({
            ...value,
            time: e.target.value as string
          })
        }
      />
    </div>
  );
};
