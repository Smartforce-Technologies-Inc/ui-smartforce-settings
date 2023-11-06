import React, { Fragment } from 'react';
import styles from './GroupList.module.scss';
import { Group } from '../../../Models';
import { GroupListItem } from './GroupListItem/GroupListItem';
import { Divider } from '../../../Components/Divider/Divider';

export interface GroupListProps {
  groups: Group[];
  onClick: (group: Group) => void;
  onDelete: (group: Group) => void;
  onEdit: (group: Group) => void;
  onRestore: (group: Group) => void;
  onViewHistory: (group: Group) => void;
}

export const GroupList = ({
  groups,
  onClick,
  onDelete,
  onEdit,
  onRestore,
  onViewHistory
}: GroupListProps): React.ReactElement<GroupListProps> => {
  return (
    <div className={styles.groupList}>
      {groups.map((group: Group, index: number) => (
        <Fragment key={group.id}>
          <GroupListItem
            group={group}
            onClick={() => onClick(group)}
            onDelete={() => onDelete(group)}
            onEdit={() => onEdit(group)}
            onRestore={() => onRestore(group)}
            onViewHistory={() => onViewHistory(group)}
          />
          {index < groups.length - 1 && <Divider size={1} />}
        </Fragment>
      ))}
    </div>
  );
};
