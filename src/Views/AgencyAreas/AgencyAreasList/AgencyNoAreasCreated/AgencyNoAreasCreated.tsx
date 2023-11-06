import React from 'react';
import styles from './AgencyNoAreasCreated.module.scss';
import { SFText } from 'sfui';

export const AgencyAreasNoAreasCreated = (): React.ReactElement<{}> => {
  return (
    <div className={styles.agencyNoAreasCreated}>
      <SFText type="component-2">There are no areas created yet.</SFText>
    </div>
  );
};
