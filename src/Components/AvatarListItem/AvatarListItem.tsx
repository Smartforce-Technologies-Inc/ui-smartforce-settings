import React from 'react';
import styles from './AvatarListItem.module.scss';
import { SFText } from 'sfui';
import { Avatar } from '../Avatar/Avatar';

export interface AvatarListItemProps {
  name: string;
  url?: string;
  children?: React.ReactNode;
}

export const AvatarListItem = ({
  name,
  url,
  children
}: AvatarListItemProps): React.ReactElement<AvatarListItemProps> => {
  return (
    <div className={styles.avatarListItem}>
      <Avatar name={name} url={url} />
      <div>
        <SFText type="component-2">{name}</SFText>
        {children}
      </div>
    </div>
  );
};
