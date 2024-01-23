import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  PanelModal,
  PanelModalAnchor
} from '../../../../Components/PanelModal/PanelModal';
import { SFPeopleOption, SFPeoplePicker } from 'sfui';
import { getUserSession } from '../../../../Services';
import { ApiContext } from '../../../../Context';
import { GroupMember } from '../../../../Models';

const formatOption = (option: any): SFPeopleOption => {
  return {
    name: option.name as string,
    avatarUrl: option.avatar_thumbnail_url as string,
    asyncObject: option
  };
};

export interface AddMembersModalProps {
  members?: GroupMember[];
  isOpen: boolean;
  isSaving: boolean;
  onAdd: (value: SFPeopleOption[]) => void;
  onBack: () => void;
  onClose: () => void;
}

export const AddMembersModal = ({
  members = [],
  isOpen,
  isSaving,
  onAdd,
  onBack,
  onClose
}: AddMembersModalProps): React.ReactElement<AddMembersModalProps> => {
  const apiBaseUrl = useContext(ApiContext).settings;
  const [value, setValue] = useState<SFPeopleOption[]>([]);
  const [anchor, setAnchor] = useState<PanelModalAnchor>('right');

  useEffect(() => {
    if (!isOpen) {
      setValue([]);
    }
  }, [isOpen]);

  const fetchInit: RequestInit = useMemo(
    () => ({
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `bearer ${getUserSession().access_token}`
      })
    }),
    []
  );

  const getOptionSelected = (o: SFPeopleOption, v: SFPeopleOption): boolean => {
    return o.asyncObject.id === v.asyncObject.id;
  };

  const filterIds = members.map((m) => m.id);

  return (
    <PanelModal
      anchor={anchor}
      title="Add Members"
      isOpen={isOpen}
      dialogCloseButton={{
        label: 'Close',
        variant: 'text',
        sfColor: 'grey',
        disabled: isSaving,
        onClick: onBack
      }}
      actionButton={{
        label: 'Add Members',
        isLoading: isSaving,
        disabled: value.length === 0,
        onClick: () => onAdd(value)
      }}
      onBack={onBack}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
    >
      <SFPeoplePicker
        multiple
        label="Members"
        isAsync
        formatUrlQuery={(value: string) =>
          `${apiBaseUrl}/agencies/me/users?active_only=True&name=${value}`
        }
        formatOption={formatOption}
        fetchInit={fetchInit}
        value={value}
        onChange={(newMembers: SFPeopleOption[]) => setValue(newMembers)}
        getOptionSelected={getOptionSelected}
        filterOptions={(o: any) => !filterIds.includes(o.id)}
      />
    </PanelModal>
  );
};
