import React from 'react';
import moment from 'moment-timezone';
import { Loader, PanelModal } from '../../../Components';
import {
  ShiftHistory,
  ShiftMember,
  User,
  ShiftDate,
  ShiftHistoryChange,
  Customer
} from '../../../Models';
import { SFTimeline, SFTimelineItem } from 'sfui';
import {
  formatArrayToString,
  getRecurrenceString,
  getTimeRangeString
} from '../../../Helpers';
import { CustomerContext, UserContext } from '../../../Context';
import { HistoryTimeLineItem } from '../../../Components/HistoryTimeLineItem/HistoryTimeLineItem';

const getFullSubtitle = (
  historyChanges: ShiftHistoryChange,
  shiftStart: ShiftDate,
  shiftEnd: ShiftDate
): string => {
  let fullSubTitle: string = '';
  if (historyChanges.name) {
    fullSubTitle += `Title: ${historyChanges.name}\n`;
  }
  if (historyChanges.acronym) {
    fullSubTitle += `Acronym: ${historyChanges.acronym}\n`;
  }
  if (historyChanges.recurrence) {
    fullSubTitle += `Repeat: ${getRecurrenceString(
      historyChanges.recurrence
    )}\n`;
  }
  if (historyChanges.start || historyChanges.end) {
    fullSubTitle += `Time: ${getTimeRangeString(
      historyChanges.start?.datetime ?? shiftStart.datetime,
      historyChanges.end?.datetime ?? shiftEnd.datetime
    )}\n`;
  }
  if (historyChanges.areas && historyChanges.areas.length > 0) {
    fullSubTitle += `Areas: ${formatArrayToString(
      historyChanges.areas.map((a) => a.name)
    )}\n`;
  }
  if (historyChanges.min_staff) {
    fullSubTitle += `Minimum staffing: ${historyChanges.min_staff}\n`;
  }
  if (historyChanges.participants && historyChanges.participants.length > 0) {
    fullSubTitle += `Members: ${formatArrayToString(
      historyChanges.participants.map((p) => p.name)
    )}\n`;
  }
  if (historyChanges.backups && historyChanges.backups.length > 0) {
    fullSubTitle += `Backups: ${formatArrayToString(
      historyChanges.backups.map((b) => b.name)
    )}\n`;
  }
  if (historyChanges.supervisor) {
    fullSubTitle += `Supervisor: ${historyChanges.supervisor.name}`;
  }

  return fullSubTitle;
};

const getUpdateSubtitle = (
  historyChanges: ShiftHistoryChange,
  shiftStart: ShiftDate,
  shiftEnd: ShiftDate
): string => {
  let subTitle: string = '';
  const historyChangesCount: number = Object.values(historyChanges).length;
  const historyChangesKeys: string[] = Object.keys(historyChanges);

  // This condition checks if the changes are in the start and end time because they should be in one line
  // not as part of multiple changes

  if (
    historyChangesCount === 1 ||
    (historyChangesCount === 2 &&
      historyChangesKeys.includes('start') &&
      historyChangesKeys.includes('end'))
  ) {
    if (historyChanges.acronym) {
      subTitle = 'Changed acronym: ' + historyChanges.acronym;
    }
    if (historyChanges.areas) {
      subTitle =
        'Changed areas: ' +
        formatArrayToString(historyChanges.areas.map((a) => a.name));
    }
    if (historyChanges.end || historyChanges.start) {
      subTitle = `Changed time: ${getTimeRangeString(
        historyChanges.start?.datetime ?? shiftStart.datetime,
        historyChanges.end?.datetime ?? shiftEnd.datetime
      )}`;
    }
    if (historyChanges.min_staff) {
      subTitle = 'Changed minimum staffing: ' + historyChanges.min_staff;
    }
    if (historyChanges.name) {
      subTitle = 'Changed name: ' + historyChanges.name;
    }
    if (historyChanges.supervisor) {
      subTitle = 'Changed supervisor: ' + historyChanges.supervisor.name;
    }
    if (historyChanges.recurrence) {
      subTitle =
        'Changed repeat: ' + getRecurrenceString(historyChanges.recurrence);
    }
  } else {
    subTitle =
      'Edited Shift \n' + getFullSubtitle(historyChanges, shiftStart, shiftEnd);
  }

  return subTitle;
};

const getHistoryItemValue = (
  history: ShiftHistory,
  activeUser: User,
  shiftStart: ShiftDate,
  shiftEnd: ShiftDate,
  timezone: string
): SFTimelineItem => {
  let subTitle: string = '';
  const userName: string = `${history.created_by_user.name}${
    activeUser.id === history.created_by_user.id ? ' (You)' : ''
  }`;
  const historyChanges: ShiftHistoryChange = history.changes;

  switch (history.type) {
    case 'create':
      subTitle =
        'Created shift \n' +
        getFullSubtitle(historyChanges, shiftStart, shiftEnd);
      break;
    case 'restore':
      subTitle = `Restored shift`;
      break;
    case 'add_participants':
      subTitle = `Added members: ${formatArrayToString(
        (historyChanges.participants as ShiftMember[]).map((p) => p.name)
      )}`;
      break;
    case 'remove_participants':
      subTitle = `Removed members: ${formatArrayToString(
        (historyChanges.participants as ShiftMember[]).map((p) => p.name)
      )}`;
      break;
    case 'add_backups':
      subTitle = `Added backups: ${formatArrayToString(
        (historyChanges.backups as ShiftMember[]).map((b) => b.name)
      )}`;
      break;
    case 'remove_backups':
      subTitle = `Removed backups: ${formatArrayToString(
        (historyChanges.backups as ShiftMember[]).map((b) => b.name)
      )}`;
      break;
    case 'update':
      subTitle = getUpdateSubtitle(historyChanges, shiftStart, shiftEnd);
      break;
    default:
      subTitle = 'Deleted shift';
      break;
  }

  return {
    title: moment(history.created_at).tz(timezone).format('MM/DD/YYYY'),
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
  shiftStart?: ShiftDate;
  shiftEnd?: ShiftDate;
  onClose: () => void;
  onBack: () => void;
}

export const ShiftHistoryModal = (
  props: ShiftHistoryModalProps
): React.ReactElement<ShiftHistoryModalProps> => {
  const user = React.useContext(UserContext).user as User;
  const customer = React.useContext(CustomerContext).customer as Customer;
  const timezone = customer.timezone;

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
      {!props.isLoading &&
        props.history &&
        props.shiftEnd &&
        props.shiftStart &&
        props.history.length > 0 && (
          <SFTimeline
            selectable={false}
            items={props.history.map((h) =>
              getHistoryItemValue(
                h,
                user,
                props.shiftStart as ShiftDate,
                props.shiftEnd as ShiftDate,
                timezone
              )
            )}
          />
        )}
    </PanelModal>
  );
};
