import { ApplicationUrlDict, SFApp } from '../Models';
import DM_CC_LOGO from '../Images/DMLogoCC';
import NM_CC_LOGO from '../Images/NMLogoCC';
import DM_SHIFT_LOGO from '../Images/DMLogoShift';
import NM_SHIFT_LOGO from '../Images/NMLogoShift';

export const SF_APPS: SFApp[] = [
  { product: 'cc', logo: { dayMode: DM_CC_LOGO, nightMode: NM_CC_LOGO } },
  {
    product: 'shift',
    logo: { dayMode: DM_SHIFT_LOGO, nightMode: NM_SHIFT_LOGO }
  }
];

// Citizen Contact Urls
const CC_PROD_URL: string = 'https://citizencontact.app/';
const CC_DEV_URL: string = 'http://localhost:3000/';
const CC_QA_URL: string = 'https://qa.citizencontact.app/';
const CC_DEMO_URL: string = 'https://demo.citizencontact.app/';

// Shift Urls
const SHIFT_PROD_URL: string = 'http://shifts.smartforce.com/';
const SHIFT_DEV_URL: string = 'http://localhost:3001/';
const SHIFT_QA_URL: string = 'http://shifts-qa.smartforce.com/';
const SHIFT_DEMO_URL: string = 'http://shifts-demo.smartforce.com/';

// Api Urls
export const API_PROD_URL: string = 'https://hub.smartforce.com/api';
export const API_DEV_URL: string = 'http://localhost:8001/api';
export const API_QA_URL: string = 'https://hub-qa.smartforce.com/api';
export const API_DEMO_URL: string = 'https://hub-demo.smartforce.com/api';

export const SF_APPS_URLS_DICT: ApplicationUrlDict = {
  development: {
    cc: CC_DEV_URL,
    shift: SHIFT_DEV_URL
  },
  qa: {
    cc: CC_QA_URL,
    shift: SHIFT_QA_URL
  },
  production: {
    cc: CC_PROD_URL,
    shift: SHIFT_PROD_URL
  },
  demo: {
    cc: CC_DEMO_URL,
    shift: SHIFT_DEMO_URL
  }
};
