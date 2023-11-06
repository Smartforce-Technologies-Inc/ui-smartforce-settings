import React from 'react';
import styles from './NoResults.module.scss';
import { SFText } from 'sfui';

export interface NoResultsProps {
  filter: string;
}

export const NoResults = ({
  filter
}: NoResultsProps): React.ReactElement<NoResultsProps> => {
  return (
    <div className={styles.noResults}>
      <SFText type="component-2">No results found.</SFText>
      <SFText type="component-2">
        We could not find any group named{' '}
        <span className={styles.filter}>{filter}</span>.
      </SFText>
    </div>
  );
};
