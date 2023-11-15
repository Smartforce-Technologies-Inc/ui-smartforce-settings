import React, { Fragment, useContext } from 'react';
import styles from './PaymentMethod.module.scss';
import { HttpStatusCode, SFButton } from 'sfui';
import {
  PanelModal,
  PanelModalAnchor,
  StripeCardError,
  StripeCreditCardForm
} from '../../../Components';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { SubscriptionContext, UserContext } from '../../../Context';
import {
  AGENCY_SUBSCRIPTION_UPDATE,
  SETTINGS_CUSTOM_EVENT
} from '../../../Constants';
import {
  checkPermissions,
  dispatchCustomEvent,
  getCardErrorMessage,
  upperFirstChar
} from '../../../Helpers';
import {
  SubscriptionPayment,
  SettingsError,
  ApplicationProduct
} from '../../../Models';
import { updateCreditCard, getStripeCardToken } from '../../../Services';
import { useSubscription } from '../../../Hooks';
import { ApiContext } from '../../../Context';

const getPaymentText = (payment: SubscriptionPayment): string => {
  const paymentMethod = payment.method;

  switch (paymentMethod) {
    case 'card':
      return `*** **** **** ${payment.card?.last_4_digits}`;
    case 'wire_transfer':
      return 'Wire Transfer';
    default:
      return upperFirstChar(paymentMethod);
  }
};

export interface PaymentMethodProps {
  productName: ApplicationProduct;
  payment: SubscriptionPayment;
  onClose: () => void;
  onError: (e: SettingsError) => void;
}

export const PaymentMethod = ({
  productName,
  payment,
  onClose,
  onError
}: PaymentMethodProps): React.ReactElement<PaymentMethodProps> => {
  const apiBaseUrl = useContext(ApiContext).settings;
  const elements = useElements();
  const stripe = useStripe();
  const { setSubscriptions } = useContext(SubscriptionContext);
  const { user } = useContext(UserContext);
  const subscription = useSubscription(productName);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [paymentError, setPaymentError] = React.useState<
    StripeCardError | undefined
  >();

  const [isCreditCardValid, setIsCreditCardValid] =
    React.useState<boolean>(false);
  const [cardOwnerName, setCardOwnerName] = React.useState<string>('');

  const [anchor, setAnchor] = React.useState<PanelModalAnchor>('right');

  const isSaveDisabled = !isCreditCardValid || cardOwnerName === '';

  const paymentExpirationText: string = `Expires ${payment.card?.exp_month}/${payment.card?.exp_year}`;

  const onPanelClose = () => {
    setPaymentError(undefined);
    setCardOwnerName('');
    setIsOpen(false);
  };

  const onChangeLink = () => {
    setIsOpen(true);
  };

  const onStripeCreditCardChange = (isValid: boolean) => {
    setIsCreditCardValid(isValid);
  };

  const onCardOwnerNameChange = (name: string) => {
    setCardOwnerName(name);
  };

  const onCreditCardSubmit = async () => {
    setIsLoading(true);
    try {
      if (elements && stripe) {
        const stripeCardToken = await getStripeCardToken(
          cardOwnerName,
          stripe,
          elements
        );

        const newCardInformation = await updateCreditCard(
          apiBaseUrl,
          stripeCardToken,
          productName
        );

        if (subscription) {
          setSubscriptions((subscriptions) => {
            const currentSubscriptionIndex = subscriptions.findIndex(
              (s) => s.id === subscription.id
            );

            return [
              ...subscriptions.slice(0, currentSubscriptionIndex - 1),
              {
                ...subscription,
                payment: {
                  method: 'card',
                  card: { ...newCardInformation }
                }
              },
              ...subscriptions.slice(currentSubscriptionIndex)
            ];
          });
        }

        dispatchCustomEvent(SETTINGS_CUSTOM_EVENT, {
          message: 'Your change was saved successfully.'
        });

        setIsLoading(false);
        onPanelClose();
      }
    } catch (e) {
      console.error('Settings::AgencyBilling::ChangeCreditCard');
      setIsLoading(false);
      const error: SettingsError = e as SettingsError;

      if (error.code === HttpStatusCode.BAD_REQUEST && error.detail) {
        const cardErrorMsg = getCardErrorMessage(error.detail);
        setPaymentError({
          title: 'We could not proceed with the credit card change.',
          message: cardErrorMsg
        });
      } else {
        onError(error);
      }
    }
  };

  return (
    <div className={styles.paymentMethod}>
      <PanelModal
        anchor={anchor}
        title="Change Credit Card"
        actionButton={{
          label: 'Save Changes',
          disabled: isSaveDisabled || isLoading,
          onClick: onCreditCardSubmit,
          isLoading: isLoading
        }}
        dialogCloseButton={{
          label: 'Discard',
          variant: 'text',
          sfColor: 'grey',
          onClick: onPanelClose
        }}
        isOpen={isOpen}
        onBack={onPanelClose}
        onClose={() => {
          setAnchor('bottom');
          onClose();
          onPanelClose();
        }}
      >
        <StripeCreditCardForm
          error={paymentError}
          name={cardOwnerName}
          onCardValidChange={onStripeCreditCardChange}
          onNameChange={onCardOwnerNameChange}
        />
      </PanelModal>
      <div className={styles.description}>
        <p className={styles.title}>Payment Method</p>
        <div className={styles.method}>
          <p className={styles.text}>{getPaymentText(payment)}</p>
          {payment.card && (
            <Fragment>
              <p className={styles.expiration}>{paymentExpirationText}</p>
              {checkPermissions(
                AGENCY_SUBSCRIPTION_UPDATE,
                user?.role.permissions
              ) && (
                <SFButton
                  className={styles.changeLink}
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={onChangeLink}
                >
                  Change Credit Card
                </SFButton>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
