import React from 'react';
import styles from './BusinessCardPreview.module.scss';
import {
  PanelModal,
  PanelModalAnchor
} from '../../../Components/PanelModal/PanelModal';
import {
  BusinessCard,
  BusinessCardData,
  BusinessCardMediaType
} from 'business-card-component';
import { SFIconButton, SFScrollable } from 'sfui';
import { MediaContext, ThemeTypeContext } from '../../../Context';

export interface BusinessCardPreviewProps {
  data: BusinessCardData;
  isOpen: boolean;
  onBack: () => void;
  onClose: () => void;
}

export const BusinessCardPreview = ({
  data,
  isOpen,
  onBack,
  onClose
}: BusinessCardPreviewProps): React.ReactElement<BusinessCardPreviewProps> => {
  const { themeType } = React.useContext(ThemeTypeContext);
  const { isPhone } = React.useContext(MediaContext);

  const [mediaType, setMediaType] =
    React.useState<BusinessCardMediaType>('mobile');
  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');

  const isMediaMobile: boolean = mediaType === 'mobile';

  const onBackButton = () => {
    setMediaType('mobile');
    onBack();
  };

  return (
    <PanelModal
      classes={{
        dialog: {
          root: styles.panelModal,
          paper: styles.dialogPaper,
          container: styles.dialogContainer
        },
        drawer: {
          paper: styles.panelModal
        }
      }}
      anchor={anchor}
      isOpen={isOpen}
      title="Preview Business Card"
      dialogCloseButton={{
        label: 'Close',
        sfColor: 'grey',
        onClick: onBackButton
      }}
      onBack={onBackButton}
      onClose={() => {
        setAnchor('bottom');
        onClose();
      }}
    >
      <div
        className={`${styles.businessCardPreview} ${
          isMediaMobile ? styles.isMediaMobile : ''
        }`}
      >
        <SFScrollable containerClassName={styles.container}>
          <BusinessCard
            className={styles.businessCard}
            data={data}
            themeType={themeType}
            mediaType={mediaType}
          />
        </SFScrollable>
        {!isPhone && (
          <div className={styles.mediaType}>
            <SFIconButton
              className={`${styles.icon} ${
                mediaType === 'mobile' ? styles.active : ''
              }`}
              sfSize="medium"
              sfIcon="Smartphone"
              onClick={() => setMediaType('mobile')}
            />
            <SFIconButton
              className={`${styles.icon} ${
                mediaType === 'desktop' ? styles.active : ''
              }`}
              sfIcon="Computer"
              sfSize="medium"
              onClick={() => setMediaType('desktop')}
            />
          </div>
        )}
      </div>
    </PanelModal>
  );
};
