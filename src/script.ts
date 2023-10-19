import { handleTableClick } from "./tableActionButton";
import { employee, fullData } from "./type";
const dataEntrySubmit = document.querySelector(
  "#data-entry-submit"
)! as HTMLInputElement;
const dataEntryForm = document.querySelector(
  ".data-entry-form"
)! as HTMLFormElement;
const materialSymbolsOutlined = document.querySelector(
  ".material-symbols-outlined "
)! as HTMLSpanElement;

const sortButton = document.querySelector(".sort-button")! as HTMLImageElement;
const searchBar = document.querySelector(
  ".search-input-box"
)! as HTMLInputElement;
const departmentEntry = document.querySelector("#dep")! as HTMLLabelElement;
const roleEntry = document.querySelector("#role")! as HTMLLabelElement;
const skillSelecEntry = document.querySelector("#skill")! as HTMLLabelElement;
const dataViewClose = document.querySelector(
  ".data-view-close"
)! as HTMLTableElement;
const cancelDelButton = document.querySelector(
  ".cancel-del-button"
)! as HTMLImageElement;
const addEmployeeButton = document.querySelector(
  ".add-employee-button"
)! as HTMLImageElement;
const dataEntryClose = document.querySelector(
  ".data-entry-close"
)! as HTMLImageElement;
const dataEntryModal = document.querySelector(
  ".data-entry-modal"
)! as HTMLDivElement;
const table = document.querySelector(".table")! as HTMLTableElement;

const overlay = document.querySelector(".overlay")! as HTMLDivElement;

import { constObj } from "./constants";
const dataViewModal = document.querySelector(
  ".data-view-modal"
)! as HTMLDivElement;
const dataDelModal = document.querySelector(
  ".data-del-modal"
)! as HTMLDivElement;
const tableBody = document.querySelector(".table-body")! as HTMLTableElement;
const skillList = document.querySelector(".skill-list")! as HTMLDivElement;

import { RenderFilterBox, clearFilter } from "./filterAndSearchFun";
import { sortFun } from "./SortFun";
export let actualData: fullData;
export let originalData: fullData;
export let firebaseData: fullData;
export let skillNameArr: string[] = []; //string array
export let skillName: string[];
export const changeSkillNameArr = (elem: string[]) => {
  skillNameArr = elem;
};
export const changeSkillName = (elem: string[]) => {
  skillName = elem;
};
const skillInput = document.querySelector("#skill")! as HTMLSelectElement;
const Fulltable = document.querySelector(".table")! as HTMLTableElement;
const formSkill = document.querySelector(".form-skill")! as HTMLDivElement;
const addedSkills = document.querySelector(".added-skills")! as HTMLDivElement;
const toastMsg = document.querySelector(".toast-msg")! as HTMLParagraphElement;
const toastDiv = document.querySelector(".toast")! as HTMLDivElement;

//general table rendering function
///////////////////////////////////////////////

export const toast = (type: boolean, msg: string) => {
  if (type) {
    toastMsg.innerHTML = msg;
    materialSymbolsOutlined.innerHTML = "error";
    toastDiv.style.background =
      "linear-gradient(111.4deg, rgb(246, 4, 26) 0.4%, rgb(251, 139, 34) 100.2%)";
    toastDiv.style.transform = "translateY(170%)";
  } else {
    toastMsg.innerHTML = msg;
    toastDiv.style.background =
      "linear-gradient(179.1deg, rgb(43, 170, 96) 2.3%, rgb(129, 204, 104) 98.3%)";
    materialSymbolsOutlined.innerHTML = "done";
    toastDiv.style.transform = "translateY(170%)";
  }
  setTimeout(() => {
    toastDiv.style.transform = "translateY(0)";
  }, 3000);
};

export const tableCreate = (arr: employee[]) => {
  arr.forEach((objelem) => {
    let dep: string =
      actualData.department[objelem.department - 1].departmentName;
    tableBody.innerHTML += `
    <tr class="data-row">
        <td>${objelem.id}</td>
        <td>${objelem.fullName}</td>
        <td>${objelem.email}</td>
        <td>${dep}</td>
        <td id="action-button-cell">
            <button  data-emp-id= ${objelem.id}><img data-emp-id= ${objelem.id} class="view-image-icon" src="assets/images/view-img.svg"
                    alt="view button image"></button>
            <button class="edit-image-icon" data-emp-id=${objelem.id}><img data-emp-id= ${objelem.id} class="edit-image-icon" src="assets/images/edit-img.svg"
                    alt="Edit button image"></button>
            <button class="del-image-icon" data-emp-id=${objelem.id}><img data-emp-id= ${objelem.id} class="del-image-icon" src="assets/images/del-img.svg"
                    alt="Delete button image"></button>
        </td>
    </tr>
    `;
  });
};

// fetching data from firebase and display it into the table
///////////////////////////////////////////
export const fillentry = (obj: fullData) => {
  tableCreate(obj.employee);

  // filter skill button script
  obj.skill.forEach((objelem) => {
    const skillId = objelem.skill.split(" ").join("");
    const skillNum = objelem.skillID;
    skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
  });

  //fill department in data entry modal
  departmentEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
  obj.department.forEach((objelem) => {
    departmentEntry.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
  });
  // fill role in data entry modal
  roleEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
  obj.role.forEach((objelem) => {
    roleEntry.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
  });
  //fill skill in skill selection in data entry modal
  skillSelecEntry.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
  obj.skill.forEach((objelem) => {
    skillSelecEntry.innerHTML += ` <option class="skill-options" id="${objelem.skill}" value="${objelem.skill}">${objelem.skill}</option>`;
  });
};

//fetching data whole data from firebase
////////////////////////////////////////////////
export const fetchData = function (fillentry: Function): void {
  fetch(constObj.api + "/.json")
    .then((res) => res.json())
    .then((data) => {
      // firebaseData = data;
      firebaseData = structuredClone(data);
      data.employee = data.employee.filter(Boolean);
      originalData = structuredClone(data);
      actualData = data;
      fillentry(data);
      sortFun();
    })
    .catch((err) => console.log(err, "error"));
};

fetchData(fillentry);
table.addEventListener("click", handleTableClick);

//close data-view-modal
dataViewClose.addEventListener("click", () => {
  overlay.style.display = "none";
  dataViewModal.style.display = "none";
});

//close data-del-modal

cancelDelButton.addEventListener("click", () => {
  overlay.style.display = "none";
  dataDelModal.style.display = "none";
});

//Add employee function

addEmployeeButton.addEventListener("click", () => {
  dataEntryForm.reset();
  addedSkills.innerHTML = "";
  dataEntrySubmit.value = "Add";
  overlay.style.display = "block";
  dataEntryModal.style.display = "block";
});

dataEntryClose.addEventListener("click", () => {
  dataEntryForm.reset();
  overlay.style.display = "none";
  dataEntryModal.style.display = "none";
});

//filterAndSearch functionality
export let FilterArr: employee[] = [];

export const filterTable = () => {
  let inputs = document.querySelectorAll(".skill-element")! as NodeList;
  let checkedFilterArr: string[] = [];
  inputs.forEach((elem) => {
    const element = elem as HTMLInputElement;
    const trial = element.querySelector(
      `#${element.dataset.skillId}`
    )! as HTMLInputElement;
    if (trial.checked) {
      const dataset = element.dataset.skillNum as string;
      checkedFilterArr.push(dataset);
    }
  });

  const searchvalue = searchBar.value.toLowerCase();

  FilterArr = actualData.employee;

  if (searchBar.value !== "") {
    FilterArr = FilterArr.filter((elem: employee) =>
      elem.fullName.trim().toLowerCase().includes(searchvalue)
    );
  }

  if (checkedFilterArr.length !== 0) {
    FilterArr = FilterArr.filter((elem: employee) =>
      checkedFilterArr.every((checkElem) =>
        elem.skills.includes(Number(checkElem))
      )
    );
  }
  tableBody.innerHTML = "";
  tableCreate(FilterArr);
};

const changeSkillState = (skillId: string) => {
  const temp = document.querySelector(`#${skillId}`)! as HTMLInputElement;
  temp.click();
  filterTable();
};
skillList.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (
    target.classList.contains("skill-element") &&
    target.tagName !== "INPUT"
  ) {
    const dataset = target.dataset.skillId as string;
    changeSkillState(dataset);
  }

  if (target.tagName === "INPUT" || target.tagName === "LABEL") {
    const targetClosest = target.closest("div")! as HTMLDivElement;
    const dataset = targetClosest.dataset.skillId as string;
    changeSkillState(dataset);
  }
});

sortButton.addEventListener("click", sortFun);

searchBar.addEventListener("input", filterTable);

//setting limit to date of birth
let today = new Date().toJSON().slice(0, 10);
const dateInput = document.querySelector("#dob")! as HTMLInputElement;
dateInput.setAttribute("max", today);
