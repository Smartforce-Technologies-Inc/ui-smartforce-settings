import React from 'react';
import styles from './NoMembersResult.module.scss';

export interface NoMembersResultProps {
  searchValue: string;
}

export const NoMembersResult = ({
  searchValue
}: NoMembersResultProps): React.ReactElement<NoMembersResultProps> => {
  return (
    <div className={styles.noMembersResult}>
      <p className={styles.title}>No results found.</p>
      <p className={styles.description}>
        We could not find any emails or members named{' '}
        <span className={styles.value}>{searchValue}</span>.
      </p>
    </div>
  );
};
