import React from 'react';
import styles from './AgencyEventsList.module.scss';
import { TransitionGroup } from 'react-transition-group';
import { AgencyEvent } from '../../../Models';
import { AgencyEventsListItem } from './AgencyEventsListItem/AgencyEventsListItem';
import { SFCollapse } from 'sfui';
import { Divider } from '../../../Components/Divider/Divider';

export interface AgencyEventsListProps {
  events: AgencyEvent[];
  onDelete: (event: AgencyEvent) => void;
}

export const AgencyEventsList = ({
  events,
  onDelete
}: AgencyEventsListProps): React.ReactElement<AgencyEventsListProps> => {
  return (
    <div className={styles.agencyAreasList}>
      <TransitionGroup>
        {events.map((event: AgencyEvent, index: number) => (
          <SFCollapse key={event.name} timeout={480}>
            <AgencyEventsListItem
              event={event}
              onDelete={() => onDelete(event)}
            />
            {index < events.length - 1 && <Divider />}
          </SFCollapse>
        ))}
      </TransitionGroup>
    </div>
  );
};
