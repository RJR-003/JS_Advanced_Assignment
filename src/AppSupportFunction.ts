import { dataBaseData } from "./type";

export class AppSupportFun {
  //static method to convert skillName to skill id array
  static returnSkillArr(arrOfNames: string[], data: dataBaseData): number[] {
    arrOfNames = arrOfNames.map((elem) => elem.toLowerCase());
    const skillIDArr = data.skill.reduce(function (acc: number[], elem) {
      if (arrOfNames.includes(elem.skill.toLowerCase())) {
        return [...acc, elem.skillID];
      }
      return [...acc];
    }, []);
    return skillIDArr;
  }

  // converts department name to department id
  static returnDepID(depName: string, data: dataBaseData): number {
    depName = depName.toLowerCase();
    const depID = data.department.reduce((value: number, elem) => {
      if (elem.departmentName.toLowerCase() == depName) {
        value = elem.departmentID;
        return value;
      }
      return value;
    }, 0);
    return depID;
  }
  //static method to read File as base64
  static readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}
