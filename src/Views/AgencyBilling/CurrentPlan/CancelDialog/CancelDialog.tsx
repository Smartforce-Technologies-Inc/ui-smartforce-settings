import React from 'react';
import styles from './CancelDialog.module.scss';
import {
  PanelModalDialog,
  PanelModalButtonProps
} from '../../../../Components';

export interface CancelDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClick: () => void;
  onClose: () => void;
}

export const CancelDialog = ({
  isOpen,
  isLoading,
  onClick,
  onClose
}: CancelDialogProps): React.ReactElement<CancelDialogProps> => {
  const actionButtonProps: PanelModalButtonProps = {
    isLoading,
    onClick,
    label: 'Cancel Plan',
    sfColor: 'red'
  };

  const dialogCloseButtonProps: PanelModalButtonProps = {
    label: 'Cancel',
    variant: 'text',
    sfColor: 'grey',
    disabled: isLoading
  };

  return (
    <PanelModalDialog
      title="Cancel plan?"
      actionButton={actionButtonProps}
      dialogCloseButton={dialogCloseButtonProps}
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className={styles.cancelDialog}>
        By canceling your plan, the subscription will not be renewed.
      </p>
    </PanelModalDialog>
  );
};
