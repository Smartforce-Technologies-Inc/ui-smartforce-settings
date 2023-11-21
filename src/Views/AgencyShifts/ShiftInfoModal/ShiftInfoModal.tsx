import React, { Fragment } from 'react';
import styles from './ShiftInfoModal.module.scss';
import { Avatar, PanelModal } from '../../../Components';
import { Divider } from '../../../Components/Divider/Divider';
import { SettingsError, Shift, ShiftMember } from '../../../Models';
import { SFPeopleOption, SFSpinner, SFText } from 'sfui';
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
import { addShiftMembers } from '../../../Services';
import { ApiContext } from '../../../Context';

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
  isLoading: boolean;
  shift?: Shift;
  onClose: () => void;
  onBack: () => void;
  onError: (e: SettingsError) => void;
}

export const ShiftInfoModal = ({
  isOpen,
  shift,
  onClose,
  onBack,
  onError,
  ...props
}: ShiftInfoModalProps): React.ReactElement<ShiftInfoModalProps> => {
  const apiBaseUrl = React.useContext(ApiContext).shifts;
  const [isAddMembersOpen, setIsAddMembersOpen] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const onMemberRemove = (member: ShiftMember) => {
    // TODO add BE integration
  };

  const onAddMembers = async (members: SFPeopleOption[]) => {
    const newMembers = members.map((m: SFPeopleOption) => ({
      id: m.asyncObject.id
    }));
    setIsSaving(true);

    try {
      if (shift) {
        await addShiftMembers(apiBaseUrl, shift.id, newMembers);
        setIsSaving(false);
        setIsAddMembersOpen(false);
      }
    } catch (e: any) {
      setIsSaving(false);
      onError(e);
    }
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
      <div
        className={`${styles.shiftInfoModal} ${
          props.isLoading ? styles.spinner : ''
        }`}
      >
        {props.isLoading && <SFSpinner />}
        {!props.isLoading && shift && (
          <Fragment>
            <Avatar acronym={shift?.acronym} size="large" />
            <div className={styles.header}>
              <SFText type="component-title">{shift?.name}</SFText>
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
              {shift.areas && shift.areas.length > 0 && (
                <ShiftInfoModalItem
                  icon="Map"
                  text={formatArrayToString(shift.areas.map((a) => a.name))}
                />
              )}
              {shift.supervisor && (
                <ShiftInfoModalItem
                  icon="User-1"
                  text={shift.supervisor.name}
                />
              )}
            </div>
            <Divider />
            <div>
              <ShiftInfoModalItem icon="Users" text="Minimum Staffing" />
              <ProgressBar
                value={shift.participants.length}
                peak={shift.min_staff}
              />
            </div>
            <Divider />
            <ListManagment
              actionButtonLabel="Add Members"
              emptyMessage="There are no members yet."
              label="Member"
              list={shift.participants}
              isLoading={isLoading}
              filter={filterShiftMembers}
              onCreate={() => setIsAddMembersOpen(true)}
              renderList={(list: ShiftMember[]) => (
                <MemberList members={list} onRemove={onMemberRemove} />
              )}
            />
          </Fragment>
        )}
      </div>
    </PanelModal>
  );
};
