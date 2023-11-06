import React from 'react';
import { SFAlertDialog } from 'sfui';

export interface TransferModalProps {
  open: boolean;
  isOwner?: boolean;
  isSaving?: boolean;
  onTransfer: () => void;
  onClose: () => void;
}

export const TransferModal = ({
  open,
  isOwner = false,
  isSaving = false,
  onTransfer,
  onClose
}: TransferModalProps): React.ReactElement<TransferModalProps> => {
  return (
    <SFAlertDialog
      title={`Transfer ${isOwner ? 'ownership' : 'role'}?`}
      rightAction={{
        label: isSaving
          ? 'Transfering'
          : `Transfer ${isOwner ? 'Ownership' : 'Role'}`,
        buttonProps: {
          sfColor: 'red',
          isLoading: isSaving,
          onClick: onTransfer
        }
      }}
      leftAction={{
        label: 'Cancel',
        buttonProps: { disabled: isSaving, onClick: onClose }
      }}
      open={open}
    >
      <div>
        By transferring your {isOwner ? 'ownership' : 'role'}, you will lose{' '}
        {isOwner ? 'owner' : 'role'} permissions and you will not be able to
        undo this action.
      </div>
    </SFAlertDialog>
  );
};
