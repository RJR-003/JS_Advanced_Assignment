import { tableCreate } from "./script";
import { actualData } from "./DataService";
import { FilterArr } from "./script";
const tableBody = document.querySelector(".table-body")! as HTMLTableElement;
const sortButton = document.querySelector(".sort-button")! as HTMLImageElement;
let dirFlag = 1;

// sort functionality
//////////////////////////////////////
export const sortFun = () => {
  let arrayToSort = actualData.employee;
  if (FilterArr.length !== 0) arrayToSort = FilterArr;

  let arrToRender = arrayToSort.sort((a, b) => {
    const name1 = a.fullName.toLowerCase();
    const name2 = b.fullName.toLowerCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1 * dirFlag;
    } else if (name1 < name2) {
      comparison = -1 * dirFlag;
    }
    return comparison;
  });
  tableBody.innerHTML = "";
  tableCreate(arrToRender);
  if (dirFlag == 1) {
    sortButton.src = "../assets/images/down-arrow.svg";
    dirFlag = -1;
  } else {
    dirFlag = 1;
    sortButton.src = "../assets/images/up-arrow.svg";
  }
};
