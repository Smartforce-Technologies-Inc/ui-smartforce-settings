import React, { useMemo } from 'react';
import { SFPeoplePicker, SFPeopleOption } from 'sfui';
import { getUserSession } from '../../Services';

const formatOption = (option: any): SFPeopleOption => {
  return {
    name: option.name as string,
    avatarUrl: option.avatar_thumbnail_url as string,
    asyncObject: option
  };
};

const getOptionSelected = (o: SFPeopleOption, v: SFPeopleOption): boolean => {
  return o.asyncObject.id === v.asyncObject.id;
};

export interface MultipleMemberProps {
  required?: boolean | undefined;
  baseUrl: string;
  label: string;
  value: SFPeopleOption[];
  onChange: (value: SFPeopleOption[]) => void;
}

export const MultipleMemberPicker = ({
  required,
  baseUrl,
  label,
  value,
  onChange
}: MultipleMemberProps): React.ReactElement<MultipleMemberProps> => {
  const fetchInit: RequestInit = useMemo(
    () => ({
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `bearer ${getUserSession().access_token}`
      })
    }),
    []
  );

  return (
    <SFPeoplePicker
      multiple
      required={required}
      label={label}
      isAsync
      formatUrlQuery={(value: string) =>
        `${baseUrl}/agencies/me/users?active_only=True&name=${value}`
      }
      formatOption={formatOption}
      fetchInit={fetchInit}
      value={value}
      onChange={onChange}
      getOptionSelected={getOptionSelected}
    />
  );
};
