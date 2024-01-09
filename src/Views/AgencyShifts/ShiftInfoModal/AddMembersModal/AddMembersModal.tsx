import React, { useContext, useEffect, useState } from 'react';
import {
  PanelModal,
  PanelModalAnchor
} from '../../../../Components/PanelModal/PanelModal';
import { SFPeopleOption } from 'sfui';
import { MultipleMemberPicker } from '../../../../Components/MultipleMemberPicker/MultipleMemberPicker';
import { ApiContext } from '../../../../Context';
import { ShiftMember } from '../../../../Models';

export interface AddMembersModalProps {
  participants?: ShiftMember[];
  isOpen: boolean;
  isSaving: boolean;
  onAdd: (members: SFPeopleOption[]) => void;
  onBack: () => void;
  onClose: () => void;
}

export const AddMembersModal = ({
  participants = [],
  isOpen,
  isSaving,
  onAdd,
  onBack,
  onClose
}: AddMembersModalProps): React.ReactElement<AddMembersModalProps> => {
  const apiBaseUrl = useContext(ApiContext).settings;
  const [members, setMembers] = useState<SFPeopleOption[]>([]);
  const [anchor, setAnchor] = useState<PanelModalAnchor>('right');

  useEffect(() => {
    if (!isOpen) {
      setMembers([]);
    }
  }, [isOpen]);

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
        disabled: members.length === 0 || isSaving,
        onClick: () => onAdd(members)
      }}
      onBack={onBack}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
    >
      <MultipleMemberPicker
        baseUrl={apiBaseUrl}
        label="Members"
        value={members as SFPeopleOption[]}
        onChange={(newMembers: SFPeopleOption[]) => setMembers(newMembers)}
        filterOptions={(o) => !participants.find((p) => p.id === o.id)}
      />
    </PanelModal>
  );
};
