import styles from './RadioField.module.scss';
import { SFRadio } from 'sfui';
import React from 'react';

export interface RadioFieldProps {
  label: string;
  options: string[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export const RadioField = (
  props: RadioFieldProps
): React.ReactElement<RadioFieldProps> => {
  return (
    <div className={styles.radioInput}>
      <label className={styles.fieldLabel}>{props.label}</label>

      <div className={styles.options}>
        {props.options.map((option: string) => (
          <SFRadio
            key={option}
            label={option}
            checked={props.value === option}
            onChange={(_event: React.ChangeEvent<HTMLInputElement>, checked) =>
              checked && props.onChange(option)
            }
          />
        ))}
      </div>
    </div>
  );
};
