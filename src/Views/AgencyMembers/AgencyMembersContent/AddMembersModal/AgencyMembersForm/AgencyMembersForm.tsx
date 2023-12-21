import React from 'react';
import styles from './AgencyMembersForm.module.scss';
import { ChipFieldValueType, SFChipListInput } from 'sfui';
import {
  SubscriptionContext,
  UserContext,
  CustomerContext
} from '../../../../../Context';
import { RemainingSeats } from './RemainingSeats/RemainingSeats';
import { isEmailValid } from '../../../../../Helpers';
import {
  COLORADO_STATE,
  PLAN_ANALYTICS,
  PLAN_ENGAGE
} from '../../../../../Constants';

export interface AgencyMembersFormProps {
  members: ChipFieldValueType[];
  onChange: (members: ChipFieldValueType[]) => void;
}

export const AgencyMembersForm = ({
  members,
  onChange
}: AgencyMembersFormProps): React.ReactElement<AgencyMembersFormProps> => {
  const { user } = React.useContext(UserContext);
  const { customer } = React.useContext(CustomerContext);
  const { subscriptions } = React.useContext(SubscriptionContext);
  const { total_seats_billed, total_seats_used } = subscriptions[0];

  return (
    <div className={styles.agencyMembersForm}>
      <div
        className={`${styles.emails} ${
          members.length === 0 ? styles.emptyList : ''
        }`}
      >
        {/* 
          TEMPORAL HOT FIX: CC-3224
          Conditional for plan and state name added.
          Assuming that the agencies only have CC subscription plan.
        */}
        {subscriptions[0].plan === PLAN_ANALYTICS ||
          (subscriptions[0].plan === PLAN_ENGAGE &&
            customer?.state_name !== COLORADO_STATE && (
              <RemainingSeats
                seatsBilled={total_seats_billed}
                seatsUsed={total_seats_used}
                membersAmmount={members.length}
              />
            ))}

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
