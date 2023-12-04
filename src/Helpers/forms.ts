import { SFMenuOption } from 'sfui';
import { getNumberString } from './format';

export function getTimeOptions(): SFMenuOption[] {
  let options: SFMenuOption[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 50; minute = minute + 15) {
      const option = `${getNumberString(hour)}:${getNumberString(minute)}`;
      options.push({ label: option, value: option });
    }
  }

  return options;
}
