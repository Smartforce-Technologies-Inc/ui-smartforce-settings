import React, { useEffect, useState } from 'react';
import {
  PanelModal,
  PanelModalAnchor
} from '../../../../Components/PanelModal/PanelModal';
import { SFRadioGroup, SFRadioOptionsProps } from 'sfui';
import { Member, MemberRole } from '../../../../Models';

export interface ChangeRoleModalProps {
  isOpen: boolean;
  member?: Member;
  roles: MemberRole[];
  isSaving?: boolean;
  onSave: (member: Member, role: MemberRole) => void;
  onBack: () => void;
  onClose: () => void;
}

export const ChangeRoleModal = ({
  isOpen,
  member,
  roles,
  isSaving = false,
  onSave,
  onBack,
  onClose
}: ChangeRoleModalProps): React.ReactElement<ChangeRoleModalProps> => {
  const [roleSelected, setRoleSelected] = useState<string | undefined>(
    member?.role?.id
  );
  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');

  useEffect(() => {
    setRoleSelected(member?.role?.id);
  }, [isOpen, member]);

  const isSaveDisabled: boolean = roleSelected === member?.role?.id;

  const roleOptions: SFRadioOptionsProps[] = roles.map((role: MemberRole) => ({
    value: role.id,
    label: role.name,
    disabled: false
  }));

  const onSaveClick = () => {
    onSave(
      member as Member,
      roles.find((role: MemberRole) => role.id === roleSelected) as MemberRole
    );
  };

  return (
    <PanelModal
      anchor={anchor}
      isOpen={isOpen}
      title="Change Role"
      dialogCloseButton={{
        label: 'Discard',
        variant: 'text',
        sfColor: 'grey',
        disabled: isSaving,
        onClick: onBack
      }}
      actionButton={{
        label: isSaving ? 'Saving' : 'Save Changes',
        isLoading: isSaving,
        disabled: isSaveDisabled,
        onClick: () => onSaveClick()
      }}
      onBack={onBack}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
    >
      <SFRadioGroup
        options={roleOptions}
        value={roleSelected}
        onChange={(_e, value: string) => setRoleSelected(value)}
      />
    </PanelModal>
  );
};
