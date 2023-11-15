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
  return o.asyncObject.id === v.asyncObject?.id;
};

export interface MemberPickerProps {
  label: string;
  value: SFPeopleOption | undefined;
  onChange: (value: SFPeopleOption) => void;
}

export const MemberPicker = ({
  label,
  value,
  onChange
}: MemberPickerProps): React.ReactElement<MemberPickerProps> => {
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
      isAsync
      multiple={false}
      label={label}
      formatUrlQuery={(value: string) =>
        `${apiBaseUrl}/agencies/me/users?active_only=True&name=${value}`
      }
      formatOption={formatOption}
      fetchInit={fetchInit}
      value={value ?? { name: '' }}
      onChange={onChange}
      getOptionSelected={getOptionSelected}
    />
  );
};
