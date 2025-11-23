export type InitialTypes = {
  temporaryToken: string; 
  phoneNumber: string;
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  email?: string | null;
  password: string;
  confirmPassword: string;
  ageRangeId?: number;
  roleId?: number;
  interestIds: number[];
};
