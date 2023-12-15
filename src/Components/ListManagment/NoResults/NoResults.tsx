import React from 'react';
import styles from './NoResults.module.scss';
import { SFText } from 'sfui';

export interface NoResultsProps {
  filter: string;
  label: string;
}

export const NoResults = ({
  filter,
  label
}: NoResultsProps): React.ReactElement<NoResultsProps> => {
  return (
    <div className={styles.noResults}>
      <SFText type="component-2">
        We could not find any {label} named{' '}
        <span className={styles.filter}>{filter}</span>.
      </SFText>
    </div>
  );
};
