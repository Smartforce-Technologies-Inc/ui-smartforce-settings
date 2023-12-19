import React from 'react';
import { Loader, PanelModal } from '../../../Components';
import { ShiftHistory, ShiftHistoryChange, User } from '../../../Models';
import { SFTimeline, SFTimelineItem } from 'sfui';
import {
  formatArrayToString,
  formatDateString,
  getRecurrenceString
} from '../../../Helpers';
import { UserContext } from '../../../Context';
import { HistoryTimeLineItem } from '../../../Components/HistoryTimeLineItem/HistoryTimeLineItem';

const getHistoryItemValue = (
  history: ShiftHistory,
  activeUser: User
): SFTimelineItem => {
  let subTitle: string = '';
  const userName: string = `${history.created_by_user.name}${
    activeUser.id === history.created_by_user.id ? ' (You)' : ''
  }`;
  const historyChanges: ShiftHistoryChange = history.changes;

  switch (history.type) {
    case 'create':
      subTitle = `Created shift \nTitle: ${historyChanges.name} \nAcronym: ${
        historyChanges.acronym
      } \nRepeat: ${getRecurrenceString(
        historyChanges.recurrence
      )} \nTime: ${formatDateString(
        historyChanges.start.datetime,
        'HH:mm'
      )} to ${formatDateString(
        historyChanges.end.datetime,
        'HH:mm'
      )} \nAreas:${formatArrayToString(
        historyChanges.areas
      )} \nMinimum staffing: ${
        historyChanges.min_staff
      } \nMembers: ${formatArrayToString(
        historyChanges.participants.map((p) => p.name)
      )}`;
      break;
    case 'restore':
      subTitle = `Restored shift`;
      break;
    case 'add_participants':
      subTitle = `Added members: ${formatArrayToString(
        historyChanges.participants.map((p) => p.name)
      )}`;
      break;
    case 'remove_participants':
      subTitle = `Removed members: ${formatArrayToString(
        historyChanges.participants.map((p) => p.name)
      )}`;
      break;
    case 'add_backups':
      subTitle = `Added backups: ${formatArrayToString(
        historyChanges.backups.map((b) => b.name)
      )}`;
      break;
    case 'remove_backups':
      subTitle = `Removed backups: ${formatArrayToString(
        historyChanges.backups.map((b) => b.name)
      )}`;
      break;
    default:
      subTitle = 'Deleted shift';
      break;
  }

  return {
    title: formatDateString(history.created_at, 'MM/DD/YYYY'),
    children: (
      <HistoryTimeLineItem
        userName={userName}
        avatarUrl={history.created_by_user.avatar_thumbnail_url}
      />
    ),
    subtitle: subTitle
  };
};

export interface ShiftHistoryModalProps {
  isOpen: boolean;
  isLoading: boolean;
  history?: ShiftHistory[];
  onClose: () => void;
  onBack: () => void;
}

export const ShiftHistoryModal = (
  props: ShiftHistoryModalProps
): React.ReactElement<ShiftHistoryModalProps> => {
  const user = React.useContext(UserContext).user as User;

  return (
    <PanelModal
      title="View history"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onBack={props.onBack}
      dialogCloseButton={{
        label: 'Close',
        sfColor: 'grey',
        onClick: props.onBack
      }}
    >
      {props.isLoading && <Loader />}
      {!props.isLoading && props.history && props.history.length > 0 && (
        <SFTimeline
          items={props.history.map((h) => getHistoryItemValue(h, user))}
        />
      )}
    </PanelModal>
  );
};
