import React from 'react';
import { SFPeopleOption, SFPeoplePicker } from 'sfui';
import { Area } from '../../Models';

const formatOptionsToPeoplePicker = (options: Area[]): SFPeopleOption[] => {
  return options.map((o: Area) => {
    return {
      name: o.name,
      acronym: o.acronym,
      asyncObject: { id: o.id }
    };
  });
};

const getOptionSelected = (option: SFPeopleOption, value: SFPeopleOption) => {
  return option.asyncObject.id === value.asyncObject.id;
};

export interface AreasFieldProps {
  options: Area[];
  onChange: (value: SFPeopleOption[]) => void;
  value: SFPeopleOption[];
}

export const AreasField = ({
  options,
  onChange,
  value
}: AreasFieldProps): React.ReactElement<AreasFieldProps> => {
  return (
    <SFPeoplePicker
      label="Areas"
      isAsync={false}
      multiple={true}
      options={formatOptionsToPeoplePicker(options)}
      value={value}
      getOptionSelected={getOptionSelected}
      onChange={onChange}
    />
  );
};
