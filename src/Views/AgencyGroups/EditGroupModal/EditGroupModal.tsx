import React, { useContext, useEffect, useState } from 'react';
import {
  PanelModal,
  PanelModalAnchor
} from '../../../Components/PanelModal/PanelModal';
import {
  CreateGroupError,
  CreateGroupForm,
  GroupFormValue
} from '../CreateGroupModal/CreateGroupForm/CreateGroupForm';
import { SettingsError, Group } from '../../../Models';
import { saveGroupAvatar, updateGroup } from '../../../Services/GroupService';
import { HttpStatusCode } from 'sfui';
import {
  ERROR_GROUP_ACRONYM_ALREADY_EXISTS,
  ERROR_GROUP_NAME_ALREADY_EXISTS
} from '../../../Constants';
import { UserContext } from '../../../Context';
import { ApiContext } from '../../../Context';

function isFormInvalid(
  formValue: GroupFormValue,
  oldValue: Group,
  error: CreateGroupError
): boolean {
  return (
    (formValue.name === oldValue.name &&
      formValue.acronym === oldValue.acronym &&
      !(formValue.avatar instanceof Blob)) ||
    formValue.name.length === 0 ||
    formValue.acronym.length === 0 ||
    error.name ||
    error.acronym
  );
}

function getGroupFormValue(group: Group): GroupFormValue {
  return {
    id: group.id,
    name: group.name,
    acronym: group.acronym,
    avatar: group.avatar_url
  };
}

const initError: CreateGroupError = {
  name: false,
  acronym: false
};

export interface EditGroupModalProps {
  group: Group;
  isOpen: boolean;
  onBack: () => void;
  onClose: () => void;
  onError: (e: SettingsError) => void;
  onSave: () => void;
}

export const EditGroupModal = ({
  group,
  isOpen,
  onBack,
  onClose,
  onError,
  ...props
}: EditGroupModalProps): React.ReactElement<EditGroupModalProps> => {
  const apiBaseUrl = useContext(ApiContext).settings;
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = useState<GroupFormValue>(getGroupFormValue(group));
  const [error, setError] = useState<CreateGroupError>(initError);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');

  useEffect(() => setValue(getGroupFormValue(group)), [group]);

  const onDiscard = () => {
    setValue(getGroupFormValue(group));
    setError(initError);
    onBack();
  };

  const onGroupChange = (newGroup: GroupFormValue) => {
    let newError = { ...error };

    if (newGroup.name !== value.name) {
      newError = { ...newError, name: false };
    }

    if (newGroup.acronym !== value.acronym) {
      newError = { ...newError, acronym: false };
    }

    setError(newError);
    setValue(newGroup);
  };

  const onSave = async () => {
    setIsSaving(true);

    try {
      await updateGroup(apiBaseUrl, group.id, {
        name: value.name,
        acronym: value.acronym
      });

      if (value.avatar instanceof Blob) {
        await saveGroupAvatar(apiBaseUrl, value.avatar as Blob, group.id);
      }

      if (user?.groups) {
        const groupIndex: number = user.groups.findIndex(
          (g) => g.name === group.name
        );
        setUser({
          ...user,
          groups: [
            ...user.groups.slice(0, groupIndex),
            { id: group.id, name: value.name, acronym: value.acronym },
            ...user.groups.slice(groupIndex + 1)
          ]
        });
      }
      setIsSaving(false);
      setError(initError);
      props.onSave();
      onBack();
    } catch (e: any) {
      setIsSaving(false);
      if (e.code === HttpStatusCode.BAD_REQUEST) {
        const groupError: CreateGroupError = {
          name: e.detail.includes(ERROR_GROUP_NAME_ALREADY_EXISTS),
          acronym: e.detail.includes(ERROR_GROUP_ACRONYM_ALREADY_EXISTS)
        };
        setError(groupError);
      } else {
        console.error('Settings::EditGroupModal::Save', e);
        onError(e);
      }
    }
  };

  return (
    <PanelModal
      anchor={anchor}
      isOpen={isOpen}
      title="Edit Group"
      dialogCloseButton={{
        label: 'Discard',
        variant: 'text',
        sfColor: 'grey',
        disabled: isSaving,
        onClick: onDiscard
      }}
      actionButton={{
        label: 'Save Changes',
        isLoading: isSaving,
        disabled: isFormInvalid(value, group, error),
        onClick: onSave
      }}
      onBack={onDiscard}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
    >
      <CreateGroupForm
        isNew={false}
        error={error}
        value={value}
        onChange={onGroupChange}
      />
    </PanelModal>
  );
};
