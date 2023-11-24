import React from 'react';
import styles from './AgencyAreasDeleteDialog.module.scss';
import { SFAlertDialog, SFText } from 'sfui';
import { Area } from '../../../Models';
import { deleteArea } from '../../../Services';
import { SettingsError } from '../../../Models/Error';
import { ApiContext } from '../../../Context';

export interface AgencyAreasDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (value: Area) => void;
  onError: (e: SettingsError) => void;
  value?: Area;
}

export const AgencyAreasDeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  onError,
  value
}: AgencyAreasDeleteDialogProps): React.ReactElement<AgencyAreasDeleteDialogProps> => {
  const apiBaseUrl = React.useContext(ApiContext).settings;
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const onAreaDelete = async () => {
    setIsSaving(true);

    try {
      await deleteArea(apiBaseUrl, (value as Area).id);
      setIsSaving(false);
      onDelete(value as Area);
    } catch (e: any) {
      setIsSaving(false);
      console.error('Settings::AgencyAreasDeleteDialog::DeleteArea', e);
      onError(e);
    }
  };

  return (
    <SFAlertDialog
      className={styles.agencyAreasDeleteDialog}
      title="Delete area?"
      open={isOpen}
      leftAction={{
        label: 'Cancel',
        buttonProps: { variant: 'text', onClick: onClose, disabled: isSaving }
      }}
      rightAction={{
        label: 'Delete Area',
        buttonProps: {
          sfColor: 'red',
          onClick: onAreaDelete,
          isLoading: isSaving,
          disabled: isSaving
        }
      }}
    >
      <SFText type="component-1">
        <span className={styles.textName}>{value?.name ?? ''}</span> will be
        permanently deleted.
      </SFText>
    </SFAlertDialog>
  );
};
