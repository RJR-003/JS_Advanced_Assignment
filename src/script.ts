import { handleTableClick } from "./tableActionButton.js";
import { employee, fullData } from "./type.js";
import {
  api,
  overlay,
  table,
  dataViewModal,
  dataDelModal,
  tableBody,
  skillList,
  departmentEntry,
  roleEntry,
  skillSelecEntry,
  dataViewClose,
  cancelDelButton,
  addEmployeeButton,
  dataEntryClose,
  dataEntryModal,
  searchBar,
  filterSearchBox,
} from "./constants.js";

export let actualData: fullData;

//general table rendering function
///////////////////////////////////////////////
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
const fillentry = (obj: fullData) => {
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
    skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
  });
};

//fetching data whole data from firebase
////////////////////////////////////////////////
const fetchData = function (fillentry: Function): void {
  fetch(api + "/.json")
    .then((res) => res.json())
    .then((data) => {
      actualData = data;
      fillentry(data);
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
  overlay.style.display = "block";
  dataEntryModal.style.display = "block";
});

dataEntryClose.addEventListener("click", () => {
  overlay.style.display = "none";
  dataEntryModal.style.display = "none";
});

//filterAndSearch functionality
