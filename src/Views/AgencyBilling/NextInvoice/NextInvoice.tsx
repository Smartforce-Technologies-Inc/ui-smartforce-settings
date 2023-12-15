import React from 'react';
import styles from './NextInvoice.module.scss';
import { SFChip } from 'sfui';
import { getInvoiceAmmount } from '../../../Helpers';
import { BillingCycleType } from '../../../Models';

export interface NextInvoiceProps {
  isColorado: boolean;
  plan: string;
  usedSeats: number;
  billedSeats: number;
  billingCycle: BillingCycleType;
  canceled: boolean;
}

export const NextInvoice = ({
  isColorado,
  plan,
  usedSeats,
  billedSeats,
  billingCycle,
  canceled
}: NextInvoiceProps): React.ReactElement<NextInvoiceProps> => {
  const additionalSeats: number = billedSeats - usedSeats;
  const nextInvoiceCost: string = `US$${getInvoiceAmmount(
    isColorado,
    plan,
    billingCycle,
    billedSeats
  ).toFixed(2)}`;

  return (
    <div className={styles.nextInvoice}>
      <div className={styles.description}>
        <p className={styles.title}>Next Invoice</p>
        <p className={styles.text}>{canceled ? 'Canceled' : nextInvoiceCost}</p>
      </div>
      <div className={styles.chips}>
        <SFChip size="small" sfColor="primary" label={`${usedSeats} members`} />
        <SFChip
          size="small"
          sfColor="default"
          variant="outlined"
          label={`${additionalSeats} additional seats`}
        />
      </div>
    </div>
  );
};
