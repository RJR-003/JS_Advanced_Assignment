import { handleTableClick } from "./tableActionButton.ts";

const api =
  "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";

export let actualData: {
  employee: {
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
  }[];
  department: { departmentID: number; departmentName: string }[];
  role: { roleID: number; role: string }[];
  skill: { skillID: number; skill: string }[];
};

const tableBody = document.querySelector(".table-body")! as HTMLTableElement;

//general table rendering function
///////////////////////////////////////////////
export const tableCreate = (
  arr: {
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
  }[]
) => {
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
            <button  data-emp-id= ${objelem.id}><img class="view-image-icon" src="assets/images/view-img.svg"
                    alt="view button image"></button>
            <button class="edit-image-icon" data-emp-id=${objelem.id}><img class="edit-image-icon" src="assets/images/edit-img.svg"
                    alt="Edit button image"></button>
            <button class="del-image-icon" data-emp-id=${objelem.id}><img class="del-image-icon" src="assets/images/del-img.svg"
                    alt="Delete button image"></button>
        </td>
    </tr>
    `;
  });
};

// fetching data from firebase and display it into the table
///////////////////////////////////////////
const fillentry = (obj: {
  employee: {
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
  }[];
  department: { departmentID: number; departmentName: string }[];
  role: { roleID: number; role: string }[];
  skill: { skillID: number; skill: string }[];
}) => {
  const skill = document.querySelector(".skill-list")! as HTMLDivElement;
  tableCreate(obj.employee);

  // filter skill button script
  obj.skill.forEach((objelem) => {
    const skillId = objelem.skill.split(" ").join("");
    const skillNum = objelem.skillID;
    skill.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
  });

  //fill department in data entry modal
  const department = document.querySelector("#dep")! as HTMLLabelElement;
  department.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
  obj.department.forEach((objelem) => {
    department.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
  });
  // fill role in data entry modal
  const role = document.querySelector("#role")! as HTMLLabelElement;
  role.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
  obj.role.forEach((objelem) => {
    role.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
  });
  //fill skill in skill selection in data entry modal
  const skillSelec = document.querySelector("#skill")! as HTMLLabelElement;
  skillSelec.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
  obj.skill.forEach((objelem) => {
    skillSelec.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
  });
};

//fetching data whole data from firebase
////////////////////////////////////////////////
const fetchData = function (fillentry: Function): void {
  fetch(api + "/.json")
    .then((res) => res.json())
    .then((data) => {
      actualData = data;
      console.log(data, "data");
      fillentry(data);
    })
    .catch((err) => console.log(err, "error"));
};

fetchData(fillentry);
const table = document.querySelector(".table")! as HTMLTableElement;
table.addEventListener("click", handleTableClick);

//close data-view-modal
const dataViewClose = document.querySelector(
  ".data-view-close"
)! as HTMLTableElement;
dataViewClose.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay")! as HTMLDivElement;
  overlay.style.display = "none";
  const dataViewModal = document.querySelector(
    ".data-view-modal"
  )! as HTMLDivElement;
  dataViewModal.style.display = "none";
});

//close data-del-modal
const cancelDelButton = document.querySelector(
  ".cancel-del-button"
)! as HTMLImageElement;
cancelDelButton.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay")! as HTMLDivElement;
  overlay.style.display = "none";
  const dataDelModal = document.querySelector(
    ".data-del-modal"
  )! as HTMLDivElement;
  dataDelModal.style.display = "none";
});

//Add employee function
const addEmployeeButton = document.querySelector(
  ".add-employee-button"
)! as HTMLImageElement;
addEmployeeButton.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay")! as HTMLDivElement;
  overlay.style.display = "none";
  const dataEntryModal = document.querySelector(
    ".data-entry-modal"
  )! as HTMLDivElement;
  dataEntryModal.style.display = "block";
});
const dataEntryClose = document.querySelector(
  ".data-entry-close"
)! as HTMLImageElement;
dataEntryClose.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay")! as HTMLDivElement;
  overlay.style.display = "none";
  const dataEntryModal = document.querySelector(
    ".data-entry-modal"
  )! as HTMLDivElement;
  dataEntryModal.style.display = "none";
});
