import React from 'react';
import styles from './RepeatInfo.module.scss';
import { ShiftRecurrence } from '../../../../../Models';
import { getRecurrenceString } from '../../../../../Helpers';
import { SFText } from 'sfui';

export interface RepeatInfoProps {
  startDate: moment.Moment;
  startTime: string;
  endTime: string;
  recurrence: ShiftRecurrence;
}

export const RepeatInfo = ({
  startDate,
  startTime,
  endTime,
  recurrence
}: RepeatInfoProps): React.ReactElement<RepeatInfoProps> => {
  return (
    <div className={styles.repeatInfo}>
      <SFText type="component-1">
        {`${getRecurrenceString(
          recurrence
        )} from ${startTime} to ${endTime} starting on ${startDate.format(
          'MM/DD/YYYY'
        )}`}
      </SFText>
    </div>
  );
};
