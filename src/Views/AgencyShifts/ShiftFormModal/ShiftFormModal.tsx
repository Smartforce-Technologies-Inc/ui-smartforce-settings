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

function getDateRequestValue(date: moment.Moment): string {
  return date.format('YYYY-MM-ddTHH:mm:ss');
}

function getOptionListValue(list: SFPeopleOption[]): string[] {
  return list.map((o: SFPeopleOption) => o.asyncObject.id);
}

function getShiftRequestValue(value: ShiftFormValue): ShiftRequest {
  return {
    ...value,
    start: {
      datetime: getDateRequestValue(value.start.date as moment.Moment)
    },
    end: {
      datetime: getDateRequestValue(value.end.date as moment.Moment)
    },
    areas: getOptionListValue(value.areas),
    members: getOptionListValue(value.members),
    supervisor: value.supervisor?.asyncObject.id
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
        label: shift ? 'Save Changes' : 'Create Group',
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
