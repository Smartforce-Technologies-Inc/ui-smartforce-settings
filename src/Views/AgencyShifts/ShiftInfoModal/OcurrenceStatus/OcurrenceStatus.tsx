import React, { useContext } from 'react';
import moment from 'moment';
import { SFChip } from 'sfui';
import { Customer, ShiftRecurrence } from '../../../../Models';
import { CustomerContext } from '../../../../Context';
import { getNow } from '../../../../Helpers';

export type OccurrenceStatusType = 'Finish soon' | 'In progress';

const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

function isActiveDay(recurrence: ShiftRecurrence, day: number): boolean {
  return recurrence.days.includes(days[day]);
}

function getStatus(
  now: moment.Moment,
  start: string,
  end: string,
  recurrence: ShiftRecurrence
): OccurrenceStatusType | undefined {
  const startM = moment(start);
  const endM = moment(end);

  // Check if has an occurence for today
  // today > started datetime and today is a recurrence day
  if (now.isAfter(start) && isActiveDay(recurrence, now.day())) {
    // Get today's occurrence dates
    const occurenceStart = now.clone().set({
      hour: startM.hour(),
      minute: startM.minute()
    });
    const occurenceEnd = now.clone().set({
      hour: endM.hour(),
      minute: endM.minute()
    });

    // Check if occurrence it's active
    if (now.isBetween(occurenceStart, occurenceEnd)) {
      if (occurenceEnd.diff(now, 'hours') < 1) {
        return 'Finish soon';
      } else {
        return 'In progress';
      }
    }
  }

  return;
}

export interface OcurrenceStatusProps {
  start: string;
  end: string;
  recurrence: ShiftRecurrence;
}

export const OcurrenceStatus = ({
  start,
  end,
  recurrence
}: OcurrenceStatusProps): React.ReactElement<OcurrenceStatusProps> | null => {
  const customer = useContext(CustomerContext).customer as Customer;
  const now = getNow(customer.timezone);
  const status: OccurrenceStatusType | undefined = getStatus(
    now,
    start,
    end,
    recurrence
  );
  const variant = status === 'Finish soon' ? 'outlined' : 'default';

  return status ? (
    <SFChip size="small" sfColor="primary" label={status} variant={variant} />
  ) : null;
};
