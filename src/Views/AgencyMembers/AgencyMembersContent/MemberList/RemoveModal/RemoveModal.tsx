import React from 'react';
import { SFAlertDialog } from 'sfui';
import styles from './RemoveModal.module.scss';
import { Member } from '../../../../../Models';

export interface RemoveModalProps {
  open: boolean;
  member: Member;
  isSaving?: boolean;
  onRemove: () => void;
  onClose: () => void;
}

export const RemoveModal = ({
  open,
  member,
  isSaving = false,
  onRemove,
  onClose
}: RemoveModalProps): React.ReactElement<RemoveModalProps> => {
  return (
    <SFAlertDialog
      title="Remove member?"
      rightAction={{
        label: isSaving ? 'Removing' : 'Remove Member',
        buttonProps: {
          sfColor: 'red',
          isLoading: isSaving,
          onClick: onRemove
        }
      }}
      leftAction={{
        label: 'Cancel',
        buttonProps: { disabled: isSaving, onClick: onClose }
      }}
      open={open}
    >
      <div>
        <strong className={styles.strongText}>
          {member.name ? member.name : member.email}
        </strong>{' '}
        will no longer have access to the agency.
      </div>
    </SFAlertDialog>
  );
};
