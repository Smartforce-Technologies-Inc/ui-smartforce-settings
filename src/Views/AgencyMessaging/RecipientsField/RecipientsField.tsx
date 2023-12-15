import React from 'react';
import { ChipInputFieldValueType, SFChipListInput } from 'sfui';
import { isEmailFormatValid } from '../../../Helpers';
import { CustomerContext } from '../../../Context';

const hasInvalidValues = (values: ChipInputFieldValueType[]): boolean => {
  return (
    values.find((value: ChipInputFieldValueType) => value.isValid === false) !==
    undefined
  );
};

const transformToChipValues = (values: string[]): ChipInputFieldValueType[] => {
  return values.map((value: string) => {
    return { value, isValid: isEmailFormatValid(value) };
  });
};

export interface RecipientsFieldProps {
  disabled: boolean;
  label: string;
  values: string[];
  onChange: (values: string[], isInValid: boolean) => void;
}

export const RecipientsField = ({
  disabled,
  label,
  values,
  onChange
}: RecipientsFieldProps): React.ReactElement<RecipientsFieldProps> => {
  const { customer } = React.useContext(CustomerContext);

  const onRecipientsChange = (items: ChipInputFieldValueType[]): void => {
    let itemsValues: string[] = [];

    if (items.length > 0) {
      itemsValues = items
        .filter(
          (item: ChipInputFieldValueType) =>
            item.value !== customer?.owner_email
        )
        .map((item: ChipInputFieldValueType) => item.value);
    }

    onChange(itemsValues, hasInvalidValues(items));
  };

  return (
    <SFChipListInput
      label={`${label} are also sent to`}
      isValid={(value: string) => isEmailFormatValid(value)}
      items={transformToChipValues(values)}
      disabled={disabled}
      onChange={onRecipientsChange}
      helperText="List the emails separated by commas and press ENTER."
    />
  );
};
