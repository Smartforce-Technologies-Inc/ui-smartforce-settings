export type AppEnv = 'local' | 'development' | 'qa' | 'demo' | 'production';

export type ApplicationProduct = 'cc' | 'shift';

type ApplicationProductDict = Record<ApplicationProduct, string>;

export type ApplicationUrlDict = Record<AppEnv, ApplicationProductDict>;

export interface AppLogo {
  dayMode: string;
  nightMode: string;
}

export interface SFApp {
  product: ApplicationProduct;
  logo: AppLogo;
}
