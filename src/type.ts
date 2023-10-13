export type employee = {
  dateOfBirth: string;
  dateOfJoin: string;
  department: number;
  email: string;
  fullName: string;
  id: number;
  role: number;
  skills: number[];
  workLocation: string;
};

export type department = {
  departmentID: number;
  departmentName: string;
};

export type skill = {
  skillID: number;
  skill: string;
};

export type role = {
  roleID: number;
  role: string;
};

export type fullData = {
  employee: employee[];
  department: department[];
  skill: skill[];
  role: role[];
};
