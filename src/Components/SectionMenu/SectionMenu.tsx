import React from 'react';
import styles from './SectionMenu.module.scss';

export interface SectionMenuProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

const SectionMenu = ({
  title,
  selected,
  onClick
}: SectionMenuProps): React.ReactElement<SectionMenuProps> => {
  return (
    <p
      className={`${styles.sectionMenu} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {title}
    </p>
  );
};

export default SectionMenu;
