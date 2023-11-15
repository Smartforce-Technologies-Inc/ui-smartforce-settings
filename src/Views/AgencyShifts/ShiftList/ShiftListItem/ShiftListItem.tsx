import React, { useRef } from 'react';
import styles from './ShiftListItem.module.scss';
import { SFIconButton, SFMenu } from 'sfui';
import { Avatar } from '../../../../Components';
import { ShiftListItem as Shift } from '../../../../Models';
import { ShiftListItemInfo } from './ShiftListItemInfo/ShiftListItemInfo';

export interface ShiftListItemProps {
  shift: Shift;
  onInfo: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onRestore: () => void;
  onViewHistory: () => void;
}

export const ShiftListItem = ({
  shift,
  ...props
}: ShiftListItemProps): React.ReactElement<ShiftListItemProps> => {
  const [menuAnchorElement, setMenuAnchorElement] = React.useState<
    HTMLButtonElement | undefined
  >(undefined);

  const refButton = useRef<HTMLButtonElement>(null);

  const onMenuOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Needed to avoid automatic scrolling to edited item
    refButton.current?.blur();
    setMenuAnchorElement(e.currentTarget);
  };

  const onMenuClose = () => setMenuAnchorElement(undefined);

  const onInfo = () => {
    props.onInfo();
    onMenuClose();
  };

  const onRestore = () => {
    props.onRestore();
    onMenuClose();
  };

  const onEdit = () => {
    props.onEdit();
    onMenuClose();
  };

  const onViewHistory = () => {
    props.onViewHistory();
    onMenuClose();
  };

  const onDelete = () => {
    props.onDelete();
    onMenuClose();
  };

  return (
    <div className={styles.shiftListItem}>
      <Avatar size="small" acronym={shift.acronym} />

      <ShiftListItemInfo shift={shift} />

      <div>
        <SFIconButton
          innerRef={refButton}
          rotate="left"
          sfIcon="Other"
          sfSize="small"
          onClick={onMenuOpen}
        />

        <SFMenu
          className={styles.optionsMenu}
          autoFocus={false}
          anchorEl={menuAnchorElement}
          open={Boolean(menuAnchorElement)}
          onClose={onMenuClose}
          variant="menu"
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {/* // TODO uncomment when available */}
          {/* {shift.status === 'Inactive' && (
            <SFMenuItem onClick={onRestore}>Restore shift</SFMenuItem>
          )}

          {shift.status === 'Active' && (
            <SFMenuItem onClick={onEdit}>Edit shift</SFMenuItem>
          )}
          {shift.status === 'Active' && (
            <SFMenuItem onClick={onInfo}>See shift information</SFMenuItem>
          )}
          {shift.status === 'Active' && (
            <SFMenuItem onClick={onViewHistory}>View history</SFMenuItem>
          )}
          {shift.status === 'Active' && (
            <SFMenuItem onClick={onDelete} disabled>
              <div className={styles.deleteOption}>
                Delete
                <SFChip sfColor="default" size="small" label="Coming Soon" />
              </div>
            </SFMenuItem>
          )} */}
        </SFMenu>
      </div>
    </div>
  );
};
