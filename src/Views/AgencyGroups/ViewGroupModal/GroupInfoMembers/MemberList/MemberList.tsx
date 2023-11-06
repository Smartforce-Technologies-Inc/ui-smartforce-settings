import React, { useContext } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { GroupMember, User } from '../../../../../Models';
import { MemberListItem } from './MemberListItem/MemberListItem';
import { UserContext } from '../../../../../Context';
import { Divider } from '../../../../../Components/Divider/Divider';
import { SFCollapse } from 'sfui';

export interface MemberListProps {
  isActive: boolean;
  members: GroupMember[];
  onRemove: (member: GroupMember) => void;
}

export const MemberList = ({
  isActive,
  members,
  onRemove
}: MemberListProps): React.ReactElement<MemberListProps> => {
  const user = useContext(UserContext).user as User;

  return (
    <TransitionGroup component="div">
      {members.map((member: GroupMember, index: number) => (
        <SFCollapse key={member.id} timeout={480}>
          <MemberListItem
            key={member.id}
            isActive={isActive}
            member={member}
            onRemove={() => onRemove(member)}
            user={user}
          />

          {index < members.length - 1 && <Divider size={1} />}
        </SFCollapse>
      ))}
    </TransitionGroup>
  );
};
