import React from 'react';
import styles from './DateTime.module.scss';
import moment from 'moment';
import { SFDatePicker, SFMenuOption, SFSelect } from 'sfui';

function getNumberString(value: number): string {
  return value.toString().padStart(2, '0');
}

function getTimeOptions(): string[] {
  let options: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 50; minute = minute + 15) {
      options.push(`${getNumberString(hour)}:${getNumberString(minute)}`);
    }
  }

  return options;
}

const TIME_OPTIONS: SFMenuOption[] = getTimeOptions().map((o: string) => ({
  label: o,
  value: o
}));

export interface DateTimeValue {
  date: moment.Moment | null;
  time: string;
}

export interface DateTimeProps {
  label: string;
  value: DateTimeValue;
  onChange: (value: DateTimeValue) => void;
}

export const DateTime = ({
  label,
  value,
  onChange
}: DateTimeProps): React.ReactElement<DateTimeProps> => {
  return (
    <div className={styles.dateTime}>
      <SFDatePicker
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
