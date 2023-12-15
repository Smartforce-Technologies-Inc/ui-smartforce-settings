import React, { Fragment } from 'react';
import { SFAlert, SFChip } from 'sfui';

export interface RemainingSeatsProps {
  seatsBilled: number;
  seatsUsed: number;
  membersAmmount: number;
}

export const RemainingSeats = ({
  seatsBilled,
  seatsUsed,
  membersAmmount
}: RemainingSeatsProps): React.ReactElement<RemainingSeatsProps> => {
  const additionalSeats: number = seatsBilled - seatsUsed;
  const remainingSeats: number = additionalSeats - membersAmmount;

  return (
    <Fragment>
      {remainingSeats < 0 && (
        <SFAlert
          type="info"
          title={`The agency has exceeded the number of available seats by ${-remainingSeats}.`}
        >
          Your agency owner will receive an invoice for the additional seats.
        </SFAlert>
      )}
      <div>
        <SFChip
          sfColor="default"
          variant="outlined"
          label={`${Math.max(remainingSeats, 0)} additional seats`}
        />
      </div>
    </Fragment>
  );
};
