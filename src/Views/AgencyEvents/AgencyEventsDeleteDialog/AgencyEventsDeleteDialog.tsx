import React from 'react';
import { SFAlertDialog } from 'sfui';
import { AgencyEvent } from '../../../Models';

export interface AgencyEventsDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (event: AgencyEvent) => void;
  value: AgencyEvent;
}

export const AgencyEventsDeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  value
}: AgencyEventsDeleteDialogProps): React.ReactElement<AgencyEventsDeleteDialogProps> => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const onEventDelete = async () => {
    // TODO add BE integration
  };

  return (
    <SFAlertDialog
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
    ></SFAlertDialog>
  );
};
