export const ADMIN_EMAILS = [
  'yehyaawad.lp@gmail.com',
  'awaadhabiba@gmail.com',
  'yomaxer9@gmail.com',
  'fidelkibou@gmail.com',
  'testadmin@example.com'
];

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
