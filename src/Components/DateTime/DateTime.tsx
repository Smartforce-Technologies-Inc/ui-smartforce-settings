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
  disableFuture?: boolean;
  value: DateTimeValue;
  onChange: (value: DateTimeValue) => void;
}

export const DateTime = ({
  label,
  disableFuture = false,
  value,
  onChange
}: DateTimeProps): React.ReactElement<DateTimeProps> => {
  return (
    <div className={styles.dateTime}>
      <SFDatePicker
        disableFuture={disableFuture}
        label={`${label} date`}
        required
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
        required
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
