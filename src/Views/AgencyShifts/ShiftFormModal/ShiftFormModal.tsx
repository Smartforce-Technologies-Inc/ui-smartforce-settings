import React, { useEffect, useState } from 'react';
import { PanelModal, PanelModalAnchor } from '../../../Components';
import { ShiftFormDateTimeValue, ShiftFormValue } from '../../../Models';
import { ShiftForm } from './ShiftForm/ShiftForm';

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

function isDateTimeInvalid(datetime: ShiftFormDateTimeValue): boolean {
  return !datetime.date || !datetime.time || datetime.time.length === 0;
}

function isFormInvalid(value: ShiftFormValue): boolean {
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
  isOpen: boolean;
  onClose: () => void;
}

export const ShiftFormModal = ({
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
      setValue(initValue);
    }
  }, [isOpen]);

  return (
    <PanelModal
      anchor={anchor}
      isOpen={isOpen}
      title="Create Shift"
      dialogCloseButton={{
        label: 'Discard',
        variant: 'text',
        sfColor: 'grey',
        disabled: isSaving,
        onClick: onClose
      }}
      actionButton={{
        label: 'Create Group',
        isLoading: isSaving,
        disabled: isFormInvalid(value),
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
