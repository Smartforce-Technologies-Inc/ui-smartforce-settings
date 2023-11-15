import React from 'react';
import { ShiftMember } from '../../../../Models';
import { TransitionGroup } from 'react-transition-group';
import { SFCollapse } from 'sfui';
import { Divider } from '../../../../Components/Divider/Divider';
import { MemberListItem } from './MemberListItem/MemberListItem';

export interface MemberListProps {
  members: ShiftMember[];
  onRemove: (member: ShiftMember) => void;
}

export const MemberList = ({
  members,
  onRemove
}: MemberListProps): React.ReactElement<MemberListProps> => {
  return (
    <TransitionGroup component="div">
      {members.map((member: ShiftMember, index: number) => (
        <SFCollapse key={member.id} timeout={480}>
          <MemberListItem
            key={member.id}
            member={member}
            onRemove={() => onRemove(member)}
          />

          {index < members.length - 1 && <Divider size={1} />}
        </SFCollapse>
      ))}
    </TransitionGroup>
  );
};
