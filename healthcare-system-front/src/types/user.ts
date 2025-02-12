export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  role: string;
  speciality: string;
  status: string;
}
type UserKey = keyof User;
export type SortConfigKey = UserKey | '';
export type SortConfigDirection = 'asc' | 'desc' | '';
