import React from 'react';
import styles from './CheckboxField.module.scss';
import { SFCheckbox } from 'sfui';

export interface CheckboxFieldProps {
  label: string;
  value: string[] | undefined;
  options: string[];
  onChange: (value: string[] | undefined) => void;
}

export const CheckboxField = (
  props: CheckboxFieldProps
): React.ReactElement<CheckboxFieldProps> => {
  const value = props.value || [];

  const isOptionChecked = (option: string) => {
    return value && value.indexOf(option) !== -1;
  };

  const onOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      props.onChange([option, ...value]);
    } else {
      const index = value.indexOf(option);
      const newValue: string[] = [
        ...value.slice(0, index),
        ...value.slice(index + 1)
      ];
      props.onChange(newValue.length > 0 ? newValue : undefined);
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{props.label}</label>

      <div className={styles.options}>
        {props.options.map((option: string) => (
          <SFCheckbox
            key={option}
            label={option}
            checked={isOptionChecked(option)}
            onChange={(_e, checked) => onOptionChange(option, checked)}
          />
        ))}
      </div>
    </div>
  );
};
