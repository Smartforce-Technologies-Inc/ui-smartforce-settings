import React from 'react';
import styles from './AppLink.module.scss';
import { SFText } from 'sfui';

export interface AppLinkProps {
  icon: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export const AppLink = ({
  icon,
  label,
  selected = false,
  onClick
}: AppLinkProps): React.ReactElement<AppLinkProps> => {
  return (
    <div
      className={`${styles.appLink} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <img
        className={styles.image}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(icon)}`}
        alt={label}
      />

      <SFText type="component-2">{label}</SFText>
    </div>
  );
};
