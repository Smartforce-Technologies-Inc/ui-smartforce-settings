export type EmailNotificationsType =
  | 'state_report_recipients'
  | 'invoice_recipients';

export interface EmailNotifications {
  state_report_recipients: string[];
  invoice_recipients: string[];
}

interface Notifications {
  email: EmailNotifications;
}

export interface Preferences {
  notifications: Notifications;
}

export interface RecipientsEmails {
  emails: string[];
}
