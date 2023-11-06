import React from 'react';
import { SFAlertDialog } from 'sfui';
import styles from './DowngradeModal.module.scss';

export interface DowngradeModalProps {
  open: boolean;
  name?: string;
  newRole?: string;
  isSaving?: boolean;
  onDowngrade: () => void;
  onClose: () => void;
}

export const DowngradeModal = ({
  open,
  name,
  newRole,
  isSaving = false,
  onDowngrade,
  onClose
}: DowngradeModalProps): React.ReactElement<DowngradeModalProps> => {
  return (
    <SFAlertDialog
      title="Downgrade permissions?"
      rightAction={{
        label: isSaving ? 'Downgrading' : 'Downgrade',
        buttonProps: {
          isLoading: isSaving,
          onClick: onDowngrade
        }
      }}
      leftAction={{
        label: 'Cancel',
        buttonProps: { disabled: isSaving, onClick: onClose }
      }}
      open={open}
    >
      <div>
        <strong className={styles.strongText}>{name}</strong> will only have
        access to the agency using "{newRole}" permissions.
      </div>
    </SFAlertDialog>
  );
};
