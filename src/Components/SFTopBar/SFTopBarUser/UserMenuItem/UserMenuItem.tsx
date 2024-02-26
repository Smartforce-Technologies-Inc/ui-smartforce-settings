import React from 'react';
import styles from './UserMenuItem.module.scss';

import { SFMenuItem, SFText } from 'sfui';

export interface UserMenuItemProps {
  className?: string;
  title?: string;
  subTitle?: string;
  children?: React.ReactElement;
  onClick?: () => void;
}

export const UserMenuItem = React.forwardRef(
  (
    { className = '', title, subTitle, children, onClick }: UserMenuItemProps,
    ref
  ): React.ReactElement<UserMenuItemProps> => {
    return (
      <SFMenuItem
        className={`${styles.UserMenuItem} ${className}`}
        onClick={onClick}
        innerRef={ref}
      >
        {children && <div className={styles.content}>{children}</div>}
        <div className={styles.textContainer}>
          <SFText type="component-1">{title}</SFText>
          {subTitle && (
            <SFText
              className={styles.subtitle}
              type="component-3"
              sfColor="neutral"
            >
              {subTitle}
            </SFText>
          )}
        </div>
      </SFMenuItem>
    );
  }
);
