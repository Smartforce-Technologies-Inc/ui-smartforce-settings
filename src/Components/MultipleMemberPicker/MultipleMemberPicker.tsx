import React, { useContext, useMemo } from 'react';
import { SFPeoplePicker, SFPeopleOption } from 'sfui';
import { getUserSession } from '../../Services';
import { ApiContext } from '../../Context';

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
  label: string;
  value: SFPeopleOption[];
  onChange: (value: SFPeopleOption[]) => void;
}

export const MultipleMemberPicker = ({
  label,
  value,
  onChange
}: MultipleMemberProps): React.ReactElement<MultipleMemberProps> => {
  const apiBaseUrl = useContext(ApiContext).settings;

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
      label={label}
      isAsync
      formatUrlQuery={(value: string) =>
        `${apiBaseUrl}/agencies/me/users?active_only=True&name=${value}`
      }
      formatOption={formatOption}
      fetchInit={fetchInit}
      value={value}
      onChange={onChange}
      getOptionSelected={getOptionSelected}
    />
  );
};
