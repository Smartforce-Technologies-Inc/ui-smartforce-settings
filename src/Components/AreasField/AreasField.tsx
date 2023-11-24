import React, { useContext } from 'react';
import { SFPeopleOption, SFPeoplePicker } from 'sfui';
import { Area } from '../../Models';
import { AreasContext } from '../../Context';

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
  onChange: (value: SFPeopleOption[]) => void;
  value: SFPeopleOption[];
}

export const AreasField = ({
  onChange,
  value
}: AreasFieldProps): React.ReactElement<AreasFieldProps> => {
  const areas = useContext(AreasContext).areas;

  return (
    <SFPeoplePicker
      label="Areas"
      isAsync={false}
      multiple={true}
      options={formatOptionsToPeoplePicker(areas)}
      value={value}
      getOptionSelected={getOptionSelected}
      onChange={onChange}
    />
  );
};
