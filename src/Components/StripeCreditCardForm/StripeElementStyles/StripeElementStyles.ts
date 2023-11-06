import styles from './StripeElementStyles.module.scss';

import {
  StripeElementClasses,
  StripeElementStyle,
  StripeElementStyleVariant
} from '@stripe/stripe-js';

import {
  SFGreyMainDark,
  SFGreyMainLight,
  SFRedMainDark,
  SFRedMainLight,
  SFSurfaceDark,
  SFSurfaceLight,
  SFTextBlack,
  SFTextWhite,
  SFThemeType
} from 'sfui';

export const getElementClasses = (): StripeElementClasses => {
  return {
    base: `${styles.stripeElement}`,
    focus: `${styles.stripeElementFocus}`,
    invalid: `${styles.stripeElementInvalid}`,
    webkitAutofill: `${styles.stripeElementWebkitAutofill}`
  };
};

const elementBaseStyles: StripeElementStyleVariant = {
  fontFamily: 'Roboto, Helvetica Neue, Helvetica, sans-serif',
  fontSmoothing: 'antialiased',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: '0.00938em'
};

export const getElementStyle = (themeType: SFThemeType): StripeElementStyle => {
  return {
    base: {
      ...elementBaseStyles,
      color: themeType === 'day' ? SFTextBlack : SFTextWhite,
      iconColor: themeType === 'day' ? SFGreyMainLight : SFGreyMainDark,
      backgroundColor: themeType === 'day' ? SFSurfaceLight : SFSurfaceDark,
      ':hover': {
        color: themeType === 'day' ? SFTextBlack : SFTextWhite
      },
      ':focus': {
        color: themeType === 'day' ? SFTextBlack : SFTextWhite
      },
      '::placeholder': {
        color: themeType === 'day' ? SFGreyMainLight : SFGreyMainDark
      }
    },
    invalid: {
      color: themeType === 'day' ? SFRedMainLight : SFRedMainDark,
      iconColor: themeType === 'day' ? SFRedMainLight : SFRedMainDark
    }
  };
};
