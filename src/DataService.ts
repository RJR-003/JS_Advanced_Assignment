import { dataBaseData, sendData } from "./type";
import { appStrings } from "./constants";
const skillList = document.querySelector(".skill-list")! as HTMLDivElement;
import { appConstants } from "./constants";
export let firebaseData: dataBaseData;
export let originalData: dataBaseData;
export let actualData: dataBaseData;
class FirebaseSingleton {
  private static instance: FirebaseSingleton;
  // private readonly databaseUrl: string =
  //   "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";

  public static getInstance(): FirebaseSingleton {
    if (!FirebaseSingleton.instance) {
      FirebaseSingleton.instance = new FirebaseSingleton();
    }
    return FirebaseSingleton.instance;
  }

  // Read items from firebase database
  public async fetchData(fillentry: Function): Promise<any[]> {
    const response = await fetch(`${appConstants.databaseUrl}/.json`);

    if (response.ok) {
      const data = await response.json();
      firebaseData = structuredClone(data);
      data.employee = data.employee.filter(Boolean);
      originalData = structuredClone(data);
      actualData = data;
      fillentry(data);
      return data ? data : [];
    } else {
      return [];
    }
  }

  public async deleteData(
    index: number,
    fillentry: Function,
    toast: Function
  ): Promise<void> {
    const response = await fetch(
      `${appConstants.databaseUrl}/employee/${index}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.error("Error in deleting employee");
      toast(true, appStrings.delErrMsg);
    } else {
      skillList.innerHTML = "";
      toast(false, appStrings.delSuccessMsg);
      this.fetchData(fillentry).then((data) => console.log(data));
    }
  }
  // Create (Add) a new item to the Firebase Realtime Database
  public async putData(
    obj: sendData,
    fillentry: Function,
    toast: Function
  ): Promise<void> {
    const response = await fetch(
      `${appConstants.databaseUrl}/employee/${obj.index}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          dateOfBirth: obj.dob,
          dateOfJoin: obj.doj,
          department: obj.dep,
          id: obj.id,
          role: obj.role,
          skills: obj.skill,
          workLocation: obj.loc,
          fullName: obj.name,
          email: obj.email,
          imageSrc: obj.img,
        }),
      }
    );

    if (!response.ok) {
      toast(true, obj.errMsg);
    } else {
      toast(false, obj.succMsg);
      const skillList = document.querySelector(
        ".skill-list"
      )! as HTMLDivElement;
      skillList.innerHTML = "";
      this.fetchData(fillentry).then((data) => console.log(data));
    }
  }
}
export const hrmApp = FirebaseSingleton.getInstance();
