import React from 'react';
import styles from './ShiftForm.module.scss';
import { SFNumericField, SFPeopleOption, SFText, SFTextField } from 'sfui';
import { AreasField } from '../../../../Components/AreasField/AreasField';
import { Divider } from '../../../../Components/Divider/Divider';
import { DateTime } from './DateTime/DateTime';
import { ShiftFormValue, ShiftRecurrence } from '../../../../Models';
import { MemberPicker } from '../../../../Components/MemberPicker/MemberPicker';
import { RepeatForm } from './RepeatForm/RepeatForm';
import { MultipleMemberPicker } from '../../../../Components/MultipleMemberPicker/MultipleMemberPicker';

export interface ShiftFormProps {
  value: ShiftFormValue;
  onChange: (value: ShiftFormValue) => void;
}

export const ShiftForm = ({
  value,
  onChange
}: ShiftFormProps): React.ReactElement<ShiftFormProps> => {
  return (
    <div className={styles.shiftForm}>
      <div className={styles.section}>
        <SFTextField
          label="Title"
          required
          value={value.name}
          inputProps={{ maxLength: 32 }}
          helperText={'It must be between 1 and 32 characters.'}
          onChange={(e) =>
            onChange({
              ...value,
              name: e.target.value
            })
          }
        />

        <SFTextField
          required
          label="Acronym"
          value={value.acronym}
          inputProps={{ maxLength: 3 }}
          helperText={`It must be between 1 and 3 characters. E.g. "CC1"`}
          onChange={(e) =>
            onChange({
              ...value,
              acronym: e.target.value
            })
          }
        />

        <AreasField
          value={value.areas}
          onChange={(areas) =>
            onChange({
              ...value,
              areas
            })
          }
        />
      </div>

      <Divider />

      <div className={styles.section}>
        <SFText type="component-1-medium">Date and Time</SFText>

        <DateTime
          label="Start"
          value={value.start}
          onChange={(start) =>
            onChange({
              ...value,
              start
            })
          }
        />

        <DateTime
          label="End"
          value={value.end}
          onChange={(end) =>
            onChange({
              ...value,
              end
            })
          }
        />

        <RepeatForm
          value={value.recurrence}
          onChange={(recurrence: ShiftRecurrence) =>
            onChange({
              ...value,
              recurrence
            })
          }
        />
      </div>

      <Divider />

      <div className={styles.section}>
        <SFText type="component-1-medium">Staff</SFText>

        <SFNumericField
          label="Minimum staffing"
          required
          helperText="It takes at least one member to continue."
          value={value.staff_min}
          onChange={(e) =>
            onChange({
              ...value,
              staff_min: e.target.value
            })
          }
        />

        <MultipleMemberPicker
          label="Add Members"
          value={value.members}
          onChange={(members: SFPeopleOption[]) =>
            onChange({
              ...value,
              members
            })
          }
        />

        <MemberPicker
          label="Supervisor"
          value={value.supervisor}
          onChange={(supervisor: SFPeopleOption) =>
            onChange({
              ...value,
              supervisor
            })
          }
        />
      </div>
    </div>
  );
};
