import { actualData, tableCreate } from "./script.ts";
import { FilterArr } from "./filterAndSearchFun.ts";
const tableBody = document.querySelector(".table-body")! as HTMLTableElement;

let dirFlag = 1;
const sortButton = document.querySelector(".sort-button")! as HTMLImageElement;
// sort functionality
//////////////////////////////////////
const sortFun = () => {
  console.log(FilterArr);
  let arrayToSort = actualData.employee;
  if (FilterArr.length !== 0) arrayToSort = FilterArr;

  let arrToRender = arrayToSort.sort(
    (
      a: {
        id: number;
        fullName: string;
        email: string;
        dateOfJoining: string;
        dateOfBirth: string;
        department: number;
        role: number;
        skills: number[];
        workLocation: string;
        ContactNum: string;
      },
      b: {
        id: number;
        fullName: string;
        email: string;
        dateOfJoining: string;
        dateOfBirth: string;
        department: number;
        role: number;
        skills: number[];
        workLocation: string;
        ContactNum: string;
      }
    ) => {
      const name1 = a.fullName.toLowerCase();
      const name2 = b.fullName.toLowerCase();

      let comparison = 0;

      if (name1 > name2) {
        comparison = 1 * dirFlag;
      } else if (name1 < name2) {
        comparison = -1 * dirFlag;
      }
      return comparison;
    }
  );
  tableBody.innerHTML = "";
  tableCreate(arrToRender);
  if (dirFlag == 1) {
    // const sortButton=document.querySelector(".sort-button")! as HTMLImageElement;
    sortButton.src = "../assets/images/down-arrow.svg";
    dirFlag = -1;
  } else {
    dirFlag = 1;
    // const sortButton=document.querySelector(".sort-button")! as HTMLImageElement;
    sortButton.src = "../assets/images/up-arrow.svg";
  }
};
sortButton.onclick = sortFun;
