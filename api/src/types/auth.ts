
export type UserRole = 'STUDENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthToken {
  id: string;
  email: string;
  role: UserRole;
}
