import React from 'react';
import styles from './GroupInfoHeader.module.scss';
import { SFText, SFChip } from 'sfui';
import { formatDateString } from '../../../../Helpers';
import { Avatar } from '../../../../Components/Avatar/Avatar';
import { Group } from '../../../../Models';

export interface GroupInfoHeaderProps {
  group: Group;
}

export const GroupInfoHeader = ({
  group
}: GroupInfoHeaderProps): React.ReactElement<GroupInfoHeaderProps> => {
  const createdLabel = `Created by ${
    group.created_by_user.name
  } on ${formatDateString(group.created_at, 'MM/DD/YYYY')}`;

  return (
    <div className={styles.groupInfoHeader}>
      <Avatar size="large" url={group.avatar_url} acronym={group.acronym} />
      <div className={styles.name}>
        <SFText type="component-title">{group.name}</SFText>
        <SFChip
          label={group.status}
          size="small"
          sfColor={group.status === 'Active' ? 'primary' : 'default'}
          variant="outlined"
        />
      </div>
      <SFText type="component-2" sfColor="neutral">
        {createdLabel}
      </SFText>
    </div>
  );
};
