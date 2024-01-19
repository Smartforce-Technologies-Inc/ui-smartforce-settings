import React from 'react';
import styles from './DeleteConfirmNameModal.module.scss';
import { SFAlertDialog, SFText, SFTextField } from 'sfui';
import { upperFirstChar } from '../../Helpers';

export interface DeleteConfirmNameModalProps {
  label: string;
  name: string;
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteConfirmNameModal = ({
  label,
  name,
  isOpen,
  isSaving,
  onDelete,
  onClose
}: DeleteConfirmNameModalProps): React.ReactElement<DeleteConfirmNameModalProps> => {
  const [nameValue, setNameValue] = React.useState<string>('');
  const isDisabled: boolean = name !== nameValue;

  React.useEffect(() => {
    if (isOpen) {
      setNameValue('');
    }
  }, [isOpen]);

  return (
    <SFAlertDialog
      title={`Delete ${label}?`}
      open={isOpen}
      onClose={onClose}
      leftAction={{
        label: 'Cancel',
        buttonProps: {
          variant: 'text',
          sfColor: 'grey',
          disabled: isSaving,
          onClick: onClose
        }
      }}
      rightAction={{
        label: `Delete ${upperFirstChar(label)}`,
        buttonProps: {
          sfColor: 'red',
          disabled: isDisabled,
          isLoading: isSaving,
          onClick: onDelete
        }
      }}
    >
      <div className={styles.deleteConfirmNameModal}>
        <SFText type="component-1">
          <span className={styles.name}>{name}</span> will be inactive for 30
          days in case you or another member decides to restore it. After that
          period, it will be permanently deleted.
        </SFText>

        <SFTextField
          label={`${upperFirstChar(label)} name`}
          value={nameValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNameValue(e.target.value)
          }
        />
      </div>
    </SFAlertDialog>
  );
};
