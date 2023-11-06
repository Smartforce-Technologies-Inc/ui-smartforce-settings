import { SFMedia } from 'sfui';

export const PHONE_MEDIA_SCREEN: string = `(max-width: ${
  SFMedia.SM_WIDTH - 1
}px)`;

export const EXTRA_SMALL_SCREEN: string = `(min-width: ${SFMedia.XS_WIDTH}px)`;
export const SMALL_SCREEN: string = `(min-width: ${SFMedia.SM_WIDTH}px)`;
export const MEDIUM_SCREEN: string = `(min-width: ${SFMedia.MD_WIDTH}px)`;
export const LARGE_SCREEN: string = `(min-width: ${SFMedia.LG_WIDTH}px)`; // BIG_MEDIA_SCREEN
export const EXTRA_LARGE_SCREEN: string = `(min-width: ${SFMedia.XL_WIDTH}px)`;
export const EXTRA_EXTRA_LARGE_SCREEN: string = `(min-width: ${SFMedia.XXL_WIDTH}px)`;
