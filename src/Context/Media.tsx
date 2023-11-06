import React, { FC } from 'react';
import { useSFMediaQuery } from 'sfui';
import {
  EXTRA_LARGE_SCREEN,
  LARGE_SCREEN,
  MEDIUM_SCREEN,
  PHONE_MEDIA_SCREEN,
  SMALL_SCREEN
} from '../Constants/Media';

export type MediaContextState = {
  isPhone: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isExtraLargeScreen: boolean;
};

const contextDefaultValues: MediaContextState = {
  isPhone: false,
  isSmallScreen: false,
  isMediumScreen: false,
  isLargeScreen: false,
  isExtraLargeScreen: false
};

export const MediaContext =
  React.createContext<MediaContextState>(contextDefaultValues);

export const MediaProvider: FC = ({ children }) => {
  const isPhone = useSFMediaQuery(PHONE_MEDIA_SCREEN);
  const isSmallScreen = useSFMediaQuery(SMALL_SCREEN);
  const isMediumScreen = useSFMediaQuery(MEDIUM_SCREEN);
  const isLargeScreen = useSFMediaQuery(LARGE_SCREEN);
  const isExtraLargeScreen = useSFMediaQuery(EXTRA_LARGE_SCREEN);

  return (
    <MediaContext.Provider
      value={{
        isPhone,
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,
        isExtraLargeScreen
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
