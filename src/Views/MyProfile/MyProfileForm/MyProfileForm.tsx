import moment from 'moment';
import React from 'react';
import styles from './MyProfileForm.module.scss';
import { SFDatePicker, SFNumericField, SFTextField } from 'sfui';
import { OFFICER_ID_INVALID_MSG } from '../../../Constants';
import { User } from '../../../Models';
import { ImageUpload } from '../../../Components/ImageUpload/ImageUpload';
import { CheckboxField } from '../../../Components/CheckboxField/CheckboxField';
import { RadioField } from '../../../Components/RadioField/RadioField';

const raceEthnicityOptions = [
  'American Indian or Alaskan Native',
  'Asian',
  'Black or African-American',
  'Hispanic or Latino',
  'Native Hawaiian or Other Pacific Islander',
  'White'
];

const genderOptions = ['Female', 'Male', 'Other'];

const getNumberValue = (value: string) =>
  value.length > 0 ? +value : undefined;

const getDateValue = (date: moment.Moment) => {
  if (date) {
    return date.isValid()
      ? date.format('YYYY-MM-DD') + 'T00:00:00'
      : date.toString();
  } else return undefined;
};

const getDateFromString = (value: string | undefined) =>
  value ? moment(value, 'YYYY-MM-DDTHH:mm:ss') : undefined;

export interface MyProfileFormProps {
  user: User;
  avatar: string | Blob | undefined | null;
  isOfficerIdError: boolean;
  onChange: (user: User) => void;
  onAvatarChange: (value: Blob) => void;
}

export const MyProfileForm = ({
  user,
  avatar,
  isOfficerIdError,
  onChange,
  onAvatarChange
}: MyProfileFormProps): React.ReactElement<MyProfileFormProps> => {
  return (
    <div className={styles.myProfileForm}>
      <form action="" autoComplete="off">
        <SFTextField
          label="Full Name"
          value={user.name || ''}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({
              ...user,
              name: e.target.value
            })
          }
        />

        <SFDatePicker
          label="Date of Birth"
          value={getDateFromString(user.dob)}
          disableFuture
          onChange={(date) =>
            onChange({
              ...user,
              dob: getDateValue(date)
            })
          }
        />

        <CheckboxField
          label="Race and Ethnicity"
          value={user.race_ethnicity}
          options={raceEthnicityOptions}
          onChange={(value: string[] | undefined) =>
            onChange({
              ...user,
              race_ethnicity: value
            })
          }
        />

        <RadioField
          label="Gender"
          value={user.gender}
          options={genderOptions}
          onChange={(value: string) =>
            onChange({
              ...user,
              gender: value
            })
          }
        />

        <SFNumericField
          label="Height (ft)"
          value={user.height?.ft}
          allowDecimals={false}
          numberFormatProps={{
            allowNegative: false
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({
              ...user,
              height: {
                ft: getNumberValue(e.target.value),
                in: user.height?.in
              }
            })
          }
        />

        <SFNumericField
          label="Height (in)"
          value={user.height?.in}
          allowDecimals={false}
          numberFormatProps={{
            allowNegative: false
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({
              ...user,
              height: {
                ft: user.height?.ft,
                in: getNumberValue(e.target.value)
              }
            })
          }
        />

        <SFNumericField
          label="Weight (lb)"
          value={user.weight}
          allowDecimals={false}
          numberFormatProps={{
            allowNegative: false
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({
              ...user,
              weight: getNumberValue(e.target.value)
            })
          }
        />

        <SFTextField
          label="Officer ID Number"
          value={user.officer_id}
          required
          error={isOfficerIdError}
          helperText={OFFICER_ID_INVALID_MSG}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({
              ...user,
              officer_id: e.target.value
            })
          }
        />

        <SFTextField
          label="POST Number"
          value={user.officer_post_number || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({
              ...user,
              officer_post_number: e.target.value
            })
          }
        />

        <SFDatePicker
          label="Career Start Date"
          value={getDateFromString(user.career_start_date)}
          disableFuture
          onChange={(date) =>
            onChange({
              ...user,
              career_start_date: getDateValue(date)
            })
          }
        />

        <SFTextField
          label="E-mail"
          type="email"
          value={user.email || ''}
          required
          disabled
        />

        <SFNumericField
          label="Phone"
          value={user.phone || ''}
          numberFormatProps={{ format: '(###) ###-####' }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({
              ...user,
              phone: e.target.value
            })
          }
        />

        <ImageUpload
          label="Upload Photo"
          value={avatar}
          onChange={onAvatarChange}
        />
      </form>
    </div>
  );
};
