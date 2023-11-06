import React from 'react';
import moment from 'moment';
import { SFText } from 'sfui';

const GROUP_INACTIVE_DAYS = 30;

export interface InactiveDaysMessageProps {
  date: string;
}

export const InactiveDaysMessage = ({
  date
}: InactiveDaysMessageProps): React.ReactElement<InactiveDaysMessageProps> => {
  const remainingDays: number =
    GROUP_INACTIVE_DAYS - moment().diff(moment(date), 'days');

  return (
    <SFText type="component-2" sfColor="error">
      The group will be deleted in {remainingDays} days if it is not restored.
    </SFText>
  );
};
