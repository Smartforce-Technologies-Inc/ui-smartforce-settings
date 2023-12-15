import { SFThemeType } from 'sfui';

const LS_THEME_TYPE_KEY = 'Smartforce.ThemeType';

export interface ThemeTypeServiceProps {
  isSaved: () => boolean;
  getThemeType: () => SFThemeType;
  applyThemeType: (theme: SFThemeType) => void;
  saveThemeType: (theme: SFThemeType) => void;
}

export class ThemeTypeServiceClass implements ThemeTypeServiceProps {
  constructor() {
    if (this.isSaved()) {
      this.applyThemeType(this.getThemeType());
    }
  }

  public isSaved(): boolean {
    return localStorage.getItem(LS_THEME_TYPE_KEY) !== null;
  }

  public getThemeType(): SFThemeType {
    const theme: string | null = localStorage.getItem(LS_THEME_TYPE_KEY);

    return theme
      ? (theme as SFThemeType)
      : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'night'
      : 'day';
  }

  public applyThemeType(themeType: SFThemeType) {
    const body = document.getElementsByTagName('body')[0];
    if (themeType === 'night') {
      body.classList.add('nightMode');
    } else {
      body.classList.remove('nightMode');
    }
  }

  public saveThemeType(themeType: SFThemeType) {
    localStorage.setItem(LS_THEME_TYPE_KEY, themeType);
    this.applyThemeType(themeType);
  }
}

const ThemeTypeService = new ThemeTypeServiceClass();
export default ThemeTypeService;
