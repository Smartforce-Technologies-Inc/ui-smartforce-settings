import React from 'react';
import styles from './AgencyForm.module.scss';
import {
  SFAutocomplete,
  SFMenuOption,
  SFNumericField,
  SFSelect,
  SFTextField
} from 'sfui';
import { LocationField } from '../../LocationField/LocationField';
import { ImageUpload } from '../../ImageUpload/ImageUpload';
import {
  EMAIL_INVALID_MSG,
  ORI_INVALID_MSG,
  ORI_TAKEN_MSG
} from '../../../Constants';
import { Customer, LocationAddressType, State } from '../../../Models';
import { isOriValid } from '../../../Helpers';
import { StatesListConfigContext, TimezonesContext } from '../../../Context';
import { Timezone } from '../../../Models/Timezone';

const getStateOptions = (states: State[] | undefined): SFMenuOption[] => {
  if (states) {
    return states.map((state: State) => {
      return { label: state.name, value: state.name };
    });
  }
  return [];
};

export interface AgencyFormProps {
  value: Partial<Customer>;
  badge: string | Blob | undefined | null;
  isNew?: boolean;
  isEmailError?: boolean;
  isOriTaken?: boolean;
  onChange: (agency: Partial<Customer>) => void;
  onBadgeChange: (badge: Blob) => void;
}

export const AgencyForm = ({
  value,
  badge,
  isNew = true,
  isEmailError = false,
  isOriTaken = false,
  onChange,
  onBadgeChange
}: AgencyFormProps): React.ReactElement<AgencyFormProps> => {
  const { statesList } = React.useContext(StatesListConfigContext);
  const timezones = React.useContext(TimezonesContext).timezones as Timezone[];

  const timezoneOptions = timezones.map((t) => ({
    label: t.label,
    value: t.name
  }));

  const stateOptions = getStateOptions(statesList);

  const onStateChange = (newValue: SFMenuOption | string) => {
    const stateName = typeof newValue === 'string' ? newValue : newValue.value;
    onChange({
      ...value,
      state_name: stateName
    });
  };

  const isOriError: boolean =
    isOriTaken || (!!value.ori && !isOriValid(value.ori));

  return (
    <div className={styles.agencyForm}>
      <SFTextField
        label="Agency Name"
        required
        inputProps={{ maxLength: 50 }}
        value={value.full_name}
        onChange={(e) =>
          onChange({
            ...value,
            full_name: e.target.value
          })
        }
      />

      {!isNew && (
        <LocationField
          label="Address"
          value={value.address || undefined}
          currentLocation={false}
          onChange={(address: LocationAddressType) =>
            onChange({
              ...value,
              address
            })
          }
        />
      )}

      <SFAutocomplete
        label="State"
        freeSolo={false}
        clearOnBlur
        allowEmpty={true}
        options={stateOptions}
        value={value.state_name}
        disabled={!isNew}
        required
        onChange={onStateChange}
      />

      <SFTextField
        label="ORI Number"
        required
        disabled={!isNew}
        value={value.ori}
        error={isOriError}
        helperText={
          isOriError ? (isOriTaken ? ORI_TAKEN_MSG : ORI_INVALID_MSG) : ''
        }
        onChange={(e) =>
          onChange({
            ...value,
            ori: e.target.value
          })
        }
      />

      <SFSelect
        label="Timezone"
        required
        disabled={!isNew}
        value={value.timezone}
        options={timezoneOptions}
        onChange={(
          e: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
          }>
        ) =>
          onChange({
            ...value,
            timezone: e.target.value as string
          })
        }
      />

      <SFNumericField
        label="Phone"
        required
        value={value.phone1}
        numberFormatProps={{ format: '(###) ###-####' }}
        onChange={(e) =>
          onChange({
            ...value,
            phone1: e.target.value
          })
        }
      />

      <SFTextField
        label="E-mail"
        type="email"
        required
        value={value.email}
        error={isEmailError}
        helperText={isEmailError ? EMAIL_INVALID_MSG : ''}
        onChange={(e) =>
          onChange({
            ...value,
            email: e.target.value.toLowerCase()
          })
        }
      />

      {!isNew && (
        <SFTextField
          label="Website"
          value={value.website || ''}
          onChange={(e) =>
            onChange({
              ...value,
              website: e.target.value
            })
          }
        />
      )}

      <ImageUpload
        label="Upload Agency Badge"
        value={badge}
        onChange={onBadgeChange}
      />
    </div>
  );
};
