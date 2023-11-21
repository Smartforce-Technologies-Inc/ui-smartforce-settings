import React, { Fragment, useContext, useEffect, useState } from 'react';
import styles from './ShiftFormModal.module.scss';
import moment from 'moment';
import { PanelModal, PanelModalAnchor } from '../../../Components';
import {
  SettingsError,
  Shift,
  ShiftArea,
  ShiftFormDateTimeValue,
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

function getDateValue(isoString: string): ShiftFormDateTimeValue {
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

function isDateTimeInvalid(datetime: ShiftFormDateTimeValue): boolean {
  return !datetime.date || !datetime.time || datetime.time.length === 0;
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
    !value.min_staff ||
    value.min_staff.length === 0
  );
}

function getDateRequestValue(date: moment.Moment, time: string): string {
  return `${date.format('YYYY-MM-DDT')}${time}:00`;
}

function getOptionListValue(list: SFPeopleOption[]): ShiftMember[] {
  return list.map((o: SFPeopleOption) => ({
    id: o.asyncObject.id,
    name: o.name
  }));
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
      frequency: value.recurrence.frequency.toLowerCase()
    },
    areas: getOptionListValue(value.areas),
    participants: getOptionListValue(value.participants),
    supervisor: value.supervisor
      ? {
          id: value.supervisor.asyncObject.id,
          name: value.supervisor.name
        }
      : undefined
  };
}

export interface ShiftFormModalProps {
  shift?: Shift;
  isOpen: boolean;
  isLoading: boolean;
  onError: (e: SettingsError) => void;
  onClose: () => void;
  onSave: () => void;
}

export const ShiftFormModal = ({
  shift,
  isOpen,
  isLoading,
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
  }, [isOpen]);

  return (
    <PanelModal
      anchor={anchor}
      isOpen={isOpen}
      title={`${shift ? 'Edit' : 'Create'} Shift`}
      dialogCloseButton={{
        label: 'Discard',
        variant: 'text',
        sfColor: 'grey',
        disabled: isSaving,
        onClick: onClose
      }}
      actionButton={{
        label: shift ? 'Save Changes' : 'Create Shift',
        isLoading: isSaving,
        disabled: isFormInvalid(value, shift),
        onClick: onSave
      }}
      onBack={onClose}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
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
            onChange={(value: ShiftFormValue) => setValue(value)}
          />
        )}
      </Fragment>
    </PanelModal>
  );
};
