import React from 'react';
import styles from './AvatarListItem.module.scss';
import { SFText } from 'sfui';
import { Avatar } from '../Avatar/Avatar';

export interface AvatarListItemProps {
  name: string;
  url?: string;
  title?: string;
  subTitle?: string;
}

export const AvatarListItem = ({
  name,
  url,
  title,
  subTitle
}: AvatarListItemProps): React.ReactElement<AvatarListItemProps> => {
  return (
    <div className={styles.avatarListItem}>
      <Avatar name={name} url={url} />
      <div className={styles.text}>
        <SFText type="component-2">{name}</SFText>
        <SFText type="component-2" sfColor="neutral">
          {title}
        </SFText>
        <SFText type="component-2" sfColor="neutral">
          {subTitle}
        </SFText>
      </div>
    </div>
  );
};
