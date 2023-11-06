import React, { useContext, useRef } from 'react';
import styles from './MemberListItem.module.scss';
import { SFChip, SFCollapse, SFIconButton, SFMenu, SFMenuItem } from 'sfui';
import { UserContext } from '../../../../../Context';
import { Avatar } from '../../../../../Components/Avatar/Avatar';
import {
  AGENCY_INVITATIONS_RESEND,
  AGENCY_MEMBERS_ROLE_UPDATE,
  AGENCY_MEMBERS_REMOVE,
  AGENCY_INVITATIONS_REMOVE
} from '../../../../../Constants';
import {
  checkPermissions,
  dispatchCustomEvent,
  isRoleOwner
} from '../../../../../Helpers';
import { User, Member, SettingsError } from '../../../../../Models';
import { resendInvitation } from '../../../../../Services';
import { SETTINGS_CUSTOM_EVENT } from '../../../../../Constants';
import { ApiContext } from '../../../../../SFSettings';

export interface MemberListItemProps {
  member: Member;
  wasRemoved: boolean;
  onError: (e: SettingsError) => void;
  onClick: () => void;
  onChangeRole: () => void;
  onRemove: () => void;
  onTransitionEnd: () => void;
}

export const MemberListItem = ({
  member,
  wasRemoved,
  onError,
  onClick,
  onTransitionEnd,
  ...props
}: MemberListItemProps): React.ReactElement<MemberListItemProps> => {
  const apiBaseUrl = useContext(ApiContext);
  const user = useContext(UserContext).user as User;
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const refAnchorEl = useRef<HTMLDivElement | null>(null);

  const isUser: boolean = member.email === user.email;
  const isActive: boolean = member.status === 'Active';
  const isRoleLower: boolean =
    !member.role || member.role.priority > user.role.priority;

  const onResendInvitation = async () => {
    setIsMenuOpen(false);
    try {
      if (member.email) {
        await resendInvitation(apiBaseUrl, member.email);

        dispatchCustomEvent(SETTINGS_CUSTOM_EVENT, {
          message: 'The invitation was resent.'
        });
      }
    } catch (e: any) {
      console.error('MemberListItem::ResendInvitation', e);
      onError(e);
    }
  };

  const onChangeRole = () => {
    setIsMenuOpen(false);
    props.onChangeRole();
  };

  const onRemove = () => {
    setIsMenuOpen(false);
    props.onRemove();
  };

  const showResendInvitationItem =
    !isActive &&
    checkPermissions(AGENCY_INVITATIONS_RESEND, user.role.permissions);

  const showChangeRoleItem =
    isActive &&
    checkPermissions(AGENCY_MEMBERS_ROLE_UPDATE, user.role.permissions);

  const showRemoveItem = checkPermissions(
    isActive ? AGENCY_MEMBERS_REMOVE : AGENCY_INVITATIONS_REMOVE,
    user.role.permissions
  );

  const showMenu = !isUser && (showResendInvitationItem || isRoleLower);

  return (
    <SFCollapse
      className={styles.memberListItem}
      timeout={480}
      in={!wasRemoved}
      onExited={onTransitionEnd}
    >
      <div className={styles.itemWrapper}>
        <SFMenu
          open={isMenuOpen}
          anchorEl={refAnchorEl ? refAnchorEl.current : null}
          onClose={() => setIsMenuOpen(false)}
        >
          {showResendInvitationItem && (
            <SFMenuItem onClick={onResendInvitation}>
              Resend invitation
            </SFMenuItem>
          )}
          {showChangeRoleItem && (
            <SFMenuItem onClick={onChangeRole}>Change role</SFMenuItem>
          )}
          {showRemoveItem && <SFMenuItem onClick={onRemove}>Remove</SFMenuItem>}
        </SFMenu>

        <div className={styles.content} onClick={onClick}>
          <Avatar name={member.name} url={member.avatar_thumbnail_url} />

          <div className={styles.memberInfo} onClick={onClick}>
            {member.name && (
              <p className={styles.nameWrapper}>
                <span className={styles.name}>{member.name}</span>
                {isUser && (
                  <span className={styles.textNeutral}>{'(You)'}</span>
                )}
              </p>
            )}

            <p className={`${styles.email} ${styles.textNeutral}`}>
              {member.email}
            </p>

            <div className={styles.chips}>
              {member.role && (
                <SFChip
                  label={member.role?.name}
                  sfColor="primary"
                  variant={isRoleOwner(member.role.id) ? 'default' : 'outlined'}
                  size="small"
                />
              )}

              <SFChip
                label={member.status}
                sfColor={member.status === 'Active' ? 'primary' : 'default'}
                variant="outlined"
                size="small"
              />
            </div>
          </div>
        </div>

        <div className={styles.menu} ref={refAnchorEl}>
          {showMenu && (
            <SFIconButton
              sfIcon="Other"
              sfSize="medium"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>
      </div>
    </SFCollapse>
  );
};
