import React, { Fragment } from 'react';
import styles from './ChangePassword.module.scss';
import { SFAlert, SFButton, SFTextField } from 'sfui';
import { MediaContext } from '../../Context';
import { SettingsContentRender } from '../SettingsContentRender';
import { ApiContext } from '../../Context';
import { updateUser } from '../../Services';
import { SettingsError } from '../../Models';
import { isPasswordValid } from '../../Helpers';
import { PASSWORD_INVALID_MSG } from '../../Constants';

export interface ChangePasswordProps {
  onError: (e: SettingsError) => void;
  onLoading: () => void;
  onDone: () => void;
}

export const ChangePassword = ({
  onError,
  onLoading,
  onDone
}: ChangePasswordProps): React.ReactElement<ChangePasswordProps> => {
  const apiBaseUrl = React.useContext(ApiContext).settings;
  const { isPhone } = React.useContext(MediaContext);
  const [password, setPassword] = React.useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
  const [isPasswordError, setIsPasswordError] = React.useState<boolean>(false);
  const [isPasswordConfirmError, setIsPasswordConfirmError] =
    React.useState<boolean>(false);
  const [isMatchError, setIsMatchError] = React.useState<boolean>(false);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const checkSaveDisabled = (): boolean => {
    return password.length === 0 || passwordConfirm.length === 0;
  };

  const onSave = async () => {
    if (
      isPasswordValid(password) &&
      isPasswordValid(passwordConfirm) &&
      password === passwordConfirm
    ) {
      try {
        setIsSaving(true);
        onLoading();

        await updateUser(apiBaseUrl, { password });

        setPassword('');
        setPasswordConfirm('');
        setIsSaving(false);
        onDone();
      } catch (e: any) {
        console.error('ChangePassword::GeneralError', e);
        onError(e);
      }
    } else {
      setIsMatchError(password !== passwordConfirm);
      setIsPasswordError(!isPasswordValid(password));
      setIsPasswordConfirmError(!isPasswordValid(passwordConfirm));
    }
  };

  const onDiscard = () => {
    setPassword('');
    setPasswordConfirm('');
  };

  const renderContent = () => {
    return (
      <div className={styles.form}>
        {isMatchError && (
          <SFAlert
            type="error"
            title="The “New Password” and “Confirm Password” do not match."
          >
            Please try again.
          </SFAlert>
        )}

        <form>
          <SFTextField
            label="New Password"
            type="password"
            required
            value={password}
            error={isPasswordError}
            helperText={isPasswordError ? PASSWORD_INVALID_MSG : ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />

          <SFTextField
            label="Confirm Password"
            type="password"
            required
            value={passwordConfirm}
            error={isPasswordConfirmError}
            helperText={PASSWORD_INVALID_MSG}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirm(event.target.value)
            }
          />
        </form>
      </div>
    );
  };

  return (
    <div className={styles.changePassword}>
      <SettingsContentRender
        renderContent={renderContent}
        renderFooter={() => (
          <Fragment>
            {!isPhone && (
              <SFButton
                size="medium"
                sfColor="grey"
                variant="text"
                disabled={checkSaveDisabled()}
                onClick={onDiscard}
              >
                Discard
              </SFButton>
            )}
            <SFButton
              size={isPhone ? 'large' : 'medium'}
              fullWidth={isPhone}
              disabled={checkSaveDisabled()}
              isLoading={isSaving}
              onClick={onSave}
            >
              {isPhone ? 'Save Changes' : 'Save'}
            </SFButton>
          </Fragment>
        )}
      />
    </div>
  );
};
