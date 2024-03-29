import React from 'react';
import styles from './AgencyMembersForm.module.scss';
import { ChipFieldValueType, SFChipListInput } from 'sfui';
import { SubscriptionContext, UserContext } from '../../../../../Context';
import { RemainingSeats } from './RemainingSeats/RemainingSeats';
import { getPaidSubscription, isEmailValid } from '../../../../../Helpers';

export interface AgencyMembersFormProps {
  members: ChipFieldValueType[];
  onChange: (members: ChipFieldValueType[]) => void;
}

export const AgencyMembersForm = ({
  members,
  onChange
}: AgencyMembersFormProps): React.ReactElement<AgencyMembersFormProps> => {
  const { user } = React.useContext(UserContext);
  const { subscriptions } = React.useContext(SubscriptionContext);
  const paidSubscription = getPaidSubscription(subscriptions);

  return (
    <div className={styles.agencyMembersForm}>
      <div
        className={`${styles.emails} ${
          members.length === 0 ? styles.emptyList : ''
        }`}
      >
        {paidSubscription && (
          <RemainingSeats
            seatsBilled={paidSubscription.total_seats_billed}
            seatsUsed={paidSubscription.total_seats_used}
            membersAmmount={members.length}
          />
        )}

        <SFChipListInput
          label="E-mail"
          items={members}
          onChange={onChange}
          isValid={(value: string) =>
            isEmailValid(value) &&
            value.toLocaleLowerCase() !== user?.email?.toLocaleLowerCase()
          }
          helperText="List the emails separated by commas and press ENTER."
          inputMinWidth="full-width"
        />
      </div>
    </div>
  );
};
