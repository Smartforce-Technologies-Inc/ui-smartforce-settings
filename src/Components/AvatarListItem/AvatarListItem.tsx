import React from 'react';
import styles from './AvatarListItem.module.scss';
import { SFText } from 'sfui';
import { Avatar } from '../Avatar/Avatar';

export interface AvatarListItemProps {
  name: string;
  url?: string;
}

export const AvatarListItem = ({
  name,
  url
}: AvatarListItemProps): React.ReactElement<AvatarListItemProps> => {
  return (
    <div className={styles.avatarListItem}>
      <Avatar name={name} url={url} />
      <SFText type="component-2">{name}</SFText>
    </div>
  );
};
