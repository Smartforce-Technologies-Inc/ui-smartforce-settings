import React from 'react';
import styles from './AgencyMembers.module.scss';
import { SettingsContentRender } from '../SettingsContentRender';
import { AgencyMembersContent } from './AgencyMembersContent/AgencyMembersContent';
import { SettingsError } from '../../Models';

export interface AgencyMembersProps {
  onClose: () => void;
  onError: (e: SettingsError) => void;
  onHome: () => void;
}

export const AgencyMembers = ({
  onClose,
  onError,
  onHome
}: AgencyMembersProps): React.ReactElement<AgencyMembersProps> => {
  return (
    <div className={styles.agencyMembers}>
      <SettingsContentRender
        renderContent={() => (
          <AgencyMembersContent
            onHome={onHome}
            onError={onError}
            onClose={onClose}
          />
        )}
      />
    </div>
  );
};
