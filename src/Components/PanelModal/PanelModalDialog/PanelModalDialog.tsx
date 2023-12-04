import React from 'react';
import styles from './PanelModalDialog.module.scss';
import { SFDialog, SFScrollable, SFButton, SFText } from 'sfui';
import { PanelModalProps } from '../PanelModal';

export interface PanelModalDialogClasses {
  root?: string;
  paper?: string;
  container?: string;
  content?: string;
  header?: string;
}

export interface PanelModalDialogProps
  extends Omit<PanelModalProps, 'classes'> {
  classes?: PanelModalDialogClasses;
}

export const PanelModalDialog = ({
  isOpen,
  headerTitle,
  title,
  children,
  dialogCloseButton,
  classes,
  actionButton,
  altActionButton,
  subTitle,
  onClose
}: PanelModalDialogProps): React.ReactElement<PanelModalDialogProps> => {
  return (
    <SFDialog
      className={`${styles.panelModalDialog} ${classes?.root ?? ''}`}
      PaperProps={{
        className: `${styles.paper} ${classes?.paper ?? ''}`
      }}
      open={isOpen}
      onClose={onClose}
    >
      {headerTitle && (
        <div className={`${styles.header} ${classes?.header ?? ''}`}>
          <SFText type="component-1-extraBold">{headerTitle}</SFText>
        </div>
      )}
      <div
        className={`${styles.container} ${classes?.container ?? ''} ${
          title ? styles.withTitle : ''
        }`}
      >
        <div className={styles.contentTitle}>
          {title && <SFText type="component-title">{title}</SFText>}
          {subTitle && (
            <SFText className={styles.subTitle} type="component-2">
              {subTitle}
            </SFText>
          )}
        </div>

        <SFScrollable className={`${styles.content} ${classes?.content ?? ''}`}>
          {children}
        </SFScrollable>

        <div className={styles.footer}>
          {altActionButton && (
            <SFButton
              className={styles.altActionButton}
              {...altActionButton}
              size="large"
            >
              {altActionButton.label}
            </SFButton>
          )}

          {dialogCloseButton && (
            <SFButton
              {...dialogCloseButton}
              size="large"
              onClick={dialogCloseButton.onClick ?? onClose}
            >
              {dialogCloseButton.label}
            </SFButton>
          )}

          {actionButton && (
            <SFButton {...actionButton} size="large">
              {actionButton.label}
            </SFButton>
          )}
        </div>
      </div>
    </SFDialog>
  );
};
