import React from 'react';
import styles from './AgencyEventsListItem.module.scss';
import { SFIconButton, SFMenu, SFMenuItem, SFText } from 'sfui';
import { AgencyEvent } from '../../../../Models';

export interface AgencyEventsListItemProps {
  event: AgencyEvent;
  onDelete: () => void;
  onEdit: () => void;
}

export const AgencyEventsListItem = ({
  event,
  onDelete,
  onEdit
}: AgencyEventsListItemProps): React.ReactElement<AgencyEventsListItemProps> => {
  const [menuAnchorElement, setMenuAnchorElement] = React.useState<
    HTMLButtonElement | undefined
  >(undefined);

  const onMenuOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMenuAnchorElement(e.currentTarget);
  };

  const onMenuClose = () => setMenuAnchorElement(undefined);

  const onEventDelete = () => {
    onDelete();
    onMenuClose();
  };

  const onEventEdit = () => {
    onEdit();
    onMenuClose();
  };

  return (
    <div className={styles.agencyEventsListItem}>
      <div
        className={styles.eventColor}
        style={{ backgroundColor: event.color }}
      />
      <SFText type="component-2">{event.name}</SFText>
      <div
        className={styles.menu}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <SFIconButton
          rotate="left"
          sfIcon="Other"
          sfSize="small"
          onClick={onMenuOpen}
        />

        <SFMenu
          autoFocus={false}
          anchorEl={menuAnchorElement}
          open={Boolean(menuAnchorElement)}
          onClose={onMenuClose}
          variant="menu"
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <SFMenuItem onClick={onEventEdit}>Edit event type</SFMenuItem>
          {/*<SFMenuItem onClick={onEventDelete}>Delete Event</SFMenuItem>*/}
        </SFMenu>
      </div>
    </div>
  );
};
