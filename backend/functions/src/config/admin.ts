export const ADMIN_EMAILS = [
  'yehyaawad.lp@gmail.com',
  'awaadhabiba@gmail.com',
];

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
