import React from 'react';
import styles from './AgencyAreasNoResults.module.scss';
import { SFText } from 'sfui';

export interface AgencyAreasNoResultProps {
  searchValue: string;
}

export const AgencyAreasNoResult = ({
  searchValue
}: AgencyAreasNoResultProps): React.ReactElement<AgencyAreasNoResultProps> => {
  return (
    <div className={styles.agencyAreasNoResults}>
      <SFText type="component-2">No results found.</SFText>
      <SFText sfColor="neutral" type="component-2">
        We could not find any area named{' '}
        <span className={styles.searchValue}>{searchValue}</span>.
      </SFText>
    </div>
  );
};
