import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { PanelModal, PanelModalAnchor } from '../../../Components';
import {
  Shift,
  ShiftArea,
  ShiftFormDateTimeValue,
  ShiftFormValue,
  ShiftMember
} from '../../../Models';
import { ShiftForm } from './ShiftForm/ShiftForm';
import { isEqualObject, upperFirstChar } from '../../../Helpers';
import { SFPeopleOption } from 'sfui';

const initValue: ShiftFormValue = {
  name: '',
  acronym: '',
  areas: [],
  start: { date: null, time: '' },
  end: { date: null, time: '' },
  recurrence: {
    frecuency: 'Weekly',
    interval: 1,
    days: []
  },
  staff_min: '',
  members: []
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
      frecuency: upperFirstChar(shift.recurrence.frecuency)
    },
    staff_min: shift.staff_min.toString(),
    members: shift.members.map((m: ShiftMember) => ({
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
    members: aMembers,
    supervisor: aSupervisor,
    areas: aAreas,
    ...aProps
  } = a;
  const {
    members: bMembers,
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
    !value.staff_min ||
    value.staff_min.length === 0
  );
}

export interface ShiftFormModalProps {
  shift?: Shift;
  isOpen: boolean;
  onClose: () => void;
}

export const ShiftFormModal = ({
  shift,
  isOpen,
  onClose
}: ShiftFormModalProps): React.ReactElement<ShiftFormModalProps> => {
  const [value, setValue] = useState<ShiftFormValue>(initValue);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');

  const onCreate = () => {
    setIsSaving(true);
    // TODO BE integration
    console.log(value);
    setIsSaving(false);
    onClose();
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
        label: shift ? 'Save Changes' : 'Create Group',
        isLoading: isSaving,
        disabled: isFormInvalid(value, shift),
        onClick: onCreate
      }}
      onBack={onClose}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
    >
      <ShiftForm
        value={value}
        onChange={(value: ShiftFormValue) => setValue(value)}
      />
    </PanelModal>
  );
};
