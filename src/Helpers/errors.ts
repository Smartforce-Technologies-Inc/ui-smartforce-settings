import { HttpStatusCode } from 'sfui';

import {
  ERROR_STRIPE_CVC,
  ERROR_STRIPE_EXPIRED,
  ERROR_STRIPE_GENERIC_DECLINE,
  ERROR_STRIPE_INSUFFICIENT_FUNDS,
  ERROR_STRIPE_LOST,
  ERROR_STRIPE_NUMBER,
  ERROR_STRIPE_PROCESSING,
  ERROR_STRIPE_STOLEN
} from '../Constants/Errors';
import {
  PAYMENT_ERROR_CARD_DETAILS_MSG,
  PAYMENT_ERROR_CARD_ISSUE_MSG,
  PAYMENT_ERROR_PROCESS_MSG
} from '../Constants';

export const isUserInvitationAlreadyAccepted = (e: any): boolean =>
  e.code === HttpStatusCode.BAD_REQUEST &&
  e.detail === 'USER_INVITATION_ALREADY_ACCEPTED';

export function isCardIssueError(e: string): boolean {
  const cardIssueErrors: string[] = [
    ERROR_STRIPE_GENERIC_DECLINE,
    ERROR_STRIPE_INSUFFICIENT_FUNDS,
    ERROR_STRIPE_LOST,
    ERROR_STRIPE_STOLEN,
    ERROR_STRIPE_EXPIRED
  ];

  return cardIssueErrors.includes(e);
}

export function isCardDetailsError(e: string): boolean {
  return e === ERROR_STRIPE_NUMBER || e === ERROR_STRIPE_CVC;
}

export function getCardErrorMessage(e: string): string {
  if (isCardIssueError(e)) {
    return PAYMENT_ERROR_CARD_ISSUE_MSG;
  } else if (isCardDetailsError(e)) {
    return PAYMENT_ERROR_CARD_DETAILS_MSG;
  } else if (e === ERROR_STRIPE_PROCESSING) {
    return PAYMENT_ERROR_PROCESS_MSG;
  } else {
    return e;
  }
}
