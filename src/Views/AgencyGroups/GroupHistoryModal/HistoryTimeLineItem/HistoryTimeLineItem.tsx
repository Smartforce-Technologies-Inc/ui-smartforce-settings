import React from 'react';
import styles from './HistoryTimeLineItem.module.scss';
import { Avatar } from '../../../../Components/Avatar/Avatar';
import { SFText } from 'sfui';

export interface HistoryTimeLineItemProps {
  avatarUrl?: string;
  userName: string;
}

export const HistoryTimeLineItem = ({
  avatarUrl,
  userName
}: HistoryTimeLineItemProps): React.ReactElement<HistoryTimeLineItemProps> => {
  return (
    <div className={styles.historyTimeLineItem}>
      <Avatar name={userName} url={avatarUrl} />
      <SFText type="component-2">{userName}</SFText>
    </div>
  );
};
