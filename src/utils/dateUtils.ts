import { DateTime } from 'luxon';

export function formatDateFromISOString(isoDate: string): string {
  return DateTime.fromISO(isoDate).toFormat('yyyy-MM-dd HH:mm:ss');
}
