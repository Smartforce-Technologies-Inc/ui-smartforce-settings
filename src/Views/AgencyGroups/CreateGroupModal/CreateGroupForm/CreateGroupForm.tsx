import React, { useContext, useMemo } from 'react';
import styles from './CreateGroupForm.module.scss';
import { SFPeopleOption, SFPeoplePicker, SFTextField } from 'sfui';
import { getUserSession } from '../../../../Services';
import { ImageUpload } from '../../../../Components/ImageUpload/ImageUpload';
import { ApiContext } from '../../../../SFSettings';

const formatOption = (option: any): SFPeopleOption => {
  return {
    name: option.name as string,
    avatarUrl: option.avatar_thumbnail_url as string,
    asyncObject: option
  };
};

export interface GroupFormValue {
  avatar?: Blob | string;
  id?: string;
  name: string;
  acronym: string;
  members?: SFPeopleOption[];
}
export interface CreateGroupError {
  name: boolean;
  acronym: boolean;
}

export interface CreateGroupFormProps {
  error: CreateGroupError;
  isNew: boolean;
  value: GroupFormValue;
  onChange: (newValue: GroupFormValue) => void;
}

export const CreateGroupForm = ({
  error,
  isNew = false,
  value,
  onChange
}: CreateGroupFormProps): React.ReactElement<CreateGroupFormProps> => {
  const apiBaseUrl = useContext(ApiContext);

  const nameHelper = error.name
    ? 'This name is already taken.'
    : 'It must be between 1 and 32 characters.';

  const acronymHelper = error.acronym
    ? 'This acronym is already taken.'
    : 'It must be between 1 and 3 characters. E.g. “CC1”';

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
    <div className={styles.createGroupForm}>
      <SFTextField
        label="Name"
        required
        error={error.name}
        inputProps={{ maxLength: 32 }}
        helperText={nameHelper}
        value={value.name}
        onChange={(event) =>
          onChange({
            ...value,
            name: event.target.value
          })
        }
      />

      <SFTextField
        label="Acronym"
        required
        error={error.acronym}
        inputProps={{ maxLength: 3 }}
        helperText={acronymHelper}
        value={value.acronym}
        onChange={(event) =>
          onChange({
            ...value,
            acronym: event.target.value
          })
        }
      />

      {isNew && (
        <SFPeoplePicker
          multiple
          label="Members"
          isAsync
          formatUrlQuery={(value: string) =>
            `${apiBaseUrl}/agencies/me/users?active_only=True&name=${value}`
          }
          formatOption={formatOption}
          fetchInit={fetchInit}
          value={value.members as SFPeopleOption[]}
          onChange={(newMembers: SFPeopleOption[]) =>
            onChange({
              ...value,
              members: newMembers
            })
          }
        />
      )}

      <ImageUpload
        label="Upload Photo"
        value={value.avatar}
        onChange={(avatar: Blob) => onChange({ ...value, avatar: avatar })}
      />
    </div>
  );
};
