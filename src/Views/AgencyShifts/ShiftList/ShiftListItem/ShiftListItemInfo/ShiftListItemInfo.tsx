import React from 'react';
import styles from './ShiftListItemInfo.module.scss';
import moment from 'moment';
import { SFText } from 'sfui';
import { ShiftListItem } from '../../../../../Models';

const DAYS_DICT: Record<string, string> = {
  MO: 'Monday',
  TU: 'Tuesday',
  WE: 'Wednesday',
  TH: 'Thursday',
  FR: 'Friday',
  SA: 'Saturday',
  SU: 'Sunday'
};

function getDaysLabel(shift: ShiftListItem): string {
  let msg: string = `Every week on `;
  shift.recurrence.days.forEach((day: string, index: number) => {
    const isLast: boolean = index === shift.recurrence.days.length - 1;

    if (shift.recurrence.days.length > 1 && isLast) {
      msg += `and `;
    }

    msg += DAYS_DICT[day];

    if (!isLast) msg += ', ';
  });

  msg += ` from ${moment(shift.start.datetime).format('HH:mm')} to ${moment(
    shift.end.datetime
  ).format('HH:mm')}`;

  return msg;
}

export interface ShiftListItemInfoProps {
  shift: ShiftListItem;
}

export const ShiftListItemInfo = ({
  shift
}: ShiftListItemInfoProps): React.ReactElement<ShiftListItemInfoProps> => {
  return (
    <div className={styles.shiftListItemInfo}>
      <div>
        <SFText type="component-2">{shift.name}</SFText>

        <SFText type="component-2-medium" sfColor="neutral">
          {getDaysLabel(shift)}
        </SFText>
      </div>

      {/* // TODO add when available */}
      {/* {shift.status === 'Inactive' && (
        <InactiveDaysMessage
          className={styles.deleteMsg}
          date={shift.updated_at as string}
        />
      )} 
      
      <div className={styles.status}>
        <SFChip
          sfColor={shift.status === 'Active' ? 'primary' : 'default'}
          size="small"
          variant="outlined"
          label={shift.status}
        />
      </div> */}
    </div>
  );
};
