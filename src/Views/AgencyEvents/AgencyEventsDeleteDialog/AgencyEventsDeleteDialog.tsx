import React from 'react';
import styles from './AgencyEventsDeleteDialog.module.scss';
import { SFAlertDialog, SFText } from 'sfui';
import { AgencyEventType, SettingsError } from '../../../Models';

export interface AgencyEventsDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onError: (e: SettingsError) => void;
  onDelete: (event: AgencyEventType) => void;
  value: AgencyEventType;
}

export const AgencyEventsDeleteDialog = ({
  isOpen,
  onClose,
  onError,
  onDelete,
  value
}: AgencyEventsDeleteDialogProps): React.ReactElement<AgencyEventsDeleteDialogProps> => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const onEventDelete = async () => {
    // TODO add BE integration
  };

  return (
    <SFAlertDialog
      className={styles.agencyEventsDeleteDialog}
      title="Delete Event Type"
      open={isOpen}
      leftAction={{
        label: 'Cancel',
        buttonProps: { variant: 'text', onClick: onClose, disabled: isSaving }
      }}
      rightAction={{
        label: 'Delete Event',
        buttonProps: {
          sfColor: 'red',
          onClick: onEventDelete,
          isLoading: isSaving,
          disabled: isSaving
        }
      }}
    >
      <SFText type="component-1">
        <span className={styles.textName}>{value.name}</span> will be
        permanently deleted.
      </SFText>
    </SFAlertDialog>
  );
};
