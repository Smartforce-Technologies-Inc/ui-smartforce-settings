import React from 'react';
import { SFChip, SFPaper } from 'sfui';
import styles from './SectionCard.module.scss';

export interface SectionCardProps {
  title: string;
  children?: JSX.Element[];
  disabled?: boolean;
}

const SectionCard = ({
  title,
  children,
  disabled
}: SectionCardProps): React.ReactElement<SectionCardProps> => {
  return (
    <SFPaper className={styles.sectionCard} elevation={2}>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        {disabled && (
          <SFChip size="small" sfColor="default" label="Coming Soon" />
        )}
      </div>

      {!disabled && children}
    </SFPaper>
  );
};

export default SectionCard;
