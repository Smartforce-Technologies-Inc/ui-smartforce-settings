import React from 'react';
import styles from './SectionMenu.module.scss';
import { SFChip } from 'sfui';

export interface SectionMenuProps {
  title: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const SectionMenu = ({
  title,
  selected,
  disabled,
  onClick
}: SectionMenuProps): React.ReactElement<SectionMenuProps> => {
  return (
    <div
      className={`${styles.sectionMenu} ${selected ? styles.selected : ''} ${
        disabled ? styles.disabled : ''
      }`}
      onClick={!disabled ? onClick : undefined}
    >
      <p className={styles.title}>{title}</p>
      {disabled && (
        <SFChip size="small" sfColor="default" label="Coming Soon" />
      )}
    </div>
  );
};

export default SectionMenu;
