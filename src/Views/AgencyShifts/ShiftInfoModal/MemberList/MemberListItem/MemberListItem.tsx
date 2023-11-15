import React from 'react';
import styles from './MemberListItem.module.scss';
import { SFIconButton, SFMenu, SFMenuItem, SFText } from 'sfui';
import { Avatar } from '../../../../../Components/Avatar/Avatar';
import { ShiftMember } from '../../../../../Models';

export interface MemberListItemProps {
  member: ShiftMember;
  onRemove: () => void;
}

export const MemberListItem = ({
  member,
  ...props
}: MemberListItemProps): React.ReactElement<MemberListItemProps> => {
  const [menuAnchorElement, setMenuAnchorElement] = React.useState<
    HTMLButtonElement | undefined
  >(undefined);

  const onMenuOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMenuAnchorElement(e.currentTarget);
  };

  const onMenuClose = () => setMenuAnchorElement(undefined);

  const onRemove = () => {
    onMenuClose();
    props.onRemove();
  };

  return (
    <div className={styles.memberListItem}>
      <Avatar name={member.name} url={member.avatar_thumbnail_url} />
      <SFText type="component-2">{member.name}</SFText>
      <SFIconButton
        rotate="left"
        sfIcon="Other"
        sfSize="medium"
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
        <SFMenuItem onClick={onRemove}>Remove from shift</SFMenuItem>
      </SFMenu>
    </div>
  );
};
