import React from 'react';
import styles from './ShiftInfoModal.module.scss';
import { Avatar, PanelModal } from '../../../Components';
import { Divider } from '../../../Components/Divider/Divider';
import { Shift, ShiftMember } from '../../../Models';
import { SFText } from 'sfui';
import {
  formatArrayToString,
  formatDateString,
  getDaysLabel
} from '../../../Helpers';
import { ShiftInfoModalItem } from './ShiftInfoModalItem/ShiftInfoModalItem';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { ListManagment } from '../../../Components/ListManagment/ListManagment';
import { MemberList } from './MemberList/MemberList';
import { AddMembersModal } from './AddMembersModal/AddMembersModal';

const filterShiftMembers = (
  list: ShiftMember[],
  filter: string
): ShiftMember[] => {
  if (filter.length < 3) {
    return list;
  }

  return list.filter((l: ShiftMember) =>
    l.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export interface ShiftInfoModalProps {
  isOpen: boolean;
  shift: Shift;
  onClose: () => void;
  onBack: () => void;
}

export const ShiftInfoModal = ({
  isOpen,
  shift,
  onClose,
  onBack
}: ShiftInfoModalProps): React.ReactElement<ShiftInfoModalProps> => {
  const [isAddMembersOpen, setIsAddMembersOpen] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const onMemberRemove = (member: ShiftMember) => {
    // TODO add BE integration
  };

  const onAddMembers = () => {
    // TODO add BE integration
  };

  return (
    <PanelModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      dialogCloseButton={{
        label: 'Close',
        sfColor: 'grey',
        onClick: onBack
      }}
    >
      <AddMembersModal
        isOpen={isAddMembersOpen}
        isSaving={isSaving}
        onAdd={onAddMembers}
        onBack={() => setIsAddMembersOpen(false)}
        onClose={() => {
          onClose();
          setIsAddMembersOpen(false);
        }}
      />
      <div className={styles.shiftInfoModal}>
        <Avatar acronym={shift.acronym} size="large" />
        <div className={styles.header}>
          <SFText type="component-title">{shift.name}</SFText>
        </div>

        <div className={styles.content}>
          <ShiftInfoModalItem icon="Refresh" text={getDaysLabel(shift)} />
          <ShiftInfoModalItem
            icon="Clock"
            text={`${formatDateString(
              shift.start.datetime,
              'HH:mm'
            )} to ${formatDateString(shift.end.datetime, 'HH:mm')}`}
          />
          <ShiftInfoModalItem
            icon="Callendar"
            text={`From ${formatDateString(shift.start.datetime, 'L')}`}
          />
          {shift.areas && (
            <ShiftInfoModalItem
              icon="Map"
              text={formatArrayToString(shift.areas.map((a) => a.name))}
            />
          )}
          {shift.supervisor && (
            <ShiftInfoModalItem icon="User-1" text={shift.supervisor.name} />
          )}
        </div>
        <Divider />
        <div>
          <ShiftInfoModalItem icon="Users" text="Minimum Staffing" />
          <ProgressBar value={shift.members.length} peak={shift.min_staff} />
        </div>
        <Divider />
        <ListManagment
          actionButtonLabel="Add Members"
          emptyMessage="There are no members yet."
          label="Member"
          list={shift.members}
          isLoading={isLoading}
          filter={filterShiftMembers}
          onCreate={() => setIsAddMembersOpen(true)}
          renderList={(list: ShiftMember[]) => (
            <MemberList members={list} onRemove={onMemberRemove} />
          )}
        />
      </div>
    </PanelModal>
  );
};
