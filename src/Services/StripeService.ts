import { CardNumberElement } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

let stripeAPI: Stripe | null = null;

export const loadStripeAPI = async (apiKey: string): Promise<Stripe | null> => {
  if (!stripeAPI) {
    stripeAPI = await loadStripe(apiKey);
  }

  return stripeAPI;
};

export async function getStripeCardToken(
  cardName: string,
  stripe: Stripe | null,
  elements: StripeElements | null
): Promise<string> {
  if (!stripe || !elements) {
    return Promise.reject('No valid stripe or stripe elements found');
  }

  const cardNumberElement = elements.getElement(CardNumberElement);

  if (!cardNumberElement) {
    return Promise.reject('No valid stripe card number element found');
  }

  const tokenResult = await stripe.createToken(cardNumberElement, {
    name: cardName
  });

  if (tokenResult.error) return Promise.reject(tokenResult.error);
  else return Promise.resolve(tokenResult.token.id);
}
