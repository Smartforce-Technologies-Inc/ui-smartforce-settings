import React, { Fragment, useContext, useEffect } from 'react';
import styles from './AgencyInformation.module.scss';
import { SFButton } from 'sfui';
import { CustomerContext, MediaContext } from '../../Context';
import { isEmailValid, isEqualObject, isFieldEmpty } from '../../Helpers';
import { Customer, SettingsError } from '../../Models';
import { updateBadge, updateCustomer } from '../../Services/CustomerService';
import { AgencyForm } from '../../Components/Agency/AgencyForm/AgencyForm';
import { SettingsContentRender } from '../SettingsContentRender';
import { ApiContext } from '../../Context';

export interface AgencyInformationProps {
  onLoading: () => void;
  onDone: () => void;
  onError: (e: SettingsError) => void;
}

export const AgencyInformation = ({
  onLoading,
  onDone,
  onError
}: AgencyInformationProps): React.ReactElement<AgencyInformationProps> => {
  const apiBaseUrl = useContext(ApiContext).settings;
  const { isPhone } = React.useContext(MediaContext);
  const { customer, setCustomer } = React.useContext(CustomerContext);
  const [customerValue, setCustomerValue] = React.useState<Partial<Customer>>(
    customer as Customer
  );
  const [isEmailError, setIsEmailError] = React.useState<boolean>(false);
  const [badge, setBadge] = React.useState<string | Blob | undefined | null>(
    customer?.badge
  );
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const isFormValid =
    !isFieldEmpty(customerValue.full_name) &&
    !isFieldEmpty(customerValue.ori) &&
    !isFieldEmpty(customerValue.state_name) &&
    !isFieldEmpty(customerValue.phone1) &&
    !isFieldEmpty(customerValue.email);

  useEffect(() => {
    setCustomerValue(customer as Customer);
    setBadge(customer?.badge);
  }, [customer]);

  const checkBadgeChange = (): boolean => badge instanceof Blob;

  const onSave = async () => {
    const checkEmail: boolean = isEmailValid(customerValue.email as string);
    setIsEmailError(!checkEmail);
    if (checkEmail) {
      try {
        setIsSaving(true);
        onLoading();
        let newCustomer: Customer = { ...(customer as Customer) };
        if (
          !isEqualObject<Partial<Customer>>(customer as Customer, customerValue)
        ) {
          await updateCustomer(apiBaseUrl, customerValue);
          newCustomer = {
            ...newCustomer,
            ...customerValue
          };
        }
        if (checkBadgeChange()) {
          const badgeUrl: string = await updateBadge(apiBaseUrl, badge as Blob);
          newCustomer.badge = badgeUrl;
        }
        setCustomer(newCustomer);
        setIsSaving(false);
        onDone();
      } catch (e: any) {
        console.error('Settings::AgencyInformation::Update', e);
        onError(e);
      }
    }
  };

  const onDiscard = () => {
    setCustomerValue(customer as Customer);
    setBadge((customer as Customer).badge);
  };

  const isButtonDisabled: boolean =
    !isFormValid ||
    (isEqualObject<Partial<Customer>>(customer as Customer, customerValue) &&
      !checkBadgeChange());

  return (
    <div className={styles.agencyInformation}>
      <SettingsContentRender
        renderContent={() => (
          <AgencyForm
            value={customerValue}
            badge={badge}
            isNew={false}
            isEmailError={isEmailError}
            onChange={(newValue: Partial<Customer>) =>
              setCustomerValue(newValue)
            }
            onBadgeChange={(badge: Blob) => setBadge(badge)}
          />
        )}
        renderFooter={() => (
          <Fragment>
            {!isPhone && (
              <SFButton
                size="medium"
                sfColor="grey"
                variant="text"
                disabled={isButtonDisabled || isSaving}
                onClick={onDiscard}
              >
                Discard
              </SFButton>
            )}
            <SFButton
              size={isPhone ? 'large' : 'medium'}
              fullWidth={isPhone}
              disabled={isButtonDisabled}
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
