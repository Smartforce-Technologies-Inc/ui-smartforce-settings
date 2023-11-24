import React, { Fragment } from 'react';
import styles from './GroupListItemInfo.module.scss';
import { SFChip, SFText } from 'sfui';
import { Group, GroupUser } from '../../../../Models';
import { ActionInfo } from './ActionInfo/ActionInfo';
import { InactiveDaysMessage } from '../../../../Components/InactiveDaysMessage/InactiveDaysMessage';

export interface GroupListItemInfoProps {
  group: Group;
}

export const GroupListItemInfo = ({
  group
}: GroupListItemInfoProps): React.ReactElement<GroupListItemInfoProps> => {
  return (
    <div className={styles.groupListItemInfo}>
      <SFText type="component-2">{group.name}</SFText>

      <div className={styles.status}>
        <SFText type="component-2-medium" sfColor="neutral">
          {group.members.length} members
        </SFText>

        <SFChip
          sfColor={group.status === 'Active' ? 'primary' : 'default'}
          size="small"
          variant="outlined"
          label={group.status}
        />
      </div>

      {group.status === 'Inactive' && (
        <Fragment>
          <ActionInfo
            type="Deleted"
            user={group.updated_by_user as GroupUser}
            date={group.updated_at as string}
          />
          <InactiveDaysMessage date={group.updated_at as string} />
        </Fragment>
      )}

      {group.status === 'Active' && (
        <ActionInfo
          type="Created"
          user={group.created_by_user}
          date={group.created_at}
        />
      )}
    </div>
  );
};
