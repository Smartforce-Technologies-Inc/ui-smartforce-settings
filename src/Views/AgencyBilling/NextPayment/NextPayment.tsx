import React from 'react';
import { formatUTCDateString } from '../../../Helpers';
import styles from './NextPayment.module.scss';

export interface NextPaymentProps {
  paymentDue: string;
  canceled: boolean;
}

export const NextPayment = ({
  paymentDue,
  canceled
}: NextPaymentProps): React.ReactElement<NextPaymentProps> => {
  const getFormattedDate = (): string => {
    return formatUTCDateString(paymentDue, 'MMMM D, YYYY');
  };

  return (
    <div className={styles.nextPayment}>
      <div className={styles.description}>
        <p className={styles.title}>
          {canceled ? 'Expires On' : 'Next Payment Due'}
        </p>
        <p className={styles.text}>{getFormattedDate()}</p>
      </div>
    </div>
  );
};
