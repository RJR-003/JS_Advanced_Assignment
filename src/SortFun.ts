import { actualData, tableCreate } from "./script.js";
import { FilterArr } from "./filterAndSearchFun.js";
import { tableBody, sortButton } from "./constants.js";

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

sortButton.addEventListener("click", sortFun);
