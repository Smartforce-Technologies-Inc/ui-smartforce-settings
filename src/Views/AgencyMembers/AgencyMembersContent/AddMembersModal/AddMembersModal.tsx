import React, { useEffect, useState } from 'react';
import { ChipFieldValueType } from 'sfui';
import {
  PanelModal,
  PanelModalAnchor
} from '../../../../Components/PanelModal/PanelModal';
import { AgencyMembersForm } from './AgencyMembersForm/AgencyMembersForm';

export interface AddMembersModalProps {
  isOpen: boolean;
  isSaving: boolean;
  onAddMembers: (members: string[]) => void;
  onBack: () => void;
  onClose: () => void;
}

export const AddMembersModal = ({
  isOpen,
  isSaving,
  onAddMembers,
  onBack,
  onClose
}: AddMembersModalProps): React.ReactElement<AddMembersModalProps> => {
  const [members, setMembers] = useState<ChipFieldValueType[]>([]);
  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');

  const isMemberListInvalid =
    members.length === 0 ||
    members.find(
      (member: ChipFieldValueType) =>
        member.isValid !== undefined && !member.isValid
    ) !== undefined;

  useEffect(() => {
    if (!isOpen) {
      setMembers([]);
    }
  }, [isOpen]);

  return (
    <PanelModal
      anchor={anchor}
      isOpen={isOpen}
      title="Add Members"
      dialogCloseButton={{
        label: 'Discard',
        variant: 'text',
        sfColor: 'grey',
        disabled: isSaving,
        onClick: onClose
      }}
      actionButton={{
        label: isSaving ? 'Adding' : 'Add Members',
        isLoading: isSaving,
        disabled: isMemberListInvalid,
        onClick: () => {
          onAddMembers(members.map((value: ChipFieldValueType) => value.value));
        }
      }}
      onBack={onBack}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
    >
      <AgencyMembersForm
        members={members}
        onChange={(newMembers: ChipFieldValueType[]) => setMembers(newMembers)}
      />
    </PanelModal>
  );
};
