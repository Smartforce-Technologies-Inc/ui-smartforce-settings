import React from 'react';
import styles from './Main.module.scss';
import {
  SFSettings,
  SettingsError,
  getUser,
  Area,
  BusinessCardSettings,
  Customer,
  Subscription,
  User,
  getAreas,
  getBusinessCardSettings,
  getCustomer,
  getSubscriptions,
  AreasContext,
  CustomerContext,
  SubscriptionContext,
  UserContext
} from '../../../src';
import { SFSpinner } from 'sfui';
import { BASE_URL } from '../App';

export const Main = (): React.ReactElement<{}> => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { setUser, setBusinessCardSettings } = React.useContext(UserContext);
  const { setAreas } = React.useContext(AreasContext);
  const { setCustomer } = React.useContext(CustomerContext);
  const { setSubscriptions } = React.useContext(SubscriptionContext);

  const onSettingsError = (e: SettingsError) => console.error(e);
  const onHome = () => console.log('onHome');
  const onUpgrade = () => console.log('onUpgrade');

  React.useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const userData: User = await getUser(BASE_URL);
      setUser(userData);

      if (userData.agency_id) {
        const customerData: Customer = await getCustomer(BASE_URL);
        setCustomer(customerData);

        if (customerData.status === 'Active') {
          const businessCardSettings: BusinessCardSettings =
            await getBusinessCardSettings(BASE_URL);
          setBusinessCardSettings(businessCardSettings);

          const subscriptions: Subscription[] = await getSubscriptions(
            BASE_URL
          );
          setSubscriptions(subscriptions);

          const areas: Area[] = await getAreas(BASE_URL);
          setAreas(areas);
        }
      }
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <React.Fragment>
      {isLoading && <SFSpinner />}
      {!isLoading && (
        <SFSettings
          className={styles.settings}
          enviroment="development"
          stripeApiKey={
            'pk_test_51MEZItJHbTAgxqXa6dzvaI4SubteHn7zemB9uj6hXqltKSoEAPKvBRlMeHvn06fR03vqKFkegkmH0QWdkPrpbuGe00CkvRGgxb'
          }
          selectedSectionName="my-profile"
          onError={onSettingsError}
          onHome={onHome}
          onUpgrade={onUpgrade}
        />
      )}
    </React.Fragment>
  );
};
