import React from 'react';
import styles from './BusinessSwitchForm.module.scss';
import { SFSwitch, SFText } from 'sfui';

const getSwitchLabel = (key: string, isCustomer: boolean): string => {
  switch (key) {
    case 'show_name':
      return isCustomer ? 'Agency Name' : 'Full Name';
    case 'show_email':
      return 'E-mail';
    case 'show_phone':
      return 'Phone';
    case 'show_website':
      return 'Website';
    case 'show_state':
      return 'State';
    case 'show_officer_id':
      return 'Officer ID Number';
    default:
      return 'Photo';
  }
};

const isKeyInList = (key: string, list: string[]): boolean => {
  return list.includes(key);
};

interface SwitchValue {
  [key: string]: boolean;
}

export interface BusinessCardSwitchFormProps {
  disabledList: string[];
  hiddenList: string[];
  onChange: (key: string, checked: boolean) => void;
  title: string;
  values: SwitchValue;
}

export const BusinessCardSwitchForm = ({
  disabledList,
  hiddenList,
  onChange,
  title,
  values
}: BusinessCardSwitchFormProps): React.ReactElement<BusinessCardSwitchFormProps> => {
  return (
    <div className={styles.businessCardSwitchForm}>
      <SFText type="component-1">{title}</SFText>
      {Object.keys(values).map(
        (key) =>
          !isKeyInList(key, hiddenList) && (
            <SFSwitch
              key={key}
              label={getSwitchLabel(key, title.includes('Agency'))}
              checked={values[key]}
              disabled={isKeyInList(key, disabledList)}
              onChange={(_, checked) => onChange(key, checked)}
            />
          )
      )}
    </div>
  );
};
