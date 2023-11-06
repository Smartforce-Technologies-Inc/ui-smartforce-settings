import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  PanelModal,
  PanelModalAnchor
} from '../../../../Components/PanelModal/PanelModal';
import { SFPeopleOption, SFPeoplePicker } from 'sfui';
import { getUserSession } from '../../../../Services';
import { ApiContext } from '../../../../SFSettings';

const formatOption = (option: any): SFPeopleOption => {
  return {
    name: option.name as string,
    avatarUrl: option.avatar_thumbnail_url as string,
    asyncObject: option
  };
};

export interface AddMembersModalProps {
  isOpen: boolean;
  isSaving: boolean;
  onAdd: (members: SFPeopleOption[]) => void;
  onBack: () => void;
  onClose: () => void;
}

export const AddMembersModal = ({
  isOpen,
  isSaving,
  onAdd,
  onBack,
  onClose
}: AddMembersModalProps): React.ReactElement<AddMembersModalProps> => {
  const apiBaseUrl = useContext(ApiContext);
  const [members, setMembers] = useState<SFPeopleOption[]>([]);
  const [anchor, setAnchor] = useState<PanelModalAnchor>('right');

  useEffect(() => {
    if (!isOpen) {
      setMembers([]);
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
        disabled: members.length === 0,
        onClick: () => onAdd(members)
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
        value={members as SFPeopleOption[]}
        onChange={(newMembers: SFPeopleOption[]) => setMembers(newMembers)}
        getOptionSelected={getOptionSelected}
      />
    </PanelModal>
  );
};
