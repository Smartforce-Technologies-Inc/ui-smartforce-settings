import React from 'react';
import styles from './AgencyGroupsItem.module.scss';
import { GroupListItemInfo } from './GroupListItemInfo/GroupListItemInfo';
import { Avatar } from '../../../Components';
import { Group } from '../../../Models';

export interface AgencyGroupsItemProps {
  group: Group;
}

export const AgencyGroupsItem = ({
  group
}: AgencyGroupsItemProps): React.ReactElement<AgencyGroupsItemProps> => {
  return (
    <div className={styles.agencyGroupsItem}>
      <Avatar
        size="small"
        url={group.avatar_thumbnail_url}
        acronym={group.acronym}
      />
      <GroupListItemInfo group={group} />
    </div>
  );
};
