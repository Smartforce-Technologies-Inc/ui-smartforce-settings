import moment from 'moment-timezone';

export function getNow(timezone?: string): moment.Moment {
  let userTimeZone = timezone ?? moment.tz.guess();
  return moment(moment().tz(userTimeZone).format('YYYY-MM-DDTHH:mm:ss'));
}
