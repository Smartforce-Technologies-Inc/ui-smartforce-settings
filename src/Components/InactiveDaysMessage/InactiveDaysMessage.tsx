import React from 'react';
import moment from 'moment';
import { SFText } from 'sfui';

const GROUP_INACTIVE_DAYS = 30;

export interface InactiveDaysMessageProps {
  className?: string;
  date: string;
  label: string;
}

export const InactiveDaysMessage = ({
  className = '',
  date,
  label
}: InactiveDaysMessageProps): React.ReactElement<InactiveDaysMessageProps> => {
  const remainingDays: number =
    GROUP_INACTIVE_DAYS - moment().diff(moment(date), 'days');

  return (
    <SFText className={className} type="component-2" sfColor="error">
      The {label} will be deleted in {remainingDays} days if it is not restored.
    </SFText>
  );
};
