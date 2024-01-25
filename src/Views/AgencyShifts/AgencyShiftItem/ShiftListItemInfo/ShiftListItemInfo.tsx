import React from 'react';
import styles from './ShiftListItemInfo.module.scss';
import { SFText } from 'sfui';
import { ShiftListItem } from '../../../../Models';
import { getRecurrenceString, getTimeRangeString } from '../../../../Helpers';
import { InactiveDaysMessage } from '../../../../Components/InactiveDaysMessage/InactiveDaysMessage';

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
          {`${getRecurrenceString(shift.recurrence)} from ${getTimeRangeString(
            shift.start.datetime,
            shift.end.datetime
          )}`}
        </SFText>
      </div>

      {shift.status === 'Inactive' && (
        <InactiveDaysMessage label="shift" date={shift.updated_at as string} />
      )}
    </div>
  );
};
