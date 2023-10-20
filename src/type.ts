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
  imageSrc: string;
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

export type dataBaseData = {
  employee: employee[];
  department: department[];
  skill: skill[];
  role: role[];
};

export type sendData = {
  index: number;
  id: number;
  name: string;
  email: string;
  doj: string;
  dob: string;
  dep: number;
  role: string;
  loc: string;
  skill: number[];
  img: string;
  errMsg: string;
  succMsg: string;
};
