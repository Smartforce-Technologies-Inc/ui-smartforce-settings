import React from 'react';
import styles from './AgencyEventsModal.module.scss';
import { PanelModal, PanelModalAnchor } from '../../../Components';
import { SFTextField } from 'sfui';
import { Divider } from '../../../Components/Divider/Divider';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { AgencyEvent } from '../../../Models';

const isSaveDisabled = (
  isSaving: boolean,
  formValue?: AgencyEvent,
  value?: AgencyEvent
) => {
  return (
    !formValue ||
    isSaving ||
    (formValue.color === value?.color && formValue.name === value?.name)
  );
};

const defaultFormValue: AgencyEvent = {
  name: '',
  color: ''
};

export interface AgencyEventsModalProps {
  isOpen: boolean;
  onBack: () => void;
  onClose: () => void;
  onFinish: () => void;
  value?: AgencyEvent;
}

export const AgencyEventsModal = ({
  isOpen,
  onBack,
  onClose,
  onFinish,
  value
}: AgencyEventsModalProps): React.ReactElement<AgencyEventsModalProps> => {
  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [formValue, setFormValue] = React.useState<AgencyEvent>(
    value ?? defaultFormValue
  );

  const onColorChange = (color: string): void => {
    setFormValue({ ...formValue, color });
  };

  const onNameChange = (name: string): void => {
    setFormValue({ ...formValue, name });
  };

  const onSave = (): void => {
    if (value) {
      // TODO add BE implementation for event edit
    } else {
      // TODO add BE implementation for event create
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      if (value) {
        setFormValue(value);
      } else {
        setFormValue(defaultFormValue);
      }
    }
  }, [isOpen]);

  return (
    <PanelModal
      title={`${value ? 'Edit' : 'Create'} Event Type`}
      isOpen={isOpen}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
      anchor={anchor}
      dialogCloseButton={{
        label: 'Discard',
        variant: 'text',
        sfColor: 'grey',
        disabled: isSaving,
        onClick: onBack
      }}
      actionButton={{
        label: value ? 'Save Changes' : 'Create Event Type',
        isLoading: isSaving,
        disabled: isSaveDisabled(isSaving, formValue, value),
        onClick: onSave
      }}
    >
      <div className={styles.agencyEventsModal}>
        <SFTextField
          required
          label="Name"
          helperText="It must be between 1 and 32 characters."
          inputProps={{ maxLength: 32 }}
          value={formValue?.name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <Divider />
        <ColorPicker
          title="Set color"
          selected={formValue?.color}
          onClick={onColorChange}
        />
      </div>
    </PanelModal>
  );
};
