import React from 'react';
import styles from './MemberItem.module.scss';
import { SFText } from 'sfui';
import { Avatar } from '../../../../Components';
import { ShiftMember } from '../../../../Models';

export interface MemberItemProps {
  member: ShiftMember;
}

export const MemberItem = ({
  member
}: MemberItemProps): React.ReactElement<MemberItemProps> => {
  return (
    <div className={styles.memberItem}>
      <Avatar name={member.name} url={member.avatar_thumbnail_url} />
      <SFText type="component-2">{member.name}</SFText>
    </div>
  );
};
