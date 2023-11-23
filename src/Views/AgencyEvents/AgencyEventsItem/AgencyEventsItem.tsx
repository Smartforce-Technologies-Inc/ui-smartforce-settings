import React from 'react';
import styles from './AgencyEventsItem.module.scss';
import { SFText } from 'sfui';
import { AgencyEventType } from '../../../Models';

export interface AgencyEventsItemProps {
  event: AgencyEventType;
}

export const AgencyEventsItem = ({
  event
}: AgencyEventsItemProps): React.ReactElement<AgencyEventsItemProps> => {
  return (
    <div className={styles.agencyEventsItem}>
      <div
        className={styles.eventColor}
        style={{ backgroundColor: event.color }}
      />
      <SFText type="component-2">{event.name}</SFText>
    </div>
  );
};
