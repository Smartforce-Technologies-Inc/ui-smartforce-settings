import React, { useContext } from 'react';
import styles from './ActionInfo.module.scss';
import { SFText } from 'sfui';
import { formatDateString } from '../../../../../Helpers';
import { UserContext } from '../../../../../Context';
import { GroupUser, User } from '../../../../../Models';

export interface ActionInfoProps {
  type: 'Created' | 'Deleted';
  user: GroupUser;
  date: string;
}

export const ActionInfo = ({
  type,
  user,
  date
}: ActionInfoProps): React.ReactElement<ActionInfoProps> => {
  const contextUser = useContext(UserContext).user as User;

  const nameLabel: string = `${user.name}${
    user.id === contextUser.id ? ' (You)' : ''
  }`;
  return (
    <SFText className={styles.actionInfo} type="component-2" sfColor="neutral">
      {type} by <span className={styles.name}>{nameLabel}</span> on{' '}
      {formatDateString(date, 'MM/DD/YYYY')}
    </SFText>
  );
};
