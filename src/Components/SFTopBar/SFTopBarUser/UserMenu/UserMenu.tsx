import React from 'react';
import styles from './UserMenu.module.scss';
import { SFMenu, SFMenuProps } from 'sfui';

export interface UserMenuProps extends SFMenuProps {
  children: React.ReactNode;
}

const UserMenu = ({
  children,
  ...props
}: UserMenuProps): React.ReactElement<UserMenuProps> => {
  return (
    <SFMenu
      {...props}
      getContentAnchorEl={null}
      PaperProps={{ className: styles.userMenu }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {children}
    </SFMenu>
  );
};

export default UserMenu;
