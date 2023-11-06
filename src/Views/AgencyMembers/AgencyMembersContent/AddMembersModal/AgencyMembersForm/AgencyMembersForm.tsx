import React from 'react';
import styles from './AgencyMembersForm.module.scss';
import { ChipFieldValueType, SFChipListInput } from 'sfui';
import { SubscriptionContext, UserContext } from '../../../../../Context';
import { RemainingSeats } from './RemainingSeats/RemainingSeats';
import { isEmailValid } from '../../../../../Helpers';

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
  const { total_seats_billed, total_seats_used } = subscriptions[0];

  return (
    <div className={styles.agencyMembersForm}>
      <div
        className={`${styles.emails} ${
          members.length === 0 ? styles.emptyList : ''
        }`}
      >
        <RemainingSeats
          seatsBilled={total_seats_billed}
          seatsUsed={total_seats_used}
          membersAmmount={members.length}
        />

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
