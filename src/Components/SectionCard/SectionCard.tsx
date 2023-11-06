import React from 'react';
import { SFPaper } from 'sfui';
import styles from './SectionCard.module.scss';

export interface SectionCardProps {
  title: string;
  children?: JSX.Element[];
}

const SectionCard = ({
  title,
  children
}: SectionCardProps): React.ReactElement<SectionCardProps> => {
  return (
    <SFPaper className={styles.sectionCard} elevation={2}>
      <p className={styles.title}>{title}</p>
      {children}
    </SFPaper>
  );
};

export default SectionCard;
