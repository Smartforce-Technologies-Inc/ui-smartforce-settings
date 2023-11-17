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
  onEdit: (event: AgencyEvent) => void;
}

export const AgencyEventsList = ({
  events,
  onDelete,
  onEdit
}: AgencyEventsListProps): React.ReactElement<AgencyEventsListProps> => {
  return (
    <div className={styles.agencyAreasList}>
      <TransitionGroup>
        {events.map((event: AgencyEvent, index: number) => (
          <SFCollapse key={`${event.name}-${index}`} timeout={480}>
            <AgencyEventsListItem
              event={event}
              onDelete={() => onDelete(event)}
              onEdit={() => onEdit(event)}
            />
            {index < events.length - 1 && <Divider />}
          </SFCollapse>
        ))}
      </TransitionGroup>
    </div>
  );
};
