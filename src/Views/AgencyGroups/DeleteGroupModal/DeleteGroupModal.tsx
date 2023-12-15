import React, { useContext } from 'react';
import styles from './DeleteGroupModal.module.scss';
import { SFAlertDialog, SFText, SFTextField } from 'sfui';
import { Group, UserGroup, SettingsError } from '../../../Models';
import { deleteGroup } from '../../../Services/GroupService';
import { UserContext } from '../../../Context';
import { ApiContext } from '../../../Context';

export interface DeleteGroupModalProps {
  group: Group;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onError: (e: SettingsError) => void;
}

export const DeleteGroupModal = ({
  group,
  isOpen,
  ...props
}: DeleteGroupModalProps): React.ReactElement<DeleteGroupModalProps> => {
  const apiBaseUrl = useContext(ApiContext).settings;
  const { user, setUser } = useContext(UserContext);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [formValue, setFormValue] = React.useState<string>('');
  const isDeleteDisabled: boolean = group.name !== formValue;

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  const onDelete = async () => {
    setIsSaving(true);

    try {
      await deleteGroup(apiBaseUrl, group.id);
      setIsSaving(false);
      if (user?.groups) {
        setUser({
          ...user,
          groups: user.groups.filter((g: UserGroup) => g.id !== group.id)
        });
      }
      props.onDelete();
      props.onClose();
    } catch (e: any) {
      setIsSaving(false);
      console.error('Settings::DeleteGroupModal::Delete', e);
      props.onError(e);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setFormValue('');
    }
  }, [isOpen]);

  return (
    <SFAlertDialog
      title="Delete group?"
      open={isOpen}
      onClose={props.onClose}
      leftAction={{
        label: 'Cancel',
        buttonProps: {
          variant: 'text',
          sfColor: 'grey',
          disabled: isSaving,
          onClick: props.onClose
        }
      }}
      rightAction={{
        label: 'Delete Group',
        buttonProps: {
          sfColor: 'red',
          disabled: isDeleteDisabled,
          isLoading: isSaving,
          onClick: onDelete
        }
      }}
    >
      <div className={styles.deleteGroupModal}>
        <SFText type="component-1">
          <span className={styles.textName}>{group.name}</span> will be inactive
          for 30 days in case you or another member decides to restore it. After
          that period, it will be permanently deleted.
        </SFText>
        <SFTextField
          label="Group name"
          value={formValue}
          onChange={onFormChange}
        />
      </div>
    </SFAlertDialog>
  );
};
