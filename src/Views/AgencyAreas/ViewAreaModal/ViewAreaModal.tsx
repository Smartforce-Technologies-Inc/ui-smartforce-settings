import React from 'react';
import { SFText } from 'sfui';
import styles from './ViewAreaModal.module.scss';
import { ViewAreaPolygon } from './ViewAreaPolygon/ViewAreaPolygon';
import { Area } from '../../../Models';
import {
  PanelModal,
  PanelModalAnchor
} from '../../../Components/PanelModal/PanelModal';
import { Avatar } from '../../../Components/Avatar/Avatar';

export interface ViewAreaModalProps {
  isOpen: boolean;
  area?: Area;
  onBack: () => void;
  onClose: () => void;
}

export const ViewAreaModal = ({
  isOpen,
  area,
  onBack,
  onClose
}: ViewAreaModalProps): React.ReactElement<ViewAreaModalProps> => {
  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');

  return (
    <PanelModal
      anchor={anchor}
      classes={{
        dialog: {
          root: styles.viewAreaModal,
          paper: styles.dialogPaper,
          container: styles.dialogContainer
        },
        drawer: {
          paper: styles.viewAreaModal,
          content: styles.drawerContent
        }
      }}
      isOpen={isOpen}
      dialogCloseButton={{
        label: 'Close',
        sfColor: 'grey',
        onClick: onBack
      }}
      onBack={onBack}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
    >
      {area && (
        <div className={styles.container}>
          <Avatar size="large" acronym={area.acronym} />
          <SFText type="component-title">{area.name}</SFText>
          <ViewAreaPolygon area={area} />
        </div>
      )}
    </PanelModal>
  );
};
