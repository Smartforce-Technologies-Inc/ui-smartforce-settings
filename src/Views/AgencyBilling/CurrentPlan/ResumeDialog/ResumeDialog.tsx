import React from 'react';
import styles from './ResumeDialog.module.scss';
import {
  PanelModalDialog,
  PanelModalButtonProps
} from '../../../../Components';

export interface ResumeDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClick: () => void;
  onClose: () => void;
}

export const ResumeDialog = ({
  isOpen,
  isLoading,
  onClick,
  onClose
}: ResumeDialogProps): React.ReactElement<ResumeDialogProps> => {
  const actionButtonProps: PanelModalButtonProps = {
    isLoading,
    onClick,
    label: 'Resume Plan'
  };

  const dialogCloseButtonProps: PanelModalButtonProps = {
    label: 'Cancel',
    variant: 'text',
    sfColor: 'grey',
    disabled: isLoading
  };

  return (
    <PanelModalDialog
      title="Resume Plan?"
      actionButton={actionButtonProps}
      dialogCloseButton={dialogCloseButtonProps}
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className={styles.resumeDialog}>
        By resuming your plan, the automatic renewal of the subscription will be
        activated again.
      </p>
    </PanelModalDialog>
  );
};
