import React, { Fragment, useContext, useEffect, useState } from 'react';
import styles from './ShiftFormModal.module.scss';
import moment from 'moment';
import {
  DateTimeValue,
  PanelModal,
  PanelModalAnchor
} from '../../../Components';
import {
  SettingsError,
  Shift,
  ShiftArea,
  ShiftFormValue,
  ShiftMember,
  ShiftRequest
} from '../../../Models';
import { ShiftForm } from './ShiftForm/ShiftForm';
import { isEqualObject, upperFirstChar } from '../../../Helpers';
import { SFPeopleOption, SFSpinner } from 'sfui';
import { ApiContext } from '../../../Context';
import { addShift, editShift } from '../../../Services';

const initValue: ShiftFormValue = {
  name: '',
  acronym: '',
  areas: [],
  start: { date: null, time: '' },
  end: { date: null, time: '' },
  recurrence: {
    frequency: 'Weekly',
    interval: 1,
    days: []
  },
  min_staff: '',
  participants: []
};

function getDateValue(isoString: string): DateTimeValue {
  const date = moment(isoString);
  return { date, time: date.format('HH:mm') };
}

function getShiftValue(shift: Shift): ShiftFormValue {
  return {
    name: shift.name,
    acronym: shift.acronym,
    areas: shift.areas
      ? shift.areas.map((a: ShiftArea) => ({
          name: a.name,
          asyncObject: { id: a.id }
        }))
      : [],
    start: getDateValue(shift.start.datetime),
    end: getDateValue(shift.end.datetime),
    recurrence: {
      ...shift.recurrence,
      frequency: upperFirstChar(shift.recurrence.frequency)
    },
    min_staff: shift.min_staff.toString(),
    participants: shift.participants.map((m: ShiftMember) => ({
      name: m.name,
      asyncObject: {
        id: m.id
      }
    })),
    supervisor: shift.supervisor
      ? {
          name: shift.supervisor.name,
          asyncObject: {
            id: shift.supervisor.id
          }
        }
      : undefined
  };
}

function getDateRequestValue(date: moment.Moment, time: string): string {
  return `${date.format('YYYY-MM-DDT')}${time}:00`;
}

function isDateTimeInvalid(datetime: DateTimeValue): boolean {
  return (
    !datetime.date ||
    !datetime.date.isValid() ||
    !datetime.time ||
    datetime.time.length === 0
  );
}

function isSameOption(
  a: SFPeopleOption | undefined,
  b: SFPeopleOption | undefined
): boolean {
  return a?.asyncObject?.id === b?.asyncObject?.id;
}

function isSameOptionList(a: SFPeopleOption[], b: SFPeopleOption[]): boolean {
  if (a.length !== b.length) return false;
  else {
    return a.every((oa: SFPeopleOption) =>
      b.find((ob: SFPeopleOption) => isSameOption(oa, ob))
    );
  }
}

function isSameShift(a: ShiftFormValue, b: ShiftFormValue): boolean {
  const {
    participants: aMembers,
    supervisor: aSupervisor,
    areas: aAreas,
    ...aProps
  } = a;
  const {
    participants: bMembers,
    supervisor: bSupervisor,
    areas: bAreas,
    ...bProps
  } = b;
  if (!isEqualObject(aProps, bProps)) return false;
  else
    return (
      isSameOption(aSupervisor, bSupervisor) &&
      isSameOptionList(aMembers, bMembers) &&
      isSameOptionList(aAreas, bAreas)
    );
}

function isFormInvalid(value: ShiftFormValue, shift?: Shift): boolean {
  if (shift) {
    return isSameShift(value, getShiftValue(shift));
  }

  return (
    !value.name ||
    !value.acronym ||
    isDateTimeInvalid(value.start) ||
    isDateTimeInvalid(value.end) ||
    value.recurrence.days.length === 0 ||
    !value.min_staff ||
    value.min_staff.length === 0
  );
}

function getOptionListValue(list: SFPeopleOption[]): ShiftMember[] {
  return list.map((o: SFPeopleOption) => ({
    id: o.asyncObject.id,
    name: o.name
  }));
}

function sortRecurrenceDays(days: string[]): string[] {
  const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  const currentDays = [...days];
  return currentDays.sort(
    (a: string, b: string) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
  );
}

function getShiftRequestValue(value: ShiftFormValue): ShiftRequest {
  return {
    ...value,
    start: {
      datetime: getDateRequestValue(
        value.start.date as moment.Moment,
        value.start.time
      )
    },
    end: {
      datetime: getDateRequestValue(
        value.end.date as moment.Moment,
        value.end.time
      )
    },
    recurrence: {
      ...value.recurrence,
      frequency: value.recurrence.frequency.toLowerCase(),
      days: sortRecurrenceDays(value.recurrence.days)
    },
    areas: getOptionListValue(value.areas),
    participants: getOptionListValue(value.participants),
    supervisor: value.supervisor
      ? {
          id: value.supervisor.asyncObject.id,
          name: value.supervisor.name
        }
      : null
  };
}

export interface ShiftFormModalProps {
  shift?: Shift;
  isOpen: boolean;
  isLoading: boolean;
  onBack: () => void;
  onError: (e: SettingsError) => void;
  onClose: () => void;
  onSave: () => void;
}

export const ShiftFormModal = ({
  shift,
  isOpen,
  isLoading,
  onBack,
  onError,
  onClose,
  ...props
}: ShiftFormModalProps): React.ReactElement<ShiftFormModalProps> => {
  const apiBaseUrl = useContext(ApiContext).shifts;
  const [value, setValue] = useState<ShiftFormValue>(initValue);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');

  const onSave = async () => {
    try {
      setIsSaving(true);
      if (!shift) {
        await addShift(apiBaseUrl, getShiftRequestValue(value));
      } else {
        await editShift(apiBaseUrl, shift.id, getShiftRequestValue(value));
      }
      setIsSaving(false);
      props.onSave();
      onClose();
    } catch (e: any) {
      setIsSaving(false);
      onError(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (shift) {
        setValue(getShiftValue(shift));
      } else {
        setValue(initValue);
      }
    }
  }, [isOpen, shift]);

  return (
    <PanelModal
      anchor={anchor}
      isOpen={isOpen}
      title={isLoading ? undefined : `${shift ? 'Edit' : 'Create'} Shift`}
      dialogCloseButton={
        isLoading
          ? undefined
          : {
              label: 'Discard',
              variant: 'text',
              sfColor: 'grey',
              disabled: isSaving,
              onClick: onClose
            }
      }
      actionButton={
        isLoading
          ? undefined
          : {
              label: shift ? 'Save Changes' : 'Create Shift',
              isLoading: isSaving,
              disabled: isFormInvalid(value, shift),
              onClick: onSave
            }
      }
      onBack={() => {
        setAnchor('bottom');
        onBack();
      }}
      onClose={onClose}
    >
      <Fragment>
        {isLoading && (
          <div className={styles.spinner}>
            <SFSpinner />
          </div>
        )}

        {!isLoading && (
          <ShiftForm
            value={value}
            onChange={(value: ShiftFormValue) => {
              const newValue = {
                ...value,
                recurrence: {
                  ...value.recurrence,
                  days: sortRecurrenceDays(value.recurrence.days)
                }
              };

              setValue(newValue);
            }}
          />
        )}
      </Fragment>
    </PanelModal>
  );
};
