import React, { useRef } from 'react';
import styles from './GroupListItem.module.scss';
import { Group } from '../../../../Models';
import { Avatar } from '../../../../Components/Avatar/Avatar';
import { GroupListItemInfo } from './GroupListItemInfo/GroupListItemInfo';
import { SFIconButton, SFMenu, SFMenuItem } from 'sfui';

export interface GroupListItemProps {
  group: Group;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onRestore: () => void;
  onViewHistory: () => void;
}

export const GroupListItem = ({
  group,
  onClick,
  ...props
}: GroupListItemProps): React.ReactElement<GroupListItemProps> => {
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
    <div className={styles.groupListItem} onClick={onClick}>
      <Avatar
        size="small"
        url={group.avatar_thumbnail_url}
        acronym={group.acronym}
      />
      <GroupListItemInfo group={group} />
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
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
          {group.status === 'Inactive' && (
            <SFMenuItem onClick={onRestore}>Restore group</SFMenuItem>
          )}

          {group.status === 'Active' && (
            <SFMenuItem onClick={onEdit}>Edit group</SFMenuItem>
          )}
          {group.status === 'Active' && (
            <SFMenuItem onClick={onViewHistory}>View history</SFMenuItem>
          )}
          {group.status === 'Active' && (
            <SFMenuItem onClick={onDelete}>Delete</SFMenuItem>
          )}
        </SFMenu>
      </div>
    </div>
  );
};
